import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Items, ItemsSchema } from 'src/items/schema/item.schema';
import { Rol, RolSchema } from 'src/rol/schema/rol.schema';
// import { TOKEN_SECRET } from 'src/config';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
    },
    {
      name: Items.name,
      schema:ItemsSchema,
    },
    {
      name: Rol.name,
      schema: RolSchema
    }
  ], ),
  JwtModule.register({
    global:true,
    secret: 'MiSemillaSecreta',
    signOptions:{expiresIn:'1h'}, 
  }),
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
