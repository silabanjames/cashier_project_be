import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { refreshTokenDto } from 'src/auth/dtos/RefreshToken.dto';
import { SignInDto } from 'src/auth/dtos/SignIn.dto';
import { SignUpDto } from 'src/auth/dtos/SignUp.dto';
import { LoginResponse } from 'src/auth/interface/LoginResponse.interface';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { RefreshToken } from 'src/typeorm/entities/RefreshToken';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-in')
    signIn(@Body() signInDto: SignInDto): Promise<LoginResponse>{
        return this.authService.signIn(signInDto);
    }

    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto): any{
        return this.authService.signUp(signUpDto)
    }

    @Get('refresh-token')
    refreshAccessToken(@Body() refreshTokenDto: refreshTokenDto): Promise<{access_token: string}>{
        return this.authService.refreshAccessToken(refreshTokenDto);
    }

    @Put(':id/revoke')
    revokeRefreshToken(@Param('id') id:string): Promise<any>{
        return this.authService.revokeRefreshToken(id);
    }

    // Temporary Route
    @Post('admin')
    createAdmin(@Body() adminDetails: SignUpDto): any{
        this.authService.createAdmin(adminDetails);
        return {
            message: 'Success, user created',
        };
    }

    @Get('all-refresh-token')
    getAllRefreshToken(): Promise <RefreshToken[]>{
        return this.authService.getAllRefreshToken();
    }
    // ---
}
