import { IsNotEmpty } from "class-validator";

export class refreshTokenDto{
    @IsNotEmpty()
    refresh_token: string;
}