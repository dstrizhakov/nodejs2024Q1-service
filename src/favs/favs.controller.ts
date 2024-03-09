import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
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
  removeFavTrack(@Param('trackId') trackId: string) {
    return this.favsService.remove('track', trackId);
  }
  @Delete('/artist/:artistId')
  removeFavArtist(@Param('artistId') artistId: string) {
    return this.favsService.remove('artist', artistId);
  }
  @Delete('/album/:albumId')
  removeFavAlbum(@Param('albumId') albumId: string) {
    return this.favsService.remove('album', albumId);
  }
}
