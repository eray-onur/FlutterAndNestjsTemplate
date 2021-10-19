import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { connString, dbName } from './common/constants';
import { DummyModule } from './dummy/dummy.module';

@Module({
  imports: [
    MongooseModule.forRoot(`${connString}/${dbName}`),
    AuthModule, 
    UserModule,
    DummyModule
  ],
})
export class AppModule {}
