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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let UserRepository = class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findOneById(id) {
        return await this.userModel.findById(id);
    }
    async findOneByEmail(email) {
        return await this.userModel.findOne({ email: email });
    }
    async findOneByUsername(username) {
        return await this.userModel.findOne({ username: username });
    }
    async findAll() {
        return await this.userModel.find().exec();
    }
    async addUser(createUserDto) {
        const createdUser = Object.assign(Object.assign({}, createUserDto), { created_at: new Date() });
        const result = new this.userModel(createdUser);
        return await result.save();
    }
    async updateUser(updateUserDto) {
        const updatedUser = Object.assign(Object.assign({}, updateUserDto), { modified_at: new Date() });
        const result = new this.userModel(updatedUser);
        return await result.save();
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map