import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/typeorm/entities/Cart';
import { Product } from 'src/typeorm/entities/Product';
import { Repository } from 'typeorm';
// import { StaticFileService } from '@nestjs/platform-express';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    ) {}

    async getProductList(userId): Promise<{data: Product[]}>{
        let getProducts =  await this.productRepository
        .createQueryBuilder('product')
        .select('prod')
        .from(Product, 'prod')
        .getMany();

        // const cartItems = await this.cartRepository.find({relations: ['product']});
        const cartItems = await this.cartRepository.createQueryBuilder("cart")
                            .leftJoinAndSelect('cart.user', 'users')
                            .leftJoinAndSelect('cart.product', 'products')
                            .where('users.id = :id', {id: userId})
                            .getMany()
        const cartProductId = cartItems.map((obj) => {
            return obj.product.id
        })

        getProducts = getProducts.map((obj) => {
            if(cartProductId.includes(obj.id)){
                obj.inCart = true
            }
            else{
                obj.inCart = false
            }
            return obj
        })

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
