import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Database } from '../../database';
import { validate } from 'uuid';
import { ITrack } from 'src/types';

@Injectable()
export class TrackService {
  constructor(@Inject('Database') private trackDatabase: Database) {}

  create(createTrackDto: CreateTrackDto) {
    return 'This action adds a new track';
  }

  findAll() {
    return this.trackDatabase.getAll('tracks');
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = this.trackDatabase.getOne('track', id) as ITrack;
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return {
      ...track,
    };
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
