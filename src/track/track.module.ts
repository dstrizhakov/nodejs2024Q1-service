import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Database } from '../../database';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'Database',
      useClass: Database,
    },
  ],
})
export class TrackModule {}
