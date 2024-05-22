
import { Prop } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString , IsUrl, IsOptional} from "class-validator";

export class CreateItemDto {
  @ApiProperty()
  readonly name:string;

  @ApiProperty()
  readonly price:number;

  @ApiProperty()
  readonly description:string;
  
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly file: {
    public_id: string;
    url: string;
  };
}
