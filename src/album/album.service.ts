import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Database } from '../../database';
import { validate } from 'uuid';
import { IAlbum } from 'src/types';

@Injectable()
export class AlbumService {
  constructor(@Inject('Database') private albumDatabase: Database) {}

  create(createAlbumDto: CreateAlbumDto) {
    return 'This action adds a new album';
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

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
