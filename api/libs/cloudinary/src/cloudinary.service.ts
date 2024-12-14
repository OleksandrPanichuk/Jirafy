import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { File as UploadedFile } from '@prisma/client';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
      api_key: config.get('CLOUDINARY_API_KEY'),
      api_secret: config.get('CLOUDINARY_API_SECRET'),
    });
  }

  public async upload(file: Express.Multer.File): Promise<UploadedFile> {
    try {
      const uploadedFile: UploadApiResponse = await new Promise(
        (resolve, reject) =>
          cloudinary.uploader
            .upload_stream(
              {
                folder: this.config.get('CLOUDINARY_FOLDER'),
              },
              (err, res) => {
                if (res) {
                  resolve(res);
                } else {
                  reject(err);
                }
              },
            )
            .end(file.buffer),
      );
      return { key: uploadedFile.public_id, url: uploadedFile.secure_url };
    } catch (err) {
      throw new InternalServerErrorException('Failed to upload file');
    }
  }

  public async delete(key: string) {
    await cloudinary.uploader.destroy(`${this.config.get('CLOUDINARY_FOLDER')}/${key}`);
  }
}
