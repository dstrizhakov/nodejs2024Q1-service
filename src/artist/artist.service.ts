import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Database } from '../../database';
import { validate } from 'uuid';
import { IArtist } from 'src/types';

@Injectable()
export class ArtistService {
  constructor(@Inject('Database') private artistDatabase: Database) {}

  create(createArtistDto: CreateArtistDto) {
    return 'This action adds a new artist';
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
    return {
      ...artist,
    };
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
