import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  year: number;
  @ApiProperty()
  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsUUID('4')
  artistId: string | null;
}
