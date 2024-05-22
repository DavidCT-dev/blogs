import { Prop } from "@nestjs/mongoose";
import { Items } from "src/items/schema/item.schema";
import { Rol } from "src/rol/schema/rol.schema";

export class CreateUserDto {
  name:string;
  email:string;
  password:string;
  rol: Rol[];
  token: string;
  posts: Items[]
}
