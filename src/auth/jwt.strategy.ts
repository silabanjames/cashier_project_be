import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "./services/auth/auth.service";
import { jwtConfig } from "src/config/jwt.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConfig.secret,
        });
    
        
    }
    
    // sudah dapat bersihnya payload
    async validate(payload: any){
        const user = this.authService.findUserById(payload.sub);
        if(!user){
            throw new UnauthorizedException('User is not found');
        }

        return user;
    }
}