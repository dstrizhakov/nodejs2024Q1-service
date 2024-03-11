import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiTags, ApiResponse, getSchemaPath } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns tracks, artists, albums arrays',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('Favorites'),
        },
      },
    },
  })
  findAll() {
    return this.favsService.findAll();
  }
  @Post('/track/:trackId')
  creatFavTrack(@Param('trackId') trackId: string) {
    return this.favsService.create('track', trackId);
  }
  @Post('/artist/:artistId')
  creatFavArtist(@Param('artistId') artistId: string) {
    return this.favsService.create('artist', artistId);
  }
  @Post('/album/:albumId')
  creatFavAlbum(@Param('albumId') albumId: string) {
    return this.favsService.create('album', albumId);
  }

  @Delete('/track/:trackId')
  @HttpCode(204)
  removeFavTrack(@Param('trackId') trackId: string) {
    return this.favsService.remove('track', trackId);
  }
  @Delete('/artist/:artistId')
  @HttpCode(204)
  removeFavArtist(@Param('artistId') artistId: string) {
    return this.favsService.remove('artist', artistId);
  }
  @Delete('/album/:albumId')
  @HttpCode(204)
  removeFavAlbum(@Param('albumId') albumId: string) {
    return this.favsService.remove('album', albumId);
  }
}
