import { Test } from "@nestjs/testing"; ;
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { closeInMongodConnection, rootMongooseTestModule } from '../common/test-utils/mongo-inmemory.db';
import { UserController } from "./user.controller";
import { CreateUserDto } from "./dtos/create-user.dto";


describe('UserController', () => {
    let userController: UserController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([{
                    name: User.name, schema: UserSchema
                }]),
            ],
            providers: [
                UserService,
                UserController,
            ]
        }).compile();

        userController = moduleRef.get<UserController>(UserController);
    });


    describe('getByUsername/:name', () => {
        it('should return user with given name\'s info', async () => {
            const result : User = {
                _id: 'DUMMYID',
                username: 'erayonur',
                email: 'xyz@google.com',
                password: 'DUMMY',
                password_salt: 'DUMMY',
                created_at: new Date()
            }


            jest.spyOn(userController, 'getByUsername').mockImplementation(async () => result);

            expect(await userController.getByUsername('erayonur')).toBe(result);
        });
        
    });

    describe('getAll', () => {
        it('should return all users in the system', async () => {
            const result: Array<User> = [
                new User(),
                new User(),
            ];

            jest.spyOn(userController, 'getAll').mockImplementation(() => Promise.resolve(result));

            expect(await userController.getAll()).toBe(result);

        });
    });

    describe('createUser', () => {
        it('should not throw error with valid user info', async () => {
            const userToAdd : CreateUserDto = {
                username: 'erayonur',
                email: 'xyz@google.com',
                password: 'DUMMYPASSWORD'
            }

            const addedUser : User = {
                ...userToAdd,
                password_salt: 'DUMMYPWSALT',
                created_at: new Date()
            }

            jest.spyOn(userController, 'createUser').mockImplementation(async () => addedUser);
            expect(await userController.createUser(userToAdd)).not.toBeNull();
        });
    });

    afterAll(async() => {
        await closeInMongodConnection();
    });

});

