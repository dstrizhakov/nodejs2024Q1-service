import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { Database } from '../../database';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    {
      provide: 'Database',
      useClass: Database,
    },
  ],
})
export class FavsModule {}
