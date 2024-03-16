import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.prisma.album.create({ data: createAlbumDto });
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.album.findUnique({ where: { id } });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      return this.prisma.album.update({ where: { id }, data: updateAlbumDto });
    } catch {
      return;
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.album.delete({ where: { id } });
    } catch {
      return;
    }
  }
}
