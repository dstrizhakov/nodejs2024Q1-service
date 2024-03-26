import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiTags, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  @Get()
  @HttpCode(200)
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
  async findAll() {
    return await this.favsService.findAll();
  }

  @Post('/track/:trackId')
  @HttpCode(201)
  async addFavTrack(
    @Param('trackId', new ParseUUIDPipe({ version: '4' })) trackId: string,
  ) {
    const track = await this.trackService.findOne(trackId);
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favsService.create('track', trackId);
  }

  @Post('/artist/:artistId')
  @HttpCode(201)
  async addFavArtist(
    @Param('artistId', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ) {
    const artist = await this.artistService.findOne(artistId);
    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favsService.create('artist', artistId);
  }

  @Post('/album/:albumId')
  @HttpCode(201)
  async addFavAlbum(
    @Param('albumId', new ParseUUIDPipe({ version: '4' })) albumId: string,
  ) {
    const album = await this.albumService.findOne(albumId);
    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favsService.create('album', albumId);
  }

  @Delete('/track/:trackId')
  @HttpCode(204)
  async removeFavTrack(
    @Param('trackId', new ParseUUIDPipe({ version: '4' })) trackId: string,
  ) {
    const isRemoved = this.favsService.remove('track', trackId);
    if (!isRemoved) {
      throw new HttpException('Track not fount', HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/artist/:artistId')
  @HttpCode(204)
  async removeFavArtist(
    @Param('artistId', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ) {
    const isRemoved = await this.favsService.remove('artist', artistId);
    if (!isRemoved) {
      throw new HttpException('Artist not fount', HttpStatus.NOT_FOUND);
    }
  }
  @Delete('/album/:albumId')
  @HttpCode(204)
  async removeFavAlbum(
    @Param('albumId', new ParseUUIDPipe({ version: '4' })) albumId: string,
  ) {
    const isRemoved = await this.favsService.remove('album', albumId);
    if (!isRemoved) {
      throw new HttpException('Album not fount', HttpStatus.NOT_FOUND);
    }
  }
}
