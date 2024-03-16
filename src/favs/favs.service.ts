import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(
    private database: DatabaseService,
    private prisma: PrismaService,
  ) {}

  async create(target: 'track' | 'artist' | 'album', id: string) {
    switch (target) {
      case 'track':
        const track = await this.prisma.track.findUnique({ where: { id } });
        if (!track) {
          throw new HttpException(
            'Track not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        return await this.prisma.favouriteTrack.create({
          data: { trackId: id },
        });
        break;
      case 'artist':
        const artist = await this.prisma.artist.findUnique({ where: { id } });
        if (!artist) {
          throw new HttpException(
            'Artist not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        return await this.prisma.favouriteArtist.create({
          data: {
            artistId: id,
          },
        });
        break;
      case 'album':
        const album = await this.prisma.album.findUnique({ where: { id } });
        if (!album) {
          throw new HttpException(
            'Album not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        return await this.prisma.favouriteAlbum.create({
          data: { albumId: id },
        });
        break;
    }
  }

  async findAll() {
    const favoritesArtistsId = await this.prisma.favouriteArtist.findMany();
    const favoritesAlbumsId = await this.prisma.favouriteAlbum.findMany();
    const favoritesTracks = await this.prisma.favouriteTrack.findMany();
    return {
      artists: await Promise.all(
        favoritesArtistsId.map(
          async (favArtist) =>
            await this.prisma.artist.findUnique({
              where: { id: favArtist.artistId },
            }),
        ),
      ),
      albums: await Promise.all(
        favoritesAlbumsId.map(
          async (favAlbum) =>
            await this.prisma.album.findUnique({
              where: { id: favAlbum.albumId },
            }),
        ),
      ),
      tracks: await Promise.all(
        favoritesTracks.map(
          async (favTrack) =>
            await this.prisma.track.findUnique({
              where: { id: favTrack.trackId },
            }),
        ),
      ),
    };
  }

  remove(target: 'track' | 'artist' | 'album', id: string) {
    if (!validate(id)) {
      throw new HttpException('UUID is invalid', HttpStatus.BAD_REQUEST);
    }
    switch (target) {
      case 'track':
        const track = this.database.getOne('track', id);
        if (!track) {
          throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
        }
        this.database.removeFav('track', id);
        break;
      case 'artist':
        const artist = this.database.getOne('artist', id);
        if (!artist) {
          throw new HttpException(
            'Artist not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        this.database.removeFav('artist', id);
        break;
      case 'album':
        const album = this.database.getOne('album', id);
        if (!album) {
          throw new HttpException(
            'Album not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        this.database.removeFav('album', id);
        break;
    }
  }
}
