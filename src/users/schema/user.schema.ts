import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";


import mongoose, { HydratedDocument } from 'mongoose';
import { Items } from "src/items/schema/item.schema";
import { Rol } from "src/rol/schema/rol.schema";

export type UserDocument =HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {  
  
  @Prop()
  @ApiProperty()
  name:string;
  
  @Prop({unique:true})
  @ApiProperty()
  email:string
  
  @Prop()
  @ApiProperty()
  password:string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rol' }]})
  @ApiProperty()
  rol: Rol[];

  
  @Prop()
  @ApiProperty()
  token?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Items' }] })
posts: Items[];
}

export const UserSchema = SchemaFactory.createForClass(User);