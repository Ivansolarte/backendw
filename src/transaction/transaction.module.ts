import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PrismaModule } from 'prisma/prisma.module';
import { TransactionPaymentService } from './transaction-payment.service';

@Module({
  imports: [PrismaModule], 
  controllers: [TransactionController],
  providers: [TransactionService,TransactionPaymentService]
})
export class TransactionModule {}
