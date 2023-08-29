import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/typeorm/entities/Cart';
import { Product } from 'src/typeorm/entities/Product';
import { User } from 'src/typeorm/entities/User';
import { History } from 'src/typeorm/entities/History';
import { addToCartParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(History) private readonly historyRepository: Repository<History>,
    ) {}

    async addToCart(userId: string, cartItem: addToCartParams): Promise<any>{
        // cek, apakah bisa masuk ke database jika productId diganti menjadi id saja
        const {productId, quantity} = cartItem;
        const product = await this.productRepository.createQueryBuilder('product')
                        .select('product')
                        .where("id = :id", { id: productId })
                        .getOne();

        const user = await this.userRepository.createQueryBuilder('user')
                    .select('user')
                    .where("id = :id", { id: userId })
                    .getOne();

        // jika quantity yang mau dibeli lebih banyak dari stock
        if (product.stock < cartItem.quantity){
            throw new BadRequestException("Stock product tidak mencukupi");
        }

        const newCart = this.cartRepository.create({
            quantity,
            product,
            user
        })

        try{
            await this.cartRepository.save(newCart);
            return {
                message: "Product added to cart"
            };
        }
        catch(e){
            throw new InternalServerErrorException(e)
        }

    }

    async deleteCartItem(id: string): Promise<any>{
        // check if id cart is not found in data

        const result = await this.cartRepository.delete(id);
        if(result.affected === 0){
            throw new HttpException(
                'Pilih produk yang ingin dihapus',
                HttpStatus.BAD_REQUEST,
            );
        }
        return {
            message: "Cart deleted"
        };

    }

    async itemTransaction(): Promise<any>{
        // Pindahkan ke history
        const cart = await this.cartRepository.find({relations: ['product']});
        const newHistory = this.historyRepository.create();
        const date = new Date();
        date.setTime(date.getHours());
        newHistory.bought_at = date;
        await this.historyRepository.save(newHistory);

        console.log(cart);

        // Kurangi stock Product
        for(let item of cart){
            const spesificProduct = await this.productRepository.findOneBy({id: item.product.id});
            spesificProduct.stock -= item.quantity;
            this.productRepository.save(spesificProduct);
        }

        // Hapus cart
        await this.cartRepository.clear();

        return{
            message: "Transaction success",
        }
    }

    async getCart(){
        return await this.cartRepository.find();
    }
}
