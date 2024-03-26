import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'The album should have a name' })
  name: string;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'The album should have a year' })
  year: number;
  @ApiProperty()
  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty({ message: 'The album should have an artistId' })
  @IsUUID('4')
  artistId: string | null;
}
