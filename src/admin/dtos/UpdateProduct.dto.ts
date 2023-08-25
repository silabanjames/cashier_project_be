import { IsNumber, IsOptional } from "class-validator";

export class UpdateProductDto{
    @IsOptional()
    image: string;
    
    @IsOptional()
    title: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    stock: number;
}