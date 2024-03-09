import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Database } from '../../database';
import { v4, validate } from 'uuid';
import { IAlbum } from 'src/types';

@Injectable()
export class AlbumService {
  constructor(@Inject('Database') private albumDatabase: Database) {}

  create({ name, year, artistId }: CreateAlbumDto) {
    if (!name || typeof year !== 'number') {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
    const album: IAlbum = {
      id: v4(),
      name,
      year,
      artistId: artistId || null,
    };
    this.albumDatabase.add('album', album);
    return album;
  }

  findAll() {
    return this.albumDatabase.getAll('albums');
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = this.albumDatabase.getOne('album', id) as IAlbum;
    if (!album) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return {
      ...album,
    };
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = this.albumDatabase.getOne('album', id) as IAlbum;
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    album.name = updateAlbumDto?.name || album.name;
    album.year = updateAlbumDto?.year || album.year;
    album.artistId = updateAlbumDto?.artistId || null;

    return album;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = this.albumDatabase.getOne('album', id) as IAlbum;
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    this.albumDatabase.delete('album', id);
    throw new HttpException('Album deleted', HttpStatus.NO_CONTENT);
  }
}
