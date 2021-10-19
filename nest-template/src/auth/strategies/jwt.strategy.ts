import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";
import { secret } from "../auth.constants";
import { AuthService } from "../auth.service";
import { JwtPayloadDto } from "../dtos/jwt-payload.dto";

Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        });
    }

    async validate(payload: JwtPayloadDto) {
        console.log(payload);
        return { sub: payload.sub, username: payload.username };
        //return { sub: payload.username, username: payload.username };
    }
}