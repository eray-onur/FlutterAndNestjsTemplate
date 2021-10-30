"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const user_module_1 = require("../user/user.module");
const auth_constants_1 = require("./auth.constants");
const auth_controller_1 = require("./auth.controller");
const auth_repository_1 = require("./auth.repository");
const auth_service_1 = require("./auth.service");
const handlers_1 = require("./commands/handlers");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const local_strategy_1 = require("./strategies/local.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: auth_constants_1.secret,
                signOptions: { expiresIn: '6000s' },
            })
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            ...handlers_1.CommandHandlers,
            auth_service_1.AuthService,
            auth_repository_1.AuthRepository,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map