import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Matches, MaxLength, MinLength } from "class-validator";

export class ChangePasswordAuthDto {

  @ApiProperty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z]{1,7}\.[a-zA-Z]{1,6}$/
  , {message:'The email field can only contain upper and lower case letters numbers .  _   - '})
  email:string;
  

  @Matches(/^[^<>()\[\]{}\/?\\\-+_:;"',.]*$/, {message:'Do not use this characters <> () [] {} / ? \ - + _ : ; , .  '})
  @ApiProperty()
  @MinLength(5)
  @MaxLength(30)
  password: string;
}
