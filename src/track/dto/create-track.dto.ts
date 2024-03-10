import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty({ message: 'The track should have a name' })
  @ApiProperty()
  name: string;
  @ApiProperty()
  artistId: string | null;
  @ApiProperty()
  albumId: string | null;
  @IsNumber()
  @IsNotEmpty({ message: 'The track should have a duration' })
  @ApiProperty()
  duration: number;
}
