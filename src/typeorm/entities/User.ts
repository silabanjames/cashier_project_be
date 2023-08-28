import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { History } from "./History";
import { Cart } from "./Cart";
import { RefreshToken } from "./RefreshToken";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    role: string;

    @OneToMany(()=> History, (history)=>history.user)
    histories: History[];

    @OneToMany(()=> Cart, (cart)=>cart.user)
    carts: Cart[];

    @OneToMany(()=>RefreshToken, (token)=>token.user)
    refreshToken: RefreshToken[];
}