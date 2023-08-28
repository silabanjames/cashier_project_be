import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class RefreshToken{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    isRevoked: boolean;

    @Column()
    expiredAt: Date;

    @ManyToOne(()=>User, (user)=> user.refreshToken)
    user: User;
}