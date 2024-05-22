import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiConsumes } from "@nestjs/swagger";

import mongoose, { HydratedDocument } from 'mongoose';
import { User } from "src/users/schema/user.schema";

export type UserDocument =HydratedDocument<Items>;
@ApiConsumes('multipart/form-data')
@Schema({ timestamps: true })
export class Items {
  
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  // authorId:User;

  @Prop()
  name:string;  

  @Prop()
  price:number;

  @Prop()
  description:string;

  @Prop({ type: { public_id: String, url: String } })
  file: { public_id?: string; url?: string };
}

export const ItemsSchema = SchemaFactory.createForClass(Items);