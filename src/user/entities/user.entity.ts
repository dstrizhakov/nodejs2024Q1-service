import { Exclude, Transform, Type } from 'class-transformer';

export class User {
  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  @Type(() => Date)
  @Transform((value) => value.valueOf(), { toPlainOnly: true })
  createdAt: Date;
  @Type(() => Date)
  @Transform((value) => value.valueOf(), { toPlainOnly: true })
  updatedAt: Date;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
