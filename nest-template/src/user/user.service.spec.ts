import { Test } from "@nestjs/testing"; ;
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { closeInMongodConnection, rootMongooseTestModule } from '../common/test-utils/mongo-inmemory.db';
import { CreateUserDto } from "./dtos/create-user.dto";

describe('UserService', () => {
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([{
                    name: User.name, schema: UserSchema
                }]),
            ],
            providers: [
                UserService
            ]
        }).compile();

        userService = moduleRef.get<UserService>(UserService);
    });

    describe('findOneById', () => {
        it('should return user with specified object id', async () => {
            const result : User = {
                _id: 'DUMMYID',
                username: 'erayonur',
                email: 'xyz@google.com',
                password: 'DUMMY',
                password_salt: 'DUMMY',
                created_at: new Date()
            }
            
            jest.spyOn(userService, 'findOneById').mockImplementation(async () => result);

            expect(await userService.findOneById('DUMMYID')).toBe(result);
        });
    });

    describe('findOneByEmail', () => {
        it('should return user with specified email', async () => {
            const result : User = {
                username: 'erayonur',
                email: 'xyz@google.com',
                password: 'DUMMY',
                password_salt: 'DUMMY',
                created_at: new Date()
            }

            jest.spyOn(userService, 'findOneByEmail').mockImplementation(async () => result);

            expect(await userService.findOneByEmail('xyz@google.com')).toBe(result);
        });
    });

    describe('findOneByUsername', () => {
        it('should return user with specified username', async () => {
            const result = new User();
            result.username = 'johndoe3131';

            jest.spyOn(userService, 'findOneByUsername').mockImplementation(async () => result);

            expect(await userService.findOneByUsername('johndoe3131')).toBe(result);
        });
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

    describe('addUser', () => {
        
        it('should create user with given dto successfully', async () => {
            const userToAdd: CreateUserDto = {
                email: 'dummyemail@gmail.com',
                username: 'dummyuname',
                password: 'DUMMYPW'
            };
    
            const addedUser: User = {
                ...userToAdd,
                created_at: new Date(),
                password_salt: 'DUMMYPWSALT'
            }
    
            jest.spyOn(userService, 'addUser').mockImplementation(async () => addedUser);
    
            expect(await userService.addUser(userToAdd)).toEqual(addedUser);
        });
    });


    afterAll(async() => {
        await closeInMongodConnection();
    });

});

