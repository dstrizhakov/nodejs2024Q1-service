import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Database } from '../../database';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'Database',
      useClass: Database,
    },
  ],
})
export class AlbumModule {}
