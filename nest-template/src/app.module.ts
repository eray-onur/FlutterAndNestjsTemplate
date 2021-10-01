import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { dbName } from './common/constants';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017/${dbName}`),
    AuthModule, 
    UserModule
  ],
})
export class AppModule {}
