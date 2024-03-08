import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/types';
import { v4, validate } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 'e8e5e1d7-c45a-44ea-922f-5ba567aab692',
      login: 'dmitry',
      password: '123',
      version: 1,
      createdAt: 1709746501901,
      updatedAt: 1709746501901,
    },
  ];

  create({ login, password }: CreateUserDto) {
    if (!login || !password) {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
    const user: User = {
      id: v4(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findAll() {
    return this.users.map((user) => ({
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.createdAt,
    }));
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      id: user.id,
      login: user.login,
      _password: user.password,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }

    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.users = this.users.filter((user) => user.id !== id);
    throw new HttpException('User deleted', HttpStatus.NO_CONTENT);
  }
}
