import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDto, UpdateDto } from './comment.dto';
import { Comment } from 'src/schema/comment.schema';
import { User } from 'src/schema/user.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(commentDto: CommentDto, user: any): Promise<Comment> {
    commentDto.userid = user.id;
    const name = await this.userModel.findOne({ _id: user.id });
    commentDto.name = name.name;
    const data = await this.commentModel.create(commentDto);
    if (!data) {
      throw new NotFoundException('Failed to create comment');
    }
    return data;
  }

  async update(id: string, updateDto: UpdateDto, user: any): Promise<Comment> {
    const comment = await this.commentModel.findOne({
      _id: id,
      userid: user.id,
    });

    if (!comment) {
      throw new NotFoundException('Không tìm thấy');
    }
    const updatedComment = await this.commentModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true },
    );
    return updatedComment;
  }

  async delete(id: string, user: any) {
    const data = await this.commentModel.findOne({ _id: id, userid: user.id });
    if (!data) {
      throw new NotFoundException('comment not found');
    }
    await this.commentModel.deleteOne({
      _id: id,
      userid: user.id,
    });
    return true;
  }

  async getAll() {
    const data = await this.commentModel
      .find()
      .collation({ locale: 'en' })
      .sort({ create_at: -1 })
      .exec();
    return data;
  }
}
