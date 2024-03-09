import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Database } from '../../database';
import { v4, validate } from 'uuid';
import { IArtist } from 'src/types';

@Injectable()
export class ArtistService {
  constructor(@Inject('Database') private artistDatabase: Database) {}

  create({ name, grammy }: CreateArtistDto) {
    if (!name || typeof grammy !== 'boolean') {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
    const artist: IArtist = {
      id: v4(),
      name,
      grammy,
    };
    this.artistDatabase.add('artist', artist);
    return artist;
  }

  findAll() {
    return this.artistDatabase.getAll('artists');
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistDatabase.getOne('artist', id) as IArtist;
    if (!artist) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistDatabase.getOne('album', id) as IArtist;
    if (!artist) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    artist.name = updateArtistDto?.name || artist.name;
    artist.grammy = updateArtistDto?.grammy || artist.grammy;

    return artist;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistDatabase.getOne('artist', id) as IArtist;
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    this.artistDatabase.delete('artist', id);
    throw new HttpException('Artist deleted', HttpStatus.NO_CONTENT);
  }
}
