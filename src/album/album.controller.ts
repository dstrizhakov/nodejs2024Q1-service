import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ValidationPipe,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiTags, ApiResponse, getSchemaPath } from '@nestjs/swagger';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Create album using CreateAlbumDto',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('Album'),
        },
      },
    },
  })
  async create(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumService.update(id, updateAlbumDto);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = await this.albumService.remove(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
