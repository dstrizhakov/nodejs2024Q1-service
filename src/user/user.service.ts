import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DatabaseService } from 'src/database/database.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaExclude } from 'src/utils/exclude';

@Injectable()
export class UserService {
  constructor(
    private database: DatabaseService,
    private prisma: PrismaService,
  ) {}

  async create({ login, password }: CreateUserDto) {
    if (!login || !password) {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prisma.user.create({
      data: {
        login,
        password,
        version: 1,
      },
      select: prismaExclude('User', ['password']),
    });
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: prismaExclude('User', ['password']),
    });
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: prismaExclude('User', ['password']),
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.password !== oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    const updated = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
        version: user.version + 1,
      },
      select: prismaExclude('User', ['password']),
    });
    return updated;
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.prisma.user.delete({ where: { id } });
    throw new HttpException('User deleted', HttpStatus.NO_CONTENT);
  }
}
