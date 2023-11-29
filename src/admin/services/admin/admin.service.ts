import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { CreateProductParams, UpdateProductParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class AdminService {
    constructor (
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ){}

    async createProduct(productDetails: CreateProductParams, image: string): Promise<any>{
        try{
            image = `${process.env.URL}:${process.env.PORT}/${image}`
            const newProdcut = this.productRepository.create({
                ...productDetails,
                image
            });
            await this.productRepository.save(newProdcut);
            return {
                message: "Success to create product"
            }
        }
        catch(err){
            return {
                error: err
            }
        }
    }

    async getProductDetails(id: string): Promise<{data:Product}>{
        const result = await this.productRepository.findOneBy({id});
        if(!result){
            throw new HttpException(
                'Product tidak ditemukan',
                HttpStatus.BAD_REQUEST,
            );
        }
        return{
            data: result
        };
    }

    async updateProduct(id: string, productDetails: UpdateProductParams, file: Express.Multer.File): Promise<any>{
        try{
            if(Object.keys(productDetails).length == 0 && !file){
                throw new BadRequestException('Must change at least 1 property of item')
            }
            let productDetailsContainer = {...productDetails}
            if(file){
                const product = await this.getProductDetails(id)
                await fs.unlink(`.${product.data.image.replace(`${process.env.URL}:${process.env.PORT}`, '')}`, (err) => {
                    if(err){
                        console.error(err);
                        return err
                    }
                })
                productDetailsContainer.image = `${process.env.URL}:${process.env.PORT}/${file.path}`
            }
            const result = await this.productRepository.update({id}, {...productDetailsContainer});
            if(result.affected == 0){
                throw new NotFoundException(`Product with id ${id} is not found`);
            }
            return {
                message: "Success to update product",
            }
        }
        catch(err){
            console.error(err)
            return {
                error: err
            }
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
