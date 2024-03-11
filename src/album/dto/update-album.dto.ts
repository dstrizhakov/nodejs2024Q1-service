import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  artistId: string | null;
}
