import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Items, ItemsSchema } from 'src/items/schema/item.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:User.name,
    schema:UserSchema,
  },
  {
    name: Items.name,
    schema:ItemsSchema,
  },
])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
