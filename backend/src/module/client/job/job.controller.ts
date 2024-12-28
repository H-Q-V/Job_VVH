import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JobService } from './job.service';
import { JobDto } from './job.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreatorGuard } from 'src/auth/creator.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../../common/services/cloudinary.service';

@Controller('jobs')
export class JobController {
  constructor(
    private jobService: JobService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
 @Post('/admin/create') 
 @UseInterceptors(FileInterceptor('logo'))
 async createJobAdmin(
     @Body() jobDto: JobDto,
     @UploadedFile() file: Express.Multer.File,
 ) {
     let logoUrl;
     if (file) {
         const result = await this.cloudinaryService.uploadFile(file);
         logoUrl = result.secure_url;
     } else {
         throw new NotFoundException('Logo file is required'); 
     }
     const parsedJobDto = {
         ...jobDto,
         logo: logoUrl,
     };
    const data = await this.jobService.createJobAdmin(parsedJobDto)
    return {
      success:true,
      code:200,
      message:"Create job successfully ",
data
    } 
 }
  @Post('/create')
  @UseGuards(AuthGuard(), CreatorGuard)
  @UseInterceptors(FileInterceptor('logo'))
  async createJob(
    @Body() jobDto: JobDto,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let logoUrl;
    if (file) {
      const result = await this.cloudinaryService.uploadFile(file);
      logoUrl = result.secure_url;
      console.log('Upload result:', result); // Thêm log để debug
    }
    const parsedJobDto = {
      ...jobDto,
      benefits: typeof jobDto.benefits === 'string' ? JSON.parse(jobDto.benefits) : jobDto.benefits,
      programmingLanguages: typeof jobDto.programmingLanguages === 'string' ? JSON.parse(jobDto.programmingLanguages) : jobDto.programmingLanguages,
      logo: logoUrl,
    };
  
    const data = await this.jobService.create(parsedJobDto, req.creator);

    return {
      success: true,
      code: 200,
      message: 'Create job successfully',
      data,
    };
  }

  @Put('/update/:id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() jobDto: JobDto) {
    const data = await this.jobService.update(id, jobDto);
    return {
      success: true,
      code: 200,
      message: 'Update job successfully',
      data,
    };
  }

  @Put('/admin/update/:id')
  @UsePipes(new ValidationPipe())
  async updateAdmin(@Param('id') id: string, @Body() jobDto: JobDto) {
    const data = await this.jobService.update(id, jobDto);
    return {
      success: true,
      code: 200,
      message: 'Update job successfully',
      data,
    };
  }
  @Delete('/delete/:id')
  @UsePipes(new ValidationPipe())
  async delete(@Param('id') id: string) {
    await this.jobService.delete(id);
    return {
      success: true,
      code: 200,
      message: 'Delete job successfully',
    };
  }

  @Get('/getAll')
  async getJobs() {
    const jobs = await this.jobService.getJobs();
    return {
      success: true,
      code: 200,
      data: jobs,
    };
  }
  @Get('/languages')
  async getProgrammingLanguages() {
    const languages = await this.jobService.getAllProgrammingLanguages();
    return {
      success: true,
      code: 200,
      data: languages,
    };
  }

  @Get('/search')
  async searchJobs(
    @Query('keyword') keyword: string,
    @Query('language') language: string,
    @Query('location') location: string,
    // @Query('isUrgent') isUrgent: boolean = true,
  ) {
    const jobs = await this.jobService.searchJobs({
      keyword,
      language,
      location,
    });
    return {
      success: true,
      code: 200,
      data: jobs,
    };
  }
  @Get('/urgent')
  async getUrgentJobs() {
    const jobs = await this.jobService.getUrgentJobs();
    return {
      success: true,
      code: 200,
      data: jobs,
    };
  }
  @Get('/locations')
  async getLocationsWithCount() {
    const locations = await this.jobService.getLocationsWithCount();
    return {
      success: true,
      code: 200,
      data: locations,
    };
  }

  @Get(':id')
  async getJobById(@Param('id') id: string) {
    const job = await this.jobService.getJobById(id);
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return {
      success: true,
      code: 200,
      data: job,
    };
  }
}
