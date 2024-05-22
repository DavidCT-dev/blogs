import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateItemDto } from 'src/items/dto/create-item.dto';

@ApiBearerAuth() 
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post(':userId/posts')
async createPost(@Param('userId') userId: string, @Body() createPostDto: CreateItemDto) {
  return this.usersService.createPost(userId, createPostDto);
}

@Get(':userId/posts')
async findPosts(@Param('userId') userId: string) {
  return this.usersService.findPosts(userId);
}

@Get(':userId/posts/:postId')
async findPost(@Param('userId') userId: string, @Param('postId') postId: string) {
  return this.usersService.findPost(userId, postId);
}



}
