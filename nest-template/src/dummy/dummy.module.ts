import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { secret } from "./../auth/auth.constants";

import { AuthService } from "./../auth/auth.service";
import { DummyController } from "./dummy.controller";
import { JwtStrategy } from "./../auth/strategies/jwt.strategy";
import { LocalStrategy } from "./../auth/strategies/local.strategy";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: secret,
            signOptions: { expiresIn: '1800s' },
        })
    ],
    controllers: [DummyController],
    providers: [
        LocalStrategy,
        JwtStrategy,
    ]
})
export class DummyModule {}