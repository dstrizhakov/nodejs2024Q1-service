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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create user using CreateUserDto',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('User')
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'DTO is uncorrect',
  })
  create(@Body() createUserDto: CreateUserDto) {
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
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns found user by id',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('User')
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found by this ID',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
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
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
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
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
