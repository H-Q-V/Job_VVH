import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { Job, JobSchema } from 'src/schema/job.schema';
import { Coin, CoinSchema } from 'src/schema/coin.schema';
import { PassportModule } from '@nestjs/passport';
import { CloudinaryModule } from '../../../common/services/cloudinary.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    MongooseModule.forFeature([
      {
        name: Coin.name,
        schema: CoinSchema,
      },
    ]),
    CloudinaryModule,
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
