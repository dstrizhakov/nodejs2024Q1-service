import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'The track should have a name' })
  name: string;
  @ApiProperty()
  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsUUID('4')
  artistId: string | null;
  @ApiProperty()
  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsUUID('4')
  albumId: string | null;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'The track should have a duration' })
  @IsPositive({ message: 'The track should be a positive number' })
  duration: number;
}
