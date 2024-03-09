import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty({ message: 'The track should have a name' })
  name: string;
  artistId: string | null;
  albumId: string | null;
  @IsNumber()
  @IsNotEmpty({ message: 'The track should have a duration' })
  duration: number;
}
