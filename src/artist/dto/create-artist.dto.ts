import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty({ message: 'The artist should have a name' })
  @ApiProperty()
  name: string;
  @IsBoolean()
  @IsNotEmpty({ message: 'The artist should have a grammy status' })
  @ApiProperty()
  grammy: boolean;
}
