import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4, validate } from 'uuid';
import { ITrack } from 'src/types';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TrackService {
  constructor(private database: DatabaseService) {}

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
    this.database.add('track', track);
    return {
      ...track,
    };
  }

  findAll() {
    return this.database.getAll('tracks');
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = this.database.getOne('track', id) as ITrack;
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return {
      ...track,
    };
  }

  update(id: string, { name, artistId, albumId, duration }: UpdateTrackDto) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = this.database.getOne('track', id) as ITrack;
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    if (typeof name !== 'string' || typeof duration !== 'number') {
      throw new HttpException('Uncorrect DTO', HttpStatus.BAD_REQUEST);
    }
    track.name = name;
    track.duration = duration;
    track.albumId = albumId ?? null;
    track.artistId = artistId ?? null;
    return track;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = this.database.getOne('track', id) as ITrack;
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    this.database.delete('track', id);
    throw new HttpException('Track deleted', HttpStatus.NO_CONTENT);
  }
}
