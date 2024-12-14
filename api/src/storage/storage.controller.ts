import { AuthenticatedGuard } from '@/shared/guards';
import { CloudinaryService } from '@app/cloudinary';
import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';

@UseGuards(AuthenticatedGuard)
@Controller('storage')
export class StorageController {
  constructor(
    private readonly cloudinary: CloudinaryService,
    private readonly storageService: StorageService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /\/(jpg|jpeg|png|webp)$/,
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return this.cloudinary.upload(file);
  }

  @Delete('delete/:key')
  async delete(@Param('key') key: string) {
    await this.storageService.checkIfFileIsUsed(key);
    return await this.cloudinary.delete(key);
  }
}
