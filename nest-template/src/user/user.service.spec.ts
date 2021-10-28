import { Test } from "@nestjs/testing"; 
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { UserModule } from "./user.module";
import { connString, dbName } from "../common/constants";
import { Model } from "mongoose";

describe('UserService', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(`${connString}/${dbName}`),
                MongooseModule.forFeature([{
                    name: User.name, schema: UserSchema
                }]),
                UserModule
            ],
        }).compile();

        userService = moduleRef.get<UserService>(UserService);
    });


    describe('findAll', () => {
        it('should return all users', async () => {
            const result = [
                new User()
            ];
            jest.spyOn(userService, 'findAll').mockImplementation(async () => result);

            expect(await userService.findAll()).toBe(result);
        });
    });

    describe('findOneByUsername', () => {
        it('should return user with specified username', async () => {
            const result = new User();
            result.username = 'johndoe3131'
            jest.spyOn(userService, 'findOneByUsername').mockImplementation(async () => result);

            expect(await userService.findOneByUsername('johndoe3131')).toBe(result);
        });
    });

});

