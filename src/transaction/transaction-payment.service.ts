import { Injectable } from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service'; // Servicio para actualizar estado de la transacción
import { TransactionStatus } from './dto/create-transaction.dto'; // Enum para los posibles estados de la transacción
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TransactionPaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionService: TransactionService
  ) {}

  // Simula el pago y actualiza la transacción
  async simulatePayment(transactionId: number) {
    // Obtén la transacción desde la base de datos
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    // Simula un pago después de 2-3 segundos
    setTimeout(async () => {
      const paymentSuccessful = Math.random() > 0.5; // 50% de posibilidad de éxito

      if (paymentSuccessful) {
        // Si el pago fue exitoso, cambia el estado a COMPLETED
        await this.transactionService.updateStatusTransaction(transactionId, TransactionStatus.COMPLETED);

        // Actualiza el stock (si el pago fue exitoso)
        await this.updateStock(transaction.productId, transaction.quantity);
      } else {
        // Si el pago falló, cambia el estado a CANCELLED
        await this.transactionService.updateStatusTransaction(transactionId, TransactionStatus.CANCELLED);
      }
    }, 3000); // Espera 3 segundos para simular el pago
  }

  // Actualiza el stock del producto comprado
  private async updateStock(productId: number, quantity: number) {
    await this.prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          decrement: quantity, // Disminuye el stock del producto
        },
      },
    });
  }
}
