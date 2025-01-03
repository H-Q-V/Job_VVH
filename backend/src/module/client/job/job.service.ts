import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from 'src/schema/job.schema';
import { JobDto } from './job.dto';
import { Coin } from 'src/schema/coin.schema';
@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(Coin.name) private coinModel: Model<Coin>,
  ) {}
  async createJobAdmin(jobDto: JobDto ): Promise<Job> {
    console.log("aaaaa",JobDto )
    const data = await this.jobModel.create(jobDto);
    if (!data) {
      throw new NotFoundException('Failed to create job');
    }
    return data;
  }
  async create(jobDto: JobDto, user: any): Promise<Job> {
    const userId = await this.coinModel.findOne({ User: user.id });
    if (!userId || Number(userId.coins) < 2000) {
      throw new NotFoundException('Bạn cần nạp tiền để đăng bài');
    }

    const data = await this.jobModel.create(jobDto);
    if (!data) {
      throw new NotFoundException('Failed to create job');
    }
    await this.coinModel.updateOne(
      { User: userId.User },
      { coins: (Number(userId.coins) - 2000).toString() },
    );

    return data;
  }

  async update(id: string, jobDto: JobDto): Promise<any> {
    const update = await this.jobModel.updateOne(
      {
        _id: id,
      },
      jobDto,
    );
    if (update.modifiedCount === 0) {
      throw new NotFoundException('Job not found');
    }
    return update;
  }

  async delete(id: string): Promise<boolean> {
    if (!id) {
        throw new NotFoundException('Job ID is required');
    }

    const data = await this.jobModel.findOne({ _id: id });
    if (!data) {
        throw new NotFoundException('Job not found');
    }
    await this.jobModel.deleteOne({ _id: id });
    return true;
}

  async getJobs(): Promise<Job[]> {
    const data = await this.jobModel.find().exec();
    return data;
  }

  async getJobById(id: string): Promise<Job> {
    const job = await this.jobModel.findById(id).exec();
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async getAllProgrammingLanguages(): Promise<Job[]> {
    const languages = await this.jobModel.distinct('programmingLanguages');
    return languages;
  }

  async searchJobs({
    keyword,
    language,
    location,
  }: {
    keyword: string;
    language: string;
    location: string;
  }) {
    const filter: any = {};

    if (language) {
      filter.programmingLanguages = language;
    }

    if (location) {
      filter.location = location;
    }

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { company: { $regex: keyword, $options: 'i' } },
        { jobDescription: { $regex: keyword, $options: 'i' } },
      ];
    }

    return this.jobModel.find(filter).exec();
  }
  async getUrgentJobs(): Promise<Job[]> {
    return this.jobModel.find({ isUrgent: true }).exec();
  }
  async getLocationsWithCount(): Promise<any[]> {
    try {
      const locations = await this.jobModel.aggregate([
        {
          $group: {
            _id: '$location',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            location: '$_id',
            count: 1,
            _id: 0,
          },
        },
        {
          $sort: { count: -1 },
        },
      ]);
      return locations;
    } catch (error) {
      console.error('Error in getLocationsWithCount:', error);
      throw error;
    }
  }
}
