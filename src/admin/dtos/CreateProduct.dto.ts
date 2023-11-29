import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateProductDto{
    // @IsOptional()
    // image: string;
    
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: number;
}