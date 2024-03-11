import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4, validate } from 'uuid';
import { IArtist } from 'src/types';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(private database: DatabaseService) {}

  create({ name, grammy }: CreateArtistDto) {
    if (!name || typeof grammy !== 'boolean') {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
    const artist: IArtist = {
      id: v4(),
      name,
      grammy,
    };
    this.database.add('artist', artist);
    return artist;
  }

  findAll() {
    return this.database.getAll('artists');
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.database.getOne('artist', id) as IArtist;
    if (!artist) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, { name, grammy }: UpdateArtistDto) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    if (
      !(
        name &&
        grammy !== undefined &&
        typeof name === 'string' &&
        typeof grammy === 'boolean'
      )
    ) {
      throw new HttpException('Uncorrect DTO', HttpStatus.BAD_REQUEST);
    }
    const artist = this.database.getOne('artist', id) as IArtist;
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    artist.name = name;
    artist.grammy = grammy;

    return artist;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.database.getOne('artist', id) as IArtist;
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    this.database.delete('artist', id);
    throw new HttpException('Artist deleted', HttpStatus.NO_CONTENT);
  }
}
