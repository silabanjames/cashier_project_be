import { IsNotEmpty } from "class-validator";

export class AddToCartDto{
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    quantity: number;
}