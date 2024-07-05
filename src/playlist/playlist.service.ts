// src/playlist/playlist.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
  ) {}

  async create(playlistDto: any): Promise<Playlist> {
    const { url, note } = playlistDto;
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const username = urlParams.get('username');
    const password = urlParams.get('password');

    if (!username || !password) {
      throw new Error('Username and password are required in the URL');
    }

    const newPlaylist = this.playlistRepository.create({
      username,
      password,
      originalUrl: url,
      note,
    });

    return this.playlistRepository.save(newPlaylist);
  }

  async findByUsernameAndPassword(username: string, password: string): Promise<Playlist> {
    return this.playlistRepository.findOne({ where: { username, password } });
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistRepository.find();
  }
}
