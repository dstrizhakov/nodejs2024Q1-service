import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from 'src/types';
import { v4, validate } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Database } from '../../database';

@Injectable()
export class UserService {
  
  constructor(@Inject('Database') private userDatabase: Database) {}

  findAll() {
    const users = this.userDatabase.getAll('users') as IUser[];
    return users.map(({ password, ...user }) => user);
  }

  create({ login, password }: CreateUserDto) {
    if (!login || !password) {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
    const user: IUser = {
      id: v4(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.userDatabase.addUser(user);
    return {
      ...user,
      password: undefined,
    };
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = this.userDatabase.getUser(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      ...user,
      password: undefined,
    };
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = this.userDatabase.getUser(id);
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
      ...user,
      password: undefined,
    };
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = this.userDatabase.getUser(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.userDatabase.deleteUser(id);
    throw new HttpException('User deleted', HttpStatus.NO_CONTENT);
  }
}
