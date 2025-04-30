import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';
import { PrismaService } from 'prisma/prisma.service';



@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService]
})
export class UserModule {}
