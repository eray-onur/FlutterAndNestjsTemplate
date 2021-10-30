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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const add_user_command_1 = require("./commands/add-user.command");
const update_user_command_1 = require("./commands/update-user.command");
const find_all_users_query_1 = require("./queries/find-all-users.query");
const find_user_by_email_query_1 = require("./queries/find-user-by-email.query");
const find_user_by_id_query_1 = require("./queries/find-user-by-id.query");
const find_user_by_username_query_1 = require("./queries/find-user-by-username.query");
let UserService = class UserService {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    async findOneById(id) {
        return await this.queryBus.execute(new find_user_by_id_query_1.FindUserByIdQuery(id));
    }
    async findOneByEmail(email) {
        return await this.queryBus.execute(new find_user_by_email_query_1.FindUserByEmailQuery(email));
    }
    async findOneByUsername(username) {
        return await this.queryBus.execute(new find_user_by_username_query_1.FindUserByUsernameQuery(username));
    }
    async findAll() {
        return await this.queryBus.execute(new find_all_users_query_1.FindAllUsersQuery());
    }
    async addUser(createUserDto) {
        return await this.commandBus.execute(new add_user_command_1.AddUserCommand(createUserDto.email, createUserDto.username, createUserDto.password));
    }
    async updateUser(updateUserDto) {
        return await this.commandBus.execute(new update_user_command_1.UpdateUserCommand(updateUserDto.email, updateUserDto.username, updateUserDto.password));
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map