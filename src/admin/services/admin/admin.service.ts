import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { CreateProductParams, UpdateProductParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor (
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ){}

    async createProduct(productDetails: CreateProductParams): Promise<Product>{
        const newProdcut = this.productRepository.create({
            ...productDetails
        });
        return await this.productRepository.save(newProdcut);
    }

    async getProductDetails(id: string): Promise<Product>{
        const result = await this.productRepository.findOneBy({id});
        if(!result){
            throw new HttpException(
                'Product tidak ditemukan',
                HttpStatus.BAD_REQUEST,
            );
        }
        return result;
    }

    async updateProduct(id: string, productDetails: UpdateProductParams): Promise<any>{
        const result = await this.productRepository.update({id}, {...productDetails});
        if(result.affected == 0){
            throw new NotFoundException(`Product with id ${id} is not found`);
        }
        return {
            message: "Success to update product",
        }
    }

    async deleteProduct(id: string): Promise<any>{
        const result =  await this.productRepository.delete({id});
        if(result.affected == 0){
            throw new NotFoundException(`Product with id ${id} is not found`);
        }
        return{
            message: "Product has been deleted",
        };
    }
}
