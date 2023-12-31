import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorators/GetUser.decorator';
import { AddToCartDto } from 'src/cart/dtos/AddToCart.dto';
import { CartService } from 'src/cart/services/cart/cart.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Cart } from 'src/typeorm/entities/Cart';
import { User } from 'src/typeorm/entities/User';

@Controller('cart')
@UseGuards(JwtGuard)
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    getCart(@GetUser() user: User): Promise<{data: Cart[]}>{
        return this.cartService.getCart(user.id);
    }

    @Post()
    addToCart(@Body() itemCart: AddToCartDto, @GetUser() user): Promise<any>{
        // console.log(user)
        return this.cartService.addToCart(itemCart, user.id);
    }

    @Delete(':id')
    deleteCartItem( @Param('id') id: string ): Promise<any>{
        // console.log(id)
        return this.cartService.deleteCartItem(id);
    }

    @Delete("/product/:id")
    deleteCartWithProductId(@Param('id') id: string): Promise<any>{
        return this.cartService.deleteCartWithProductId(id);
    }

    @Post('transaction')
    itemTransaction(@GetUser() user: User):Promise<void>{
        return this.cartService.itemTransaction(user);
    }

}
