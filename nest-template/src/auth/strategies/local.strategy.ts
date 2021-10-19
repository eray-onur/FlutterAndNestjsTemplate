import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { SigninUserDto } from "src/user/dtos/signin-user.dto";
import { AuthService } from "../auth.service";

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password:string): Promise<any> {
        const userInfo = await this.authService.login({username, password});
        if(!userInfo) {
            throw new UnauthorizedException();
        }
        return userInfo;
    }
}