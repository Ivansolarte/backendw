import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
// import { PrismaService } from 'prisma/prisma.service';
// import { TransactionStatus } from '@prisma/client';
import { CreateTransactionDto, TransactionStatus } from './dto/create-transaction.dto';
import { PrismaService } from 'prisma/prisma.service';

// Mockear el PrismaService
const mockPrismaService = {
  product: {
    findUnique: jest.fn(),
  },
  transaction: {
    create: jest.fn(),
    update: jest.fn(),
  },
};

// Mockear la función de Wompi
const mockCreateCardToken = jest.fn();
const mockProcessPaymentWithWompi = jest.fn();

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    })
      .overrideProvider(TransactionService)
      .useValue({
        ...mockPrismaService,
        createCardToken: mockCreateCardToken,
        processPaymentWithWompi: mockProcessPaymentWithWompi,
      })
      .compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTransaction', () => {
    it('should throw an error if product is not found', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      const createTransactionDto: CreateTransactionDto = {
        productId: 1,
        quantity: 2,
        customerName: 'John Doe',
        customerAddress: '123 Test St',
        cardNumber: '4111111111111111',
        expirationDate: '12/24',
        cvv: '123',
        status: TransactionStatus.PENDING, 
      };

      await expect(service.createTransaction(createTransactionDto)).rejects.toThrow(
        'Producto no encontrado',
      );
    });

    it('should create a transaction successfully', async () => {
      // Mock del producto
      mockPrismaService.product.findUnique.mockResolvedValue({
        id: 1,
        name: 'Product 1',
        price: 100,
        stock: 10,
      });

      // Mock de la creación de la transacción
      mockPrismaService.transaction.create.mockResolvedValue({
        id: 1,
        productId: 1,
        quantity: 2,
        customerName: 'John Doe',
        customerAddress: '123 Test St',
        amount: 200,
        status: TransactionStatus.PENDING,
      });

      mockCreateCardToken.mockResolvedValue({
        token: 'card-token',
        expires_at: '2024-12-01',
      });

      mockProcessPaymentWithWompi.mockResolvedValue(true);

      const createTransactionDto: CreateTransactionDto = {
        productId: 1,
        quantity: 2,
        customerName: 'John Doe',
        customerAddress: '123 Test St',
        cardNumber: '4111111111111111',
        expirationDate: '12/24',
        cvv: '123',
        status: TransactionStatus.PENDING, 
      };

      const result = await service.createTransaction(createTransactionDto);

      expect(result[0].status).toBe(TransactionStatus.PENDING);
      expect(result[1]).toBe(true); // Simulamos un pago exitoso
      expect(mockPrismaService.transaction.create).toHaveBeenCalled();
    });

    it('should handle payment failure and update transaction status', async () => {
      // Mock del producto
      mockPrismaService.product.findUnique.mockResolvedValue({
        id: 1,
        name: 'Product 1',
        price: 100,
        stock: 10,
      });

      // Mock de la creación de la transacción
      mockPrismaService.transaction.create.mockResolvedValue({
        id: 1,
        productId: 1,
        quantity: 2,
        customerName: 'John Doe',
        customerAddress: '123 Test St',
        amount: 200,
        status: TransactionStatus.PENDING,
      });

      mockCreateCardToken.mockResolvedValue({
        token: 'card-token',
        expires_at: '2024-12-01',
      });

      mockProcessPaymentWithWompi.mockResolvedValue(false); // Simulamos un pago fallido

      const createTransactionDto: CreateTransactionDto = {
        productId: 1,
        quantity: 2,
        customerName: 'John Doe',
        customerAddress: '123 Test St',
        cardNumber: '4111111111111111',
        expirationDate: '12/24',
        cvv: '123',
        status: TransactionStatus.PENDING, 
      };

      const result = await service.createTransaction(createTransactionDto);

      expect(result[0].status).toBe(TransactionStatus.CANCELLED); // Transacción cancelada
      expect(result[1]).toBe(false); // Pago fallido
      expect(mockPrismaService.transaction.create).toHaveBeenCalled();
    });
  });
});
