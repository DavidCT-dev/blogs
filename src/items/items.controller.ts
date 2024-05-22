import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFiles, Res, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@ApiTags('items')
@UseGuards(AuthGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{
    name:'file'
  }],{
    storage:diskStorage({
      destination:'./uploads',
    })
  }))

//   @ApiOperation({ summary: 'HTML to PDF' })
// @ApiResponse({ status: 200, description: 'convert the HTML to PDF' })
// @ApiResponse({ status: 400, description: 'Error al convertir archivo' })
// @ApiConsumes('multipart/form-data')
// @ApiBody({
//   schema: {
//     type: 'object',
//     properties: {
//       file: {
//         type: 'string',
//         format: 'binary',
//       },
//     },
//   },
// })
// @Post('base64pdf')

  async createFormdata(@UploadedFiles() files: {file:Express.Multer.File} , @Body() createItemDto: CreateItemDto) {
    const res = await this.itemsService.create(createItemDto,files);
    return res; 
  }

  @Get()
  async findAll() {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.itemsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{
    name:'file'
  }],{
    storage:diskStorage({
      destination:'./uploads',
    })
  }))
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto,@UploadedFiles() files: {file:Express.Multer.File}) {
    
    const res = await this.itemsService.update(id, updateItemDto, files);
    return res;
  }

 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
