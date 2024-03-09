import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Database } from '../../database';
import { v4, validate } from 'uuid';
import { IAlbum } from 'src/types';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumService {
  constructor(private database: DatabaseService) {}

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
    this.database.add('album', album);
    return album;
  }

  findAll() {
    return this.database.getAll('albums');
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = this.database.getOne('album', id) as IAlbum;
    if (!album) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return {
      ...album,
    };
  }

  update(id: string, { name, year, artistId }: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = this.database.getOne('album', id) as IAlbum;
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    if (
      typeof name !== 'string' ||
      typeof year !== 'number' ||
      !(typeof artistId === 'string' || typeof artistId === null)
    ) {
      throw new HttpException('Uncorrect DTO', HttpStatus.BAD_REQUEST);
    }
    album.name = name;
    album.year = year;
    album.artistId = artistId;

    return album;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = this.database.getOne('album', id) as IAlbum;
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    this.database.delete('album', id);
    throw new HttpException('Album deleted', HttpStatus.NO_CONTENT);
  }
}
