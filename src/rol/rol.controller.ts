import { Controller, Post } from '@nestjs/common';
import { RolService } from './rol.service';


@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}


}
