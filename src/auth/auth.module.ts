import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { RefreshToken } from 'src/typeorm/entities/RefreshToken';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]), 
    JwtModule.register(jwtConfig),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
