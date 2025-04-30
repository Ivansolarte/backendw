import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';
import { ProductModule } from './product/product.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule, TransactionModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
