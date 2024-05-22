import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateItemDto } from 'src/items/dto/create-item.dto';
import { Items } from 'src/items/schema/item.schema';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel:Model<CreateUserDto>,
  @InjectModel(Items.name) private readonly itemModel: Model<CreateItemDto>
  ){}
  
  findAll() {
    return this.userModel.find();
  }

  async createPost(userId: string, createPostDto: CreateItemDto) {
    const user = await this.userModel.findOne({ _id:userId }).populate('posts');
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const post = new this.itemModel(createPostDto);
    await post.save();
    user.posts.push(post);
    await user.save();
    return user;
  }

  async findPosts(userId: string) {
    const user = await this.userModel.findOne({_id:userId}).populate('posts');
    return user.posts
  }

  async findPost(userId: string, postId: string) {
    // console.log(userId, postId)
    const user = await this.userModel.findOne({ _id: userId }).populate('posts').exec();
    // const res = await user.posts.filter(post => post. == postId )
    console.log(user);
    return ;
  }
  
  async updatePost(userId: string, postId: string, updatePostDto: CreateItemDto) {
    return this.itemModel.findOneAndUpdate({ authorId: userId, postId }, updatePostDto, { new: true }).exec();
  }
  
  async deletePost(userId: string, postId: string) {
    const user = await this.userModel.findOne({ userId }).populate('posts').exec();
    const post = await this.itemModel.findOneAndDelete({ authorId: userId, postId }).exec();
    // user.posts.pull(post);
    await user.save();
    return post;
  }


}
