import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { SignInDto } from 'src/auth/dtos/SignIn.dto';
import { SignUpDto } from 'src/auth/dtos/SignUp.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('sign-in')
    // @HttpCode(200)
    signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }>{
        return this.authService.signIn(signInDto);
    }

    @Post('sign-up')
    // @HttpCode(200)
    signUp(@Body() signUpDto: SignUpDto): Promise<void>{
        return this.authService.signUp(signUpDto);
    }
}
