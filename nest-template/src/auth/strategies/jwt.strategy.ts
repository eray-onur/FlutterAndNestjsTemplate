import { HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../auth.constants";
import { AuthService } from "../auth.service";
import { JwtPayloadDto } from "../dtos/jwt-payload.dto";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: JwtPayloadDto) {
        const userToValidate = await this.authService.validateUser(payload);
        if(!userToValidate) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}