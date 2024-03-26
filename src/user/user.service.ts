import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaExclude } from 'src/utils/exclude';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ login, password }: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        login,
        password,
        version: 1,
      },
      select: prismaExclude('User', ['password']),
    });
    const createdUser = new User(user);
    return createdUser;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: prismaExclude('User', ['password']),
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: prismaExclude('User', ['password']),
    });
    if (!user) return;
    return user;
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
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
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
        version: user.version + 1,
      },
      select: prismaExclude('User', ['password']),
    });
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch {
      return null;
    }
  }
}
