import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [
    ItemsModule,
    MongooseModule.forRoot('mongodb+srv://ct55609:cI5cg4yJgDzvtil1@blog.pkkqspg.mongodb.net/test'
    ),
    AuthModule,
    UsersModule,
    RolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
