// backend/src/common/services/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('Bắt đầu upload lên Cloudinary...');
      console.log('Chi tiết file:', {
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      });

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'job_logos',
        },
        (error, result) => {
          if (error) {
            console.error('Lỗi upload Cloudinary:', error);
            return reject(error);
          }
          console.log('Upload Cloudinary thành công:', result);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
