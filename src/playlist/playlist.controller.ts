// src/playlist/playlist.controller.ts
import { Controller, Post, Body, Get, Query, Redirect, Param, Req, Res } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { Request, Response } from 'express';

@Controller()
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('*')
  handleRedirect(@Req() req: Request, @Query() queryParams, @Res() res: Response) {
  const queryString = new URLSearchParams(queryParams).toString();
  const originalPath = req.path;

  const protocol = req['realProtocol'];
  const username = queryParams.username;

  // Verifica se o username contém a string "tvs"
  const baseUrl = username && username.includes("tvs") ? "185.236.183.29" : "webwed.vip";

  // Monta a nova URL
  const newUrl = `${protocol}://${baseUrl}${originalPath}${queryString ? '?' + queryString : ''}`;

  console.log("NEW URL", newUrl, "\n");
  return res.redirect(newUrl);
}

  // @Post('playlist/create')
  // async create(@Body() createPlaylistDto: any) {
  //   return this.playlistService.create(createPlaylistDto);
  // }

  // @Get('/get.php')
  // @Redirect()
  // async redirectGet(@Query() query: any) {
  //   const { username, password, type, output } = query;
  //   const playlist = await this.playlistService.findByUsernameAndPassword(username, password);
    
  //   if (playlist) {
  //     const url = `${playlist.server}/get.php?username=${username}&password=${password}&type=${type}&output=${output}`;
  //     return { url };
  //   }
    
  //   const defaultUrl = `http://ceua.net/get.php?username=${username}&password=${password}&type=${type}&output=${output}`;
  //   return { url: defaultUrl };
  // }

  // @Get('/xmltv.php')
  // @Redirect()
  // async redirectXml(@Query() query: any) {
  //   const { username, password, type, output } = query;
  //   const playlist = await this.playlistService.findByUsernameAndPassword(username, password);
    
  //   if (playlist) {
  //     const url = `${playlist.server}/xmltv.php?username=${username}&password=${password}`;
  //     return { url };
  //   }
    
  //   const defaultUrl = `http://ceua.net/xmltv.php?username=${username}&password=${password}`;
  //   return { url: defaultUrl };
  // }

  // @Get('/player_api.php')
  // @Redirect()
  // async redirectPlayerApi(@Query() query: any) {
  //   const { username, password, action, category_id, vod_id, series } = query;
  //   const playlist = await this.playlistService.findByUsernameAndPassword(username, password);
    
  //   if (playlist) {
  //     let url = `${playlist.server}/player_api.php?username=${username}&password=${password}&action=${action}`;
  //     if (category_id) {
  //       url += `&category_id=${category_id}`;
  //     }
  //     if (vod_id) {
  //       url += `&vod_id=${vod_id}`;
  //     }
  //     if (series) {
  //       url += `&series=${series}`;
  //     }
  //     return { url };
  //   }
    
  //   let defaultUrl = `http://ceua.net/player_api.php?username=${username}&password=${password}&action=${action}`;
  //   if (category_id) {
  //     defaultUrl += `&category_id=${category_id}`;
  //   }
  //   if (vod_id) {
  //     defaultUrl += `&vod_id=${vod_id}`;
  //   }
  //   if (series) {
  //     defaultUrl += `&series=${series}`;
  //   }
  //   return { url: defaultUrl };
  // }

  // @Get('/live/:username/:password/:id.ts')
  // @Redirect()
  // async redirectLive(@Param('username') username: string, @Param('password') password: string, @Param('id') id: string) {
  //   const url = `http://ceua.net/live/${username}/${password}/${id}.ts`;
  //   return { url };
  // }

  // @Get('/movie/:username/:password/:id.:extension')
  // @Redirect()
  // async redirectMovie(@Param('username') username: string, @Param('password') password: string, @Param('id') id: string, @Param('extension') extension: string) {
  //   const url = `http://ceua.net/movie/${username}/${password}/${id}.${extension}`;
  //   return { url };
  // }
}
