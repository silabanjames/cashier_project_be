import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ProductService } from 'src/product/service/product/product.service';
import Response from 'express';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Product } from 'src/typeorm/entities/Product';

@Controller('product')
@UseGuards(JwtGuard)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getProductList(): Promise<{data: Product[]}>{
        const product = this.productService.getProductList();
        return product;
    }

    @Get(':imagename')
    findProductImage(@Param('imagename') imagename: string, @Res() res){
        console.log(process.cwd() + 'store/productImages/' + imagename)
        return res.sendFile(process.cwd() + '/store/productImages/' + imagename)
    }

    // temporary function
    @Post()
    createProduct(@Body() payloads){
        return this.productService.createProduct(payloads)
    }

}
