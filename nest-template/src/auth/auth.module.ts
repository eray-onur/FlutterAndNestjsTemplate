import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { secret } from "./auth.constants";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { CommandHandlers } from "./commands/handlers";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

// const queryHandlers = [FindAllUsersQueryHandler, FindUserByEmailQueryHandler, FindUserByIdQueryHandler, FindUserByUsernameQueryHandler]

@Module({
    imports: [
        CqrsModule,
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: secret,
            signOptions: { expiresIn: '6000s' },
        })
    ],
    controllers: [AuthController],
    providers: [
        ...CommandHandlers,
        AuthService,
        AuthRepository,
        LocalStrategy,
        JwtStrategy,
    ]
})
export class AuthModule {}