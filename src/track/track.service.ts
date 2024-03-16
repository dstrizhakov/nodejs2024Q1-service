import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4, validate } from 'uuid';
import { ITrack } from 'src/types';
import { DatabaseService } from 'src/database/database.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(
    private database: DatabaseService,
    private prisma: PrismaService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    // if (!validate(id)) {
    //   throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    // }
    // const track = await this.prisma.track.findUnique({ where: { id } });
    // if (!track) {
    //   throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    // }
    // if (typeof name !== 'string' || typeof duration !== 'number') {
    //   throw new HttpException('Uncorrect DTO', HttpStatus.BAD_REQUEST);
    // }
    // track.name = name;
    // track.duration = duration;
    // track.albumId = albumId ?? null;
    // track.artistId = artistId ?? null;
    // return track;
    try {
      return await this.prisma.track.update({
        where: {
          id,
        },
        data: updateTrackDto,
      });
    } catch {
      return;
    }
  }

  async remove(id: string) {
    // if (!validate(id)) {
    //   throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    // }
    // const track = this.database.getOne('track', id) as ITrack;
    // if (!track) {
    //   throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    // }
    // this.database.delete('track', id);
    // throw new HttpException('Track deleted', HttpStatus.NO_CONTENT);
    try {
      return await this.prisma.track.delete({
        where: {
          id,
        },
      });
    } catch {
      return;
    }
  }
}
