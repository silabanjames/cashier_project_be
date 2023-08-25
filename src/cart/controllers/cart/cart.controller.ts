import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AddToCartDto } from 'src/cart/dtos/AddToCart.dto';
import { CartService } from 'src/cart/services/cart/cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
    
    // Problem: Get User from JWT
    @Post()
    addToCart(@Body() itemCart: AddToCartDto){
        return this.cartService.addToCart(itemCart);
    }

    @Delete(':id')
    deleteCartItem( @Param('id') id: string ){
        return this.cartService.deleteCartItem(id);
    }

    @Post('transaction')
    itemTransaction( ){}

}
