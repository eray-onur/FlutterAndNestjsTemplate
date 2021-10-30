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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../user/dtos/create-user.dto");
const signin_user_dto_1 = require("../user/dtos/signin-user.dto");
const user_schema_1 = require("../user/user.schema");
const registered_user_dto_1 = require("../user/dtos/registered-user.dto");
const constants_1 = require("../common/constants");
const authorized_user_dto_1 = require("../user/dtos/authorized-user.dto");
const user_repository_1 = require("../user/user.repository");
const cqrs_1 = require("@nestjs/cqrs");
const register_command_1 = require("./commands/register.command");
const login_command_1 = require("./commands/login.command");
let AuthService = class AuthService {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async register(createUserDto) {
        const commandResult = await this.commandBus.execute(new register_command_1.RegisterCommand(createUserDto.email, createUserDto.username, createUserDto.password));
        return commandResult;
    }
    async login(signinUserDto) {
        const commandResult = await this.commandBus.execute(new login_command_1.LoginCommand(signinUserDto.username, signinUserDto.password));
        return commandResult;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map