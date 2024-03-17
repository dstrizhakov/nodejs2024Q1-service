import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(target: 'track' | 'artist' | 'album', id: string) {
    switch (target) {
      case 'track':
        return await this.prisma.favouriteTrack.create({
          data: { trackId: id },
        });
      case 'artist':
        return await this.prisma.favouriteArtist.create({
          data: {
            artistId: id,
          },
        });
      case 'album':
        return await this.prisma.favouriteAlbum.create({
          data: { albumId: id },
        });
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

  async get(target: 'track' | 'artist' | 'album', id: string) {
    switch (target) {
      case 'track':
        return await this.prisma.favouriteTrack.findUnique({ where: { id } });
      case 'artist':
        return await this.prisma.favouriteArtist.findUnique({ where: { id } });
      case 'album':
        return await this.prisma.favouriteAlbum.findUnique({ where: { id } });
    }
  }

  async remove(target: 'track' | 'artist' | 'album', id: string) {
    switch (target) {
      case 'track':
        try {
          await this.prisma.track.delete({ where: { id } });
          return true;
        } catch {
          return;
        }
      case 'artist':
        try {
          await this.prisma.artist.delete({ where: { id } });
          return true;
        } catch {
          return;
        }
      case 'album':
        try {
          await this.prisma.album.delete({ where: { id } });
          return true;
        } catch {
          return;
        }
    }
  }
}
