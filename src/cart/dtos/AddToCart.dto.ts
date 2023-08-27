import { IsNotEmpty } from "class-validator";

export class AddToCartDto{
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    quantity: number;
}