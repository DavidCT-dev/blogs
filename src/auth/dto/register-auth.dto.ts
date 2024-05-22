import { ApiProperty, PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { Matches, MaxLength, MinLength } from 'class-validator';
import { Prop } from '@nestjs/mongoose';


export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  
  @Matches(/^[a-zA-Z0-9\s]+$/, {message:'the name field can only contain letters and numbers'})
  @MinLength(1,{message:'the name field can only contain at least 1 letters'})
  @MaxLength(16,{message:'the name field can only contain a maximum of 16 letters'})
  @ApiProperty()
  name:string;

  rol: string[];
}
