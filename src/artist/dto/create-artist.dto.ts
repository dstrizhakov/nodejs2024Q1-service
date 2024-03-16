import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'The artist should have a name' })
  name: string;
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: 'The artist should have a grammy status' })
  grammy: boolean;
}
