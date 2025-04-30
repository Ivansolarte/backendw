//productcontroller
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from "@prisma/client";
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";


@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  async createProduct(@Body() productData: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(productData);
  }


}
