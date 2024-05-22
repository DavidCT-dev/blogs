import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Rol } from './schema/rol.schema';
import { Model } from 'mongoose';

@Injectable()
export class RolService {

  constructor(@InjectModel(Rol.name) private readonly rolModel: Model<CreateRolDto>) { }

  async setRoles() {
    const count = await this.rolModel.estimatedDocumentCount();
    if (count > 0) return;
  
    const values = await Promise.all([
      this.rolModel.create({ name: 'user' }),
      this.rolModel.create({ name: 'moderator' }),
      this.rolModel.create({ name: 'administrator' }),
    ]);
  
    return values;
  }
}
