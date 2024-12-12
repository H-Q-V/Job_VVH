import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApplyService } from '../apply/apply.service';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatorGuard } from 'src/auth/creator.guard';
import { Code } from 'mongodb';
import { CommentDto, UpdateDto } from './comment.dto';
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/create')
  @UseGuards(AuthGuard(), CreatorGuard)
  async createComment(@Body() commentDto: CommentDto, @Request() req: any) {
    const data = await this.commentService.create(commentDto, req.creator);
    return {
      success: true,
      code: 200,
      data,
    };
  }

  @Put('/update/:id')
  @UseGuards(AuthGuard(), CreatorGuard)
  async updateComment(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    const data = await this.commentService.update(id, updateDto);
    return {
      success: true,
      code: 200,
      message: 'Update comment successfully',
      data,
    };
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard(), CreatorGuard)
  async deleteComment(@Param('id') id: string) {
    await this.commentService.delete(id);
    return {
      success: true,
      code: 200,
      message: 'Delete comment successfuly',
    };
  }

  @Get('/getAll')
  async getAll() {
    const data = await this.commentService.getAll();
    return {
      success: true,
      code: 200,
      data: data,
    };
  }
}
