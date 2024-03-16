import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
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
  @HttpCode(201)
  addFavTrack(
    @Param('trackId', new ParseUUIDPipe({ version: '4' })) trackId: string,
  ) {
    return this.favsService.create('track', trackId);
  }

  @Post('/artist/:artistId')
  @HttpCode(201)
  addFavArtist(
    @Param('artistId', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ) {
    return this.favsService.create('artist', artistId);
  }

  @Post('/album/:albumId')
  @HttpCode(201)
  addFavAlbum(
    @Param('albumId', new ParseUUIDPipe({ version: '4' })) albumId: string,
  ) {
    return this.favsService.create('album', albumId);
  }

  @Delete('/track/:trackId')
  @HttpCode(204)
  removeFavTrack(
    @Param('trackId', new ParseUUIDPipe({ version: '4' })) trackId: string,
  ) {
    return this.favsService.remove('track', trackId);
  }

  @Delete('/artist/:artistId')
  @HttpCode(204)
  removeFavArtist(
    @Param('artistId', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ) {
    return this.favsService.remove('artist', artistId);
  }
  @Delete('/album/:albumId')
  @HttpCode(204)
  removeFavAlbum(
    @Param('albumId', new ParseUUIDPipe({ version: '4' })) albumId: string,
  ) {
    return this.favsService.remove('album', albumId);
  }
}
