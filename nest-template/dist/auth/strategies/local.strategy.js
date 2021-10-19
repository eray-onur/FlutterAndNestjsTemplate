"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const signin_user_dto_1 = require("../../user/dtos/signin-user.dto");
class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async validate(username, password) {
        const userInfo = await this.authService.login({ username, password });
        if (!userInfo) {
            throw new common_1.UnauthorizedException();
        }
        return userInfo;
    }
}
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map