import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Database } from '../../database';
import { v4, validate } from 'uuid';
import { ITrack } from 'src/types';

@Injectable()
export class TrackService {
  constructor(@Inject('Database') private trackDatabase: Database) {}

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    if (!name || typeof duration !== 'number') {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
    const track: ITrack = {
      id: v4(),
      name,
      artistId: artistId || null,
      albumId: albumId || null,
      duration,
    };
    this.trackDatabase.add('track', track);
    return {
      ...track,
    };
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

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = this.trackDatabase.getOne('track', id) as ITrack;
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    track.name = updateTrackDto?.name || track.name;
    track.duration = updateTrackDto?.duration || track.duration;
    track.albumId = updateTrackDto?.albumId || null;
    track.artistId = updateTrackDto?.artistId || null;
    return track;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = this.trackDatabase.getOne('track', id) as ITrack;
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    this.trackDatabase.delete('track', id);
    throw new HttpException('Track deleted', HttpStatus.NO_CONTENT);
  }
}
