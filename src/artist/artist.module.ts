import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Database } from '../../database';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'Database',
      useClass: Database,
    },
  ],
})
export class ArtistModule {}
