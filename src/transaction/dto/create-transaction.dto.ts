
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  customerAddress: string;

  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}
