import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from 'prisma/prisma.service';
import { TransactionStatus } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  // crea una transaccion mas wompi
  async createTransaction(data: CreateTransactionDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    const amount = product.price * data.quantity;

    const transaction = await this.prisma.transaction.create({
      data: {
        productId: data.productId,
        quantity: data.quantity,
        customerName: data.customerName,
        customerAddress: data.customerAddress,
        amount,
        status: TransactionStatus.PENDING, // Correcto
      },
    });

    // Llamada a Wompi para generar un token
    const cardToken = await this.createCardToken(data);

    // Enviar a Wompi para procesar el pago
    const result = await this.processPaymentWithWompi(
      transaction.id,
      cardToken,
      data,
    );

    // Actualizar el estado de la transacción según la respuesta de Wompi
    if (result) {
      await this.updateStatusTransaction(
        transaction.id,
        TransactionStatus.COMPLETED,
      );
    } else {
      await this.updateStatusTransaction(
        transaction.id,
        TransactionStatus.CANCELLED,
      );
    }
    if (result.error) {
      return { error: result.error };
    }
    return { ...transaction, ...result };
  }

  // crear el token de  Wompi
  private async createCardToken(payload) {
    const expirationDate = payload.expirationDate;
    const [expMonth, expYear] = expirationDate.split('/');
    const res = await fetch(
      'https://api-sandbox.co.uat.wompi.dev/v1/tokens/cards',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7',
        },
        body: JSON.stringify({
          number: payload.cardNumber,
          cvc: payload.cvv,
          exp_month: expMonth,
          exp_year: expYear,
          card_holder: payload.customerName,
        }),
      },
    );
    const data = await res.json();
    if (data.error) {
      return { error: data.error };
    }
    return { token: data.data.id, expires_at: data.data.expires_at };
  }

  //  para procesar el pago real en Wompi
  private async processPaymentWithWompi(
    transactionId: number,
    cardToken: any,
    payload: any,
  ) {
    const cardDetails = {
      acceptance_token: payload.acceptance_token,
      amount_in_cents: Math.round(payload.amount_in_cents * 100),
      currency: payload.currency,
      customer_email: payload.email,
      reference: payload.reference.replace(/[^a-zA-Z0-9]/g, ''),
      customer_data: {
        phone_number: payload.phone_number,
        full_name: payload.customerName,
        legal_id: payload.legal_id,
        legal_id_type: payload.legal_id_type,
      },
      payment_method: {
        type: 'CARD',
        installments: payload.payment_method.installments,
        token: cardToken.token,
      },
      signature: payload.signature,
    };
    const response = await fetch(
      'https://api-sandbox.co.uat.wompi.dev/v1/transactions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg',
        },
        body: JSON.stringify(cardDetails),
      },
    );

    const data = await response.json();
    return data;
  }

  async simulatePayment(transactionId: number) {
    const delay = Math.random() * 2000 + 1000;

    return new Promise((resolve) => {
      setTimeout(async () => {
        const paymentSuccessful = Math.random() > 0.5;

        let updatedStatus: TransactionStatus = TransactionStatus.CANCELLED;
        let successMessage = 'Pago fallido';
        let productDetails: {
          productName: string;
          quantityPurchased: number;
          remainingStock: number;
        } | null = null;

        if (paymentSuccessful) {
          updatedStatus = TransactionStatus.COMPLETED;
          successMessage = 'Pago exitoso';

          const transaction = await this.prisma.transaction.findUnique({
            where: { id: transactionId },
            include: { product: true },
          });

          if (transaction) {
            const updatedProduct = await this.prisma.product.update({
              where: { id: transaction.productId },
              data: {
                stock: {
                  decrement: transaction.quantity, // Decrementar el stock
                },
              },
            });

            productDetails = {
              productName: transaction.product.name,
              quantityPurchased: transaction.quantity,
              remainingStock: updatedProduct.stock,
            };
          }
        }

        await this.updateStatusTransaction(transactionId, updatedStatus);

        const transactionResult = {
          transactionId,
          status: updatedStatus,
          successMessage,
          productDetails,
        };

        resolve(transactionResult);
      }, delay);
    });
  }

  async updateStatusTransaction(id: number, status: TransactionStatus) {
    await this.prisma.transaction.update({
      where: { id },
      data: {
        status: status,
      },
    });
  }
}
