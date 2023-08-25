import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ProductService } from 'src/product/service/product/product.service';
import Response from 'express';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getProductList(){
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
