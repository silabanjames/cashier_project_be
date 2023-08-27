import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity({name: 'histories'})
export class History {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    bought_at: Date;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, (product)=>product.histories)
    product: Product;

    @ManyToOne(() => User, (user)=>user.histories)
    user: User;
}