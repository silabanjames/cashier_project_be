import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { History } from "./History";
import { Cart } from "./Cart";

@Entity({name:'products'})
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    image: string;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @OneToMany(() => History, (history)=> history.product)
    histories: History[];

    @OneToMany(()=> Cart, (cart)=>cart.product)
    carts: Cart[];
}