import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ProductService } from 'src/product/service/product/product.service';
import Response from 'express';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('product')
@UseGuards(JwtGuard)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getProductList(): any{
        const product = this.productService.getProductList();
        return product;
        // return {
        //     data: product
        // }
    }

    // temporary function
    @Post()
    createProduct(@Body() payloads){
        return this.productService.createProduct(payloads)
    }

}
