import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/GetUser.decorator';
import { AddToCartDto } from 'src/cart/dtos/AddToCart.dto';
import { CartService } from 'src/cart/services/cart/cart.service';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('cart')
@UseGuards(JwtGuard)
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    getCart(){
        return this.cartService.getCart();
    }

    @Post()
    addToCart(@Body() itemCart: AddToCartDto, @GetUser() user): Promise<void>{
        return this.cartService.addToCart(user.id, itemCart);
    }

    @Delete(':id')
    deleteCartItem( @Param('id') id: string ): Promise<any>{
        console.log(id)
        return this.cartService.deleteCartItem(id);
    }

    @Post('transaction')
    itemTransaction():Promise<void>{
        return this.cartService.itemTransaction();
    }

}
