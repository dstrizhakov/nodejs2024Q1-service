import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 200,
    description: 'Create user using CreateUserDto',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('User'),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'DTO is uncorrect',
  })
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all users',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath('User') },
        },
      },
    },
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns found user by id',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('User'),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found by this ID',
  })
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The User password has been updated',
  })
  @ApiResponse({
    status: 403,
    description: 'oldPassword is uncorrect',
  })
  @ApiResponse({
    status: 400,
    description: 'userId is invalid (not uuid)',
  })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'The User has been deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found by this ID',
  })
  @ApiResponse({
    status: 400,
    description: 'userId is invalid (not uuid)',
  })
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.remove(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
