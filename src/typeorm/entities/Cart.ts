import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity({name: 'cart'})
export class Cart{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, (product)=>product.carts,  { onDelete: 'CASCADE' })
    product: Product;

    @ManyToOne(() => User, (user)=>user.carts)
    user: User;
}