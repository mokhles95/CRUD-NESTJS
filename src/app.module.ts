import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {UserModule} from './users/users.module'
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestJsExample')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
