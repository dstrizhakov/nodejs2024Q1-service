import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty({message: 'The album should have a name'})
  name: string;
  @IsNumber()
  @IsNotEmpty({message: 'The album should have a year'})
  year: number;
  @Transform(({ value }) => {
    if (value === null || typeof value === 'string') {
      return value;
    }
    return false;
  })
  artistId: string | null;
}
