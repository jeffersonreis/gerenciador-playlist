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

  @Get('/get.php')
  @Redirect()
  async redirectGet(@Query() query: any) {
    const { username, password, type, output } = query;
    const playlist = await this.playlistService.findByUsernameAndPassword(username, password);
    
    if (playlist) {
      const url = `${playlist.server}/get.php?username=${username}&password=${password}&type=${type}&output=${output}`;
      return { url };
    }
    
    return { url: '/' };
  }

  @Get('/player_api.php')
  @Redirect()
  async redirectPlayerApi(@Query() query: any) {
    const { username, password, action, category_id, vod_id, series } = query;
    const playlist = await this.playlistService.findByUsernameAndPassword(username, password);
    
    if (playlist) {
      let url = `${playlist.server}/player_api.php?username=${username}&password=${password}&action=${action}`;
      if (category_id) {
        url += `&category_id=${category_id}`;
      }
      if (vod_id) {
        url += `&vod_id=${vod_id}`;
      }
      if (series) {
        url += `&series=${series}`;
      }
      return { url };
    }
    
    return { url: '/' };
  }
}
