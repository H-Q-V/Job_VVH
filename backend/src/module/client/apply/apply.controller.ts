import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatorGuard } from 'src/auth/creator.guard';
import { ApplyService } from './apply.service';
import { ApplAdminDto, ApplyDto, UpdateApplyDto } from './apply.dto';
import { Code } from 'mongodb';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('apply')
export class ApplyController {
  constructor(private applyService: ApplyService) {}

  @Post('/create')
  @UseGuards(AuthGuard(), CreatorGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async createApply(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() applyDto: ApplyDto,
    @Request() req: any,
  ) {
    console.log('a', applyDto);
    const data = await this.applyService.create(applyDto, req.creator);
    return {
      success: true,
      code: 200,
      message: 'Create apply successfully',
      data,
    };
  }

  @Post('/createAdmin')
  async createApplyAdmin(@Body() applyDto: ApplAdminDto) {
    const adminApplyDto = {
      ...applyDto,
      userid: 'admin',
    };
    const data = await this.applyService.createAdmin(adminApplyDto);
    return {
      success: true,
      code: 200,
      message: 'Create apply successfully',
      data: data,
    };
  }

  @Put('/update/:id')
  async updateApply(
    @Param('id') id: string,
    @Body() updateDto: UpdateApplyDto,
  ) {
    const data = await this.applyService.update(id, updateDto);
    return {
      success: true,
      Code: 200,
      message: 'Update apply successfuly',
      data,
    };
  }

  @Delete('delete/:id')
  async deleteApply(@Param('id') id: string) {
    await this.applyService.delete(id);
    return {
      success: true,
      Code: 200,
      message: 'Delete apply successfuly',
    };
  }

  @Get('/getAll')
  async getApply() {
    const data = await this.applyService.getApply();
    return {
      success: true,
      code: 200,
      data: data,
    };
  }
}
