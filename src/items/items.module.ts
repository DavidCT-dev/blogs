import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Items, ItemsSchema } from './schema/item.schema';
import { User, UserSchema } from 'src/users/schema/user.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Items.name,
    schema:ItemsSchema
  },
  {
    name: User.name,
    schema: UserSchema,
  },
])],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
