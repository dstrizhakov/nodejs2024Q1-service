import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Database } from '../../database';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'Database',
      useClass: Database,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
