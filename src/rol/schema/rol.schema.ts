import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type RolDocument = HydratedDocument<Rol>

@Schema()
export class Rol {
  @Prop({ required: true })
  name:string
}
export const RolSchema = SchemaFactory.createForClass(Rol)