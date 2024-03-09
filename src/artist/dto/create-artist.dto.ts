import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty({ message: 'The artist should have a name' })
  name: string;
  @IsBoolean()
  @IsNotEmpty({ message: 'The artist should have a grammy status' })
  grammy: boolean;
}
