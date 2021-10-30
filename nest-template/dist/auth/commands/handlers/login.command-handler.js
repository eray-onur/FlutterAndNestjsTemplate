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
exports.LoginCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const auth_repository_1 = require("../../auth.repository");
const authorized_user_dto_1 = require("../../../user/dtos/authorized-user.dto");
const login_command_1 = require("../login.command");
let LoginCommandHandler = class LoginCommandHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(command) {
        return await this.authRepository.login(command);
    }
};
LoginCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(login_command_1.LoginCommand),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository])
], LoginCommandHandler);
exports.LoginCommandHandler = LoginCommandHandler;
//# sourceMappingURL=login.command-handler.js.map