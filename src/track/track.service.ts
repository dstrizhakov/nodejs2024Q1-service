import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.track.findUnique({ where: { id } });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
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
