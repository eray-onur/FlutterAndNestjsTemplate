import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserRepository } from './user.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    }])
  ],
  controllers: [
    UserController
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    UserRepository,
    UserService,
  ],
  exports: [
    UserRepository
  ]
})
export class UserModule {}