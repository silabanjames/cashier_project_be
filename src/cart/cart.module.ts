import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart/cart.controller';
import { CartService } from './services/cart/cart.service';
import { Cart } from 'src/typeorm/entities/Cart';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
