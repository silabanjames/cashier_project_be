import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity({name: 'cart'})
export class Cart{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    bought_at: Date;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @ManyToOne(() => Product, (product)=>product.carts)
    product: Product;

    @ManyToOne(() => User, (user)=>user.carts)
    user: User;
}