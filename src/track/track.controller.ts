import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiTags, ApiResponse, getSchemaPath } from '@nestjs/swagger';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: 200,
    description: 'Create track using CreateTrackDto',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('Track'),
        },
      },
    },
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
