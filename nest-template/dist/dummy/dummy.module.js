"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_constants_1 = require("./../auth/auth.constants");
const dummy_controller_1 = require("./dummy.controller");
const jwt_strategy_1 = require("./../auth/strategies/jwt.strategy");
const local_strategy_1 = require("./../auth/strategies/local.strategy");
const user_module_1 = require("../user/user.module");
let DummyModule = class DummyModule {
};
DummyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: auth_constants_1.secret,
                signOptions: { expiresIn: '1800s' },
            })
        ],
        controllers: [dummy_controller_1.DummyController],
        providers: [
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
        ]
    })
], DummyModule);
exports.DummyModule = DummyModule;
//# sourceMappingURL=dummy.module.js.map