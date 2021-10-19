import { Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";
import { JwtPayloadDto } from "../dtos/jwt-payload.dto";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: JwtPayloadDto): Promise<{
        sub: string;
        username: string;
    }>;
}
export {};
