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
const registered_user_dto_1 = require("../user/dtos/registered-user.dto");
const constants_1 = require("../common/constants");
const authorized_user_dto_1 = require("../user/dtos/authorized-user.dto");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        let alreadyRegistered = await this.userService.findOneByEmail(createUserDto.email);
        if (alreadyRegistered)
            throw new common_1.HttpException('User with same email already exists', 403);
        let userWithSameUsername = await this.userService.findOneByUsername(createUserDto.username);
        if (userWithSameUsername)
            throw new common_1.HttpException('User with the same username already exists', 403);
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(constants_1.saltRounds);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const newUser = {
            email: createUserDto.email,
            username: createUserDto.username,
            password: hashedPassword,
            password_salt: salt,
            created_at: new Date()
        };
        const addedUser = await this.userService.addUser(newUser);
        const token = await this.jwtService.signAsync({
            sub: addedUser._id,
            username: addedUser.username
        });
        const registeredUserDto = {
            username: addedUser.username,
            token: token
        };
        return registeredUserDto;
    }
    async login(signinUserDto) {
        const foundUser = await this.userService.findOneByUsername(signinUserDto.username);
        if (foundUser) {
            const bcrypt = require('bcrypt');
            const hashedPassword = await bcrypt.hash(signinUserDto.password, foundUser.password_salt);
            console.log(`${hashedPassword} -- ${foundUser.password}`);
            if (hashedPassword !== foundUser.password) {
                throw new common_1.HttpException(`Invalid password.`, 401);
            }
            const token = await this.jwtService.signAsync({
                sub: foundUser._id,
                username: foundUser.username
            });
            const authorizedUser = {
                username: foundUser.username,
                token: token
            };
            return authorizedUser;
        }
        else
            throw new common_1.HttpException('No user with this username exists!', 403);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map