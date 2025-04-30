import {  Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards  } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { $Enums } from '@prisma/client'; 
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('transaction')
@UseGuards(JwtAuthGuard)
export class TransactionController {
    constructor(private  transactionService: TransactionService) {}

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto) {
      // Asignar 'PENDING' a status si no está presente
      const transaction = {
        ...createTransactionDto,
        status: createTransactionDto.status || 'PENDING', // Si status no es enviado, asignar 'PENDING'
      };
    //   console.log(createTransactionDto);
      
  
    //   return createTransactionDto
      return this.transactionService.createTransaction(transaction);
    }

    @Post('simulate-payment')
    async simulatePayment(@Body('transactionId') transactionId: number) {
      const result = await this.transactionService.simulatePayment(transactionId);
      return result;
    }
  
    @Patch(':id')
    updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: $Enums.TransactionStatus) {
        return this.transactionService.updateStatusTransaction(id, status);
    }


}
