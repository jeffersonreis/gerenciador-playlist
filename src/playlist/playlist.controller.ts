// src/playlist/playlist.controller.ts
import { Controller, Post, Body, Get, Query, Redirect } from '@nestjs/common';
import { PlaylistService } from './playlist.service';

@Controller()
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('playlist/create')
  async create(@Body() createPlaylistDto: any) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get('playlist')
  async findOne(@Query('username') username: string, @Query('password') password: string) {
    return this.playlistService.findByUsernameAndPassword(username, password);
  }

  @Get('/get.php')
  @Redirect()
  async redirect(@Query('username') username: string, @Query('password') password: string) {
    const playlist = await this.playlistService.findByUsernameAndPassword(username, password);
    if (playlist) {
      return { url: playlist.originalUrl };
    }
    return { url: '/' };
  }
}
