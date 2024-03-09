import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { Database } from '../../database';
import { validate } from 'uuid';

@Injectable()
export class FavsService {
  constructor(@Inject('Database') private favsDatabase: Database) {}

  create(target: 'track' | 'artist' | 'album', id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    switch (target) {
      case 'track':
        const track = this.favsDatabase.getOne('track', id);
        if (!track) {
          throw new HttpException(
            'Track not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        this.favsDatabase.addFav('track', id);
        break;
      case 'artist':
        const artist = this.favsDatabase.getOne('artist', id);
        if (!artist) {
          throw new HttpException(
            'Artist not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        this.favsDatabase.addFav('artist', id);
        break;
      case 'album':
        const album = this.favsDatabase.getOne('album', id);
        if (!album) {
          throw new HttpException(
            'Album not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        this.favsDatabase.addFav('album', id);
        break;
    }
  }

  findAll() {
    return this.favsDatabase.getAll('favs');
  }

  remove(target: 'track' | 'artist' | 'album', id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    switch (target) {
      case 'track':
        const track = this.favsDatabase.getOne('track', id);
        if (!track) {
          throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
        }
        this.favsDatabase.removeFav('track', id);
        break;
      case 'artist':
        const artist = this.favsDatabase.getOne('artist', id);
        if (!artist) {
          throw new HttpException(
            'Artist not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        this.favsDatabase.removeFav('artist', id);
        break;
      case 'album':
        const album = this.favsDatabase.getOne('album', id);
        if (!album) {
          throw new HttpException(
            'Album not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        this.favsDatabase.removeFav('album', id);
        break;
    }
  }
}
