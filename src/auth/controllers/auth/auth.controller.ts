import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { SignInDto } from 'src/auth/dtos/SignIn.dto';
import { SignUpDto } from 'src/auth/dtos/SignUp.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('sign-in')
    signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }>{
        return this.authService.signIn(signInDto);
    }

    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto): any{
        return this.authService.signUp(signUpDto)
    }

    // Temporary Function
    @Post('admin')
    createAdmin(@Body() adminDetails: SignUpDto): any{
        this.authService.createAdmin(adminDetails);
        return {
            message: 'Success, user created',
        };
    }
}
