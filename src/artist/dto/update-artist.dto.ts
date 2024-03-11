import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  grammy: boolean;
}
