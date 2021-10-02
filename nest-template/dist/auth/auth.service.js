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
const jwt_1 = require("@nestjs/jwt");
const create_user_dto_1 = require("../user/dtos/create-user.dto");
const signin_user_dto_1 = require("../user/dtos/signin-user.dto");
const user_schema_1 = require("../user/user.schema");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(payload) {
        const user = await this.userService.findOneByUsername(payload.username);
        if (user) {
            return Promise.resolve(user);
        }
        return Promise.reject('No such user was found.');
    }
    async register(createUserDto) {
        try {
            const addedUser = await this.userService.addUser(createUserDto);
            return Promise.resolve(addedUser);
        }
        catch (err) {
            return Promise.reject(`Failed to create user. Reason: ${err}`);
        }
    }
    async login(signinUserDto) {
        try {
            const foundUser = await this.userService.findOneByUsername(signinUserDto.username);
            if (foundUser) {
                if (foundUser.password !== signinUserDto.password)
                    throw new Error(`Invalid password.`);
                else
                    return {
                        access_token: this.jwtService.sign({ foundUser }),
                    };
            }
            throw new Error(`Login failed for user ${signinUserDto.username}.`);
        }
        catch (ex) {
            console.log(ex.statusCode);
            return {
                message: ex.message
            };
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map