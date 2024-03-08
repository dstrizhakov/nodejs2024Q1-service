import { IAlbum, IArtist, IFavorites, ITrack, IUser } from 'src/types';

export class Database {
  private users: IUser[];
  private tracks: ITrack[];
  private artists: IArtist[];
  private albums: IAlbum[];
  private favs: IFavorites;

  constructor() {
    this.users = [
      {
        id: 'e8e5e1d7-c45a-44ea-922f-5ba567aab692',
        login: 'dmitry',
        password: '123',
        version: 1,
        createdAt: 1709746501901,
        updatedAt: 1709746501901,
      },
    ];
    this.tracks = [
      {
        id: 'e8e5e1d7-c45a-44ea-922f-5ba567aab693',
        name: 'Valera',
        artistId: 'e8e5e1d7-c45a-44ea-922f-5ba567aab694',
        albumId: 'e8e5e1d7-c45a-44ea-922f-5ba567aab695',
        duration: 120,
      },
    ];
    this.artists = [
      {
        id: 'e8e5e1d7-c45a-44ea-922f-5ba567aab694',
        name: 'Afrodita',
        grammy: false,
      },
    ];
    this.albums = [
      {
        id: 'e8e5e1d7-c45a-44ea-922f-5ba567aab695',
        name: 'Valera',
        year: 2014,
        artistId: 'e8e5e1d7-c45a-44ea-922f-5ba567aab694',
      },
    ];
    this.favs = {
      albums: ['e8e5e1d7-c45a-44ea-922f-5ba567aab694'],
      artists: ['e8e5e1d7-c45a-44ea-922f-5ba567aab694'],
      tracks: ['e8e5e1d7-c45a-44ea-922f-5ba567aab693'],
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
        return this.favs;
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
      default:
        return null;
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
}
