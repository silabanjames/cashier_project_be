import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/typeorm/entities/Cart';
import { addToCartParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    ) {}

    async addToCart(cartItem: addToCartParams){
        const { id } = cartItem
        const product = await this.cartRepository.findOneBy({ id })

        // Problem: Get User from JWT

        const newCart = this.cartRepository.create({
            ...cartItem,
            product,
        })
    }

    async deleteCartItem(id: string){
        // check if id cart is not found in data
        return await this.cartRepository.delete({ id });
    }

    itemTransaction(){
        
    }
}
