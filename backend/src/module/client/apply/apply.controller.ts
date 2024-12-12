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
import { ApplyDto, UpdateApplyDto } from './apply.dto';
import { Code } from 'mongodb';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
// import { UploadService } from '../../../common/services/upload/upload.service';

@Controller('apply')
export class ApplyController {
  constructor(
    private applyService: ApplyService,
    // private readonly uploadService: UploadService,
  ) {}

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

  // @Post('upload')
  // @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(FilesInterceptor('file'))
  // async uploadFile(@UploadedFiles() file: Express.Multer.File) {
  //   try {
  //     const result = await this.cloudinaryService.uploadFile(file);
  //     return { url: result.secure_url, name: file.originalname };
  //   } catch (error) {
  //     throw new Error('Upload failed');
  //   }
  // }

  // Upload file endpoint
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   try {
  //     const fileName = await this.uploadService.saveFile(file);
  //     return {
  //       success: true,
  //       filename: fileName,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: 'Upload failed',
  //     };
  //   }
  // }

  // // Download file endpoint
  // @Get('file/:filename')
  // async downloadFile(
  //   @Param('filename') filename: string,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const filePath = this.uploadService.getFilePath(filename);
  //     return res.download(filePath);
  //   } catch (error) {
  //     return res.status(404).json({
  //       success: false,
  //       message: 'File not found',
  //     });
  //   }
  // }

  // // View file endpoint
  // @Get('view/:filename')
  // async viewFile(@Param('filename') filename: string, @Res() res: Response) {
  //   try {
  //     const filePath = this.uploadService.getFilePath(filename);
  //     return res.sendFile(filePath, { root: '.' });
  //   } catch (error) {
  //     return res.status(404).json({
  //       success: false,
  //       message: 'File not found',
  //     });
  //   }
  // }

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
