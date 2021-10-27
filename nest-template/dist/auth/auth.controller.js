"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_user_dto_1 = require("../user/dtos/create-user.dto");
const signin_user_dto_1 = require("../user/dtos/signin-user.dto");
const registered_user_dto_1 = require("../user/dtos/registered-user.dto");
const authorized_user_dto_1 = require("../user/dtos/authorized-user.dto");
const http_exception_filter_1 = require("../common/http-exception.filter");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(signinUserDto) {
        try {
            return await this.authService.login(signinUserDto);
        }
        catch (ex) {
            console.log(ex);
            throw new common_1.HttpException(ex.message, ex.status);
        }
    }
    async register(createUserDto) {
        try {
            const registeredUser = await this.authService.register(createUserDto);
            if (registeredUser) {
                return Promise.resolve(registeredUser);
            }
        }
        catch (ex) {
            console.log(ex);
            throw new common_1.HttpException(ex.message, ex.status);
        }
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map