import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty({ message: 'The album should have a name' })
  @ApiProperty()
  name: string;
  @IsNumber()
  @IsNotEmpty({ message: 'The album should have a year' })
  @ApiProperty()
  year: number;
  @Transform(({ value }) => {
    if (value === null || typeof value === 'string') {
      return value;
    }
    return false;
  })
  @ApiProperty()
  artistId: string | null;
}
