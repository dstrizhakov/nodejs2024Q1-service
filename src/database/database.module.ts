import { Module, Global } from '@nestjs/common';
import { FavoritesResponse, IAlbum, IArtist, IFavorites, ITrack, IUser } from 'src/types';

@Global()
@Module({})
export class DatabaseModule {
  private users: IUser[];
  private tracks: ITrack[];
  private artists: IArtist[];
  private albums: IAlbum[];
  private favs: IFavorites;

  constructor() {
    this.users = [];
    this.tracks = [];
    this.artists = [];
    this.albums = [];
    this.favs = {
      albums: [],
      artists: [],
      tracks: [],
    };
  }

  public getAll(target: 'users' | 'tracks' | 'artists' | 'albums' | 'favs') {
    switch (target) {
      case 'users':
        return this.users;
      case 'tracks':
        return this.tracks;
      case 'artists':
        return this.artists;
      case 'albums':
        return this.albums;
      case 'favs':
        const returnFavs: FavoritesResponse = {
          artists: this.favs.artists.map((artistId) =>
            this.artists.find((artist) => artist.id === artistId),
          ),
          albums: this.favs.albums.map((albumId) =>
            this.albums.find((album) => album.id === albumId),
          ),
          tracks: this.favs.tracks.map((trackId) =>
            this.tracks.find((track) => track.id === trackId),
          ),
        };
        return returnFavs;
      default:
        return null;
    }
  }

  public getOne(target: 'user' | 'track' | 'artist' | 'album', id: string) {
    switch (target) {
      case 'user':
        return this.users.find((user) => user.id === id);
      case 'track':
        return this.tracks.find((track) => track.id === id);
      case 'artist':
        return this.artists.find((artist) => artist.id === id);
      case 'album':
        return this.albums.find((album) => album.id === id);
      default:
        return null;
    }
  }

  public add(
    target: 'user' | 'track' | 'artist' | 'album',
    dto: IUser | ITrack | IAlbum | IArtist,
  ) {
    switch (target) {
      case 'user':
        this.users.push(dto as IUser);
        break;
      case 'track':
        this.tracks.push(dto as ITrack);
        break;
      case 'artist':
        this.artists.push(dto as IArtist);
        break;
      case 'album':
        this.albums.push(dto as IAlbum);
        break;
    }
  }

  public delete(target: 'user' | 'track' | 'artist' | 'album', id: string) {
    switch (target) {
      case 'user':
        this.users = this.users.filter((user) => user.id !== id);
      case 'track':
        this.tracks = this.tracks.filter((track) => track.id !== id);
      case 'artist':
        this.artists = this.artists.filter((artist) => artist.id !== id);
      case 'album':
        this.albums = this.albums.filter((album) => album.id !== id);
      default:
        return null;
    }
  }

  public addFav(target: 'track' | 'artist' | 'album', id: string) {
    switch (target) {
      case 'track':
        this.favs.tracks.push(id);
        break;
      case 'artist':
        this.favs.artists.push(id);
        break;
      case 'album':
        this.favs.albums.push(id);
        break;
    }
  }

  public removeFav(target: 'track' | 'artist' | 'album', id: string) {
    switch (target) {
      case 'track':
        this.favs.tracks = this.favs.tracks.filter((trackId) => trackId === id);
        break;
      case 'artist':
        this.favs.artists = this.favs.artists.filter(
          (artistId) => artistId === id,
        );
        break;
      case 'album':
        this.favs.albums = this.favs.albums.filter((albumId) => albumId === id);
        break;
    }
  }
}
