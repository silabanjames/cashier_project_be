import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { SignInParams, SignUpParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(userDetails: SignInParams): Promise<{ access_token: string }>{
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

        return {access_token};
    }

    async createAccessToken(user: User): Promise<string>{
        const payload = {
            sub: user.id,
        }
        const access_token = await this.jwtService.signAsync(payload);

        return access_token;
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
        }
    }
}
