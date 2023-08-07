import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { MediaType } from '../constants/enum'

export class MediaDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  mimeType: string

  @IsNotEmpty()
  @IsEnum(MediaType)
  type: MediaType
}
