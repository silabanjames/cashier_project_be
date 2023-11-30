import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './service/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { Cart } from 'src/typeorm/entities/Cart';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Cart])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
