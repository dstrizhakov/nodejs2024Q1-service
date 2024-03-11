import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { config } from 'dotenv';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';

config();
const PORT = process.env.PORT || 4000;
const API_PATH = join(__dirname, '../', 'doc/api.yaml');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiYaml = await readFile(API_PATH, 'utf-8');
  const config: OpenAPIObject = load(apiYaml) as OpenAPIObject;
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT).then(() => {
    console.log(`Application is running on: http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
  });
}
bootstrap();
