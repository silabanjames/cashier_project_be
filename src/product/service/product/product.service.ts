import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { Repository } from 'typeorm';
// import { StaticFileService } from '@nestjs/platform-express';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) {}

    async getProductList(): Promise<{data: Product[]}>{
        const getProducts =  await this.productRepository
        .createQueryBuilder('product')
        .select('prod')
        .from(Product, 'prod')
        .getMany();

        // console.log(getProducts);
        // return getProducts;
        return {
            data: getProducts
        };
    }

    // async findProductImage(filename: string){
    //     const iamge = await this.
    // }

    // temporary function
    createProduct(prodcutDetails): Promise<Product[]>{
        const newProduct = this.productRepository.create({
            ...prodcutDetails
        });
        return this.productRepository.save(newProduct);
    }
    
}
