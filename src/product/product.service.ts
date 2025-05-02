import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';


@Injectable()
export class ProductService {
    constructor(private prisma:PrismaService){}

    findAll(){
        return this.prisma.product.findMany();
    }

    async createProduct(createProductDto: CreateProductDto) {
        return this.prisma.product.create({
          data: createProductDto,  
        });
      }
}
