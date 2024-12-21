import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UploadedFile {
  @IsUrl()
  readonly url: string;

  @IsOptional()
  @IsString()
  readonly key?: string;
}
