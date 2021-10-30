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
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const create_user_dto_1 = require("../user/dtos/create-user.dto");
const signin_user_dto_1 = require("../user/dtos/signin-user.dto");
const user_schema_1 = require("../user/user.schema");
const registered_user_dto_1 = require("../user/dtos/registered-user.dto");
const constants_1 = require("../common/constants");
const authorized_user_dto_1 = require("../user/dtos/authorized-user.dto");
const user_repository_1 = require("../user/user.repository");
const invalid_credentials_exception_1 = require("../common/entities/custom-exceptions/invalid-credentials.exception");
const nonexistent_user_exception_1 = require("../common/entities/custom-exceptions/nonexistent-user.exception");
const username_taken_exception_1 = require("../common/entities/custom-exceptions/username-taken.exception");
const email_taken_exception_1 = require("../common/entities/custom-exceptions/email-taken.exception");
let AuthRepository = class AuthRepository {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        let alreadyRegistered = await this.userRepository.findOneByEmail(createUserDto.email);
        if (alreadyRegistered)
            throw new email_taken_exception_1.EmailTakenException();
        let userWithSameUsername = await this.userRepository.findOneByUsername(createUserDto.username);
        if (userWithSameUsername)
            throw new username_taken_exception_1.UsernameTakenException();
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
        const addedUser = await this.userRepository.addUser(newUser);
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
        const foundUser = await this.userRepository.findOneByUsername(signinUserDto.username);
        if (foundUser) {
            const bcrypt = require('bcrypt');
            const hashedPassword = await bcrypt.hash(signinUserDto.password, foundUser.password_salt);
            console.log(`${hashedPassword} -- ${foundUser.password}`);
            if (hashedPassword !== foundUser.password) {
                throw new invalid_credentials_exception_1.InvalidCredentialsException();
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
            throw new nonexistent_user_exception_1.NonexistentUserException();
    }
};
AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository, jwt_1.JwtService])
], AuthRepository);
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map