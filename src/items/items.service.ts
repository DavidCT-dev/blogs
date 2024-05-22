import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Items } from './schema/item.schema';
import { Model } from 'mongoose';
import { uploadImage } from 'src/libs/cloudinary';
import { deleteImage } from 'src/libs/cloudinary';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Items.name) private readonly itemModel: Model<CreateItemDto>) { }


  async create(createItemDto: CreateItemDto, files: any) {
    let fileAddress;
    try {
      if (files && files !== undefined ) {
        const res = await uploadImage(files.file[0].path);
        fileAddress = {
          public_id: res.public_id,
          url: res.secure_url
        }; 

        const newItemDto = {...createItemDto, file:fileAddress};
        return await this.itemModel.create(newItemDto);
      
      } 
    } catch (error) {
      console.error(error);
    }
    return await this.itemModel.create(createItemDto);
  }

  async findAll() {
    return await this.itemModel.find();
  }

  async findOne(id: string) {
    if(id.length  !== 24 ){
      throw new UnauthorizedException("id must be 24 characters with no spaces")    
    }
    const user = await this.itemModel.findById(id);
    if(!user){
      throw new HttpException('ITEM_NOT_FOUND', 404);
    }
    return user;
  }

  async update(id: string, updateItemDto: UpdateItemDto,files: any) {

    let fileAddress;
    
      if (files) {
        const res = await uploadImage(files.file[0].path);
        fileAddress = {
          public_id: res.public_id,
          url: res.secure_url
        }; 

        const newItemDto = {...updateItemDto, file:fileAddress};
        return await this.itemModel.findByIdAndUpdate(id,newItemDto, { new: true });
      
      } 

    
    return await this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true });
  }

  async remove(id: string,) {
    const item = await this.itemModel.findById(id);
    if (!item) {
      throw new Error(`Item with ID ${id} not found`);
    }
    if (item.file && item.file.public_id) {
      await deleteImage(item.file.public_id);
    }
    return await this.itemModel.findByIdAndDelete(id);
  }
}
