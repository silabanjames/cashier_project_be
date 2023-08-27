import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart/cart.controller';
import { CartService } from './services/cart/cart.service';
import { Cart } from 'src/typeorm/entities/Cart';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { User } from 'src/typeorm/entities/User';
import { History } from 'src/typeorm/entities/History';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product, User, History])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
