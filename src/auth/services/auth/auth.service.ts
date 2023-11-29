import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { RefreshTokenParams, SignInParams, SignUpParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/typeorm/entities/RefreshToken';
import { refreshTokenConfig } from 'src/config/jwt.config';
import { LoginResponse } from 'src/auth/interface/LoginResponse.interface';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(userDetails: SignInParams): Promise<LoginResponse>{
        const { email, password } = userDetails;
        const searchUser =  await this.userRepository.findOneBy({ email });
        if (!searchUser){
            throw new HttpException(
                'Email atau password salah',
                HttpStatus.BAD_REQUEST,
            );
        }

        const comparePass = await bcrypt.compare(password, searchUser.password);
        if (!comparePass){
            throw new HttpException(
                'Email atau password salah',
                HttpStatus.BAD_REQUEST,
            );
        }

        const access_token = await this.createAccessToken(searchUser);
        const refresh_token = await this.createRefreshToken(searchUser)
        const user_information = {
            name: searchUser.name,
            email: searchUser.email,
            role: searchUser.role
        }

        return {
            access_token, refresh_token, user_information
        };
    }

    async signUp(userDetails: SignUpParams): Promise<any>{
        const { email } = userDetails;
        const result = await this.userRepository.findOneBy({ email });
        if(result){
            throw new HttpException(
                'Email telah digunakan',
                HttpStatus.BAD_REQUEST,
            );
        }
        const newUser = this.userRepository.create();

        newUser.name = userDetails.name;
        newUser.email = userDetails.email;
        newUser.password = userDetails.password;
        newUser.salt = await bcrypt.genSalt();
        newUser.password = await bcrypt.hash( userDetails.password, newUser.salt );
        newUser.role = 'kasir';

        await this.userRepository.save(newUser);

        return {
            message: "Success, user created."
        }
    }

    async findUserById(id: string): Promise<User>{
        return await this.userRepository.findOneBy({ id });
    }

    async revokeRefreshToken(id: string){
        const refreshToken = await this.refreshTokenRepository.findOneBy({id});
        if(!refreshToken){
            throw new NotFoundException('Refresh token is not found');
        }

        refreshToken.isRevoked = true;
        await this.refreshTokenRepository.save(refreshToken)
        return {
            message: "Refresh token has been revoked",
        };
    }

    //  --- Access Token ---
    async createAccessToken(user: User): Promise<string>{
        const payload = {
            sub: user.id,
        }
        const access_token = await this.jwtService.signAsync(payload);

        return access_token;
    }
    // --- <> ---

    // --- Refresh Token ----
    async createRefreshToken(user: User): Promise<string>{
        const refreshToken = await this.saveRefreshToken(
            user,
            +refreshTokenConfig.expiresIn,
        );

        const payload = {
            jid: refreshToken.id
        }

        const refresh_token = await this.jwtService.signAsync(payload, refreshTokenConfig);

        return refresh_token;
    }

    async saveRefreshToken(user:User, ttl: number): Promise<RefreshToken>{
        const newRefreshToken = this.refreshTokenRepository.create();
        newRefreshToken.user = user;
        newRefreshToken.isRevoked = false;
        const expiredAt = new Date();
        expiredAt.setTime(expiredAt.getTime() + ttl);
        newRefreshToken.expiredAt = expiredAt;
        return await this.refreshTokenRepository.save(newRefreshToken);
    }
    //  --- <> ----

    // --- Refresh Access Token ---
    async refreshAccessToken(refreshTokenParams: RefreshTokenParams): Promise<{access_token: string}>{
        const {refresh_token} = refreshTokenParams
        const payload = await this.decodeToken(refresh_token);

        const refreshToken = await this.refreshTokenRepository.findOne({
            where: { id: payload.jid },
            relations: ['user'],
        });

        // refresh token tidak ditemukan pada database
        if(!refreshToken){
            throw new UnauthorizedException('Refresh token is not found');
        }

        if(refreshToken.isRevoked){
            throw new UnauthorizedException('Refresh token has been revoked')
        }

        const access_token = await this.createAccessToken(refreshToken.user);

        return {
            access_token
        };

    }

    async decodeToken(token: string): Promise<any>{
        try{
            const payload = this.jwtService.verifyAsync(token);
            return payload;
        }
        catch(e){
            if(e instanceof TokenExpiredError){
                throw new UnauthorizedException('Refresh token is expired');
            }
            else{
                throw new InternalServerErrorException('Failed to decode token');
            }
        }

    }
    // --- <> ---

     // temporary function
    async createAdmin(adminDetails: SignUpParams): Promise<any>{
        const { email } = adminDetails;
        const result = await this.userRepository.findOneBy({ email });
        if(result){
            throw new HttpException(
                'Email telah digunakan',
                HttpStatus.BAD_REQUEST,
            );
        }

        const newUser = this.userRepository.create();

        newUser.name = adminDetails.name;
        newUser.email = adminDetails.email;
        newUser.password = adminDetails.password;
        newUser.salt = await bcrypt.genSalt();
        newUser.password = await bcrypt.hash( adminDetails.password, newUser.salt );
        newUser.role = 'admin';

        await this.userRepository.save(newUser);

        return {
            message: "Success, user created."
        };
    }

    async getAllRefreshToken(): Promise<RefreshToken[]>{
        return await this.refreshTokenRepository.find();
    }
}
