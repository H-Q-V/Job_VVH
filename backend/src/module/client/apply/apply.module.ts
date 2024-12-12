import { Module } from '@nestjs/common';
import { ApplyController } from './apply.controller';
import { ApplyService } from './apply.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Apply, ApplySchema } from 'src/schema/apply.schema';
// import { MulterModule } from '@nestjs/platform-express';
// import { UploadService } from '../../../common/services/upload/upload.service';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Apply.name, schema: ApplySchema }]),
  ],
  controllers: [ApplyController],
  // providers: [ApplyService, UploadService],
  providers: [ApplyService],
})
export class ApplyModule {}
