// src/playlist/playlist.controller.ts
import { Controller, Post, Body, Get, Query, Redirect, Param, Req, Res } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { query, Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller()
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {
  }

  @Get('*')
  handleRedirect(@Req() req: Request, @Query() queryParams, @Res() res: Response) {
  const clubOff = false;
  const tvsOff = false;
  const queryString = new URLSearchParams(queryParams).toString();
  const originalPath = req.path;

  const protocol = req['realProtocol'];
  const username = queryParams.username;

  // Verifica se o username contém a string "tvs"
  const shouldRedirectToTvsFutbol = originalPath.includes("xtvs") || (queryParams.username && queryParams.username.includes("xtvs"));

  // Verifica se o username contém "temp1"
  const forceTemp = originalPath.includes("temp123") || (queryParams.username && queryParams.username.includes("temp123"))

  const baseUrl = shouldRedirectToTvsFutbol ? "pioma77.org" : "bcf9k6t.vip";

  if ((shouldRedirectToTvsFutbol || !clubOff) && !forceTemp) {
    // Monta a nova URL
    const newUrl = `${protocol}://${baseUrl}${originalPath}${queryString ? '?' + queryString : ''}`;

    // console.log("NEW URL", newUrl, "\n");
    return res.redirect(newUrl);
  }

  // Club Off:
  console.log('CLub OFF')

  // player_api
  if (originalPath.includes("player_api.php")) {   
    if (queryParams.action === 'get_vod_info' || queryParams.action === 'get_series_info') {
      queryParams.username = "646678434xtvs"
      queryParams.password = "C775S7017v"
      const queryString2 = new URLSearchParams(queryParams).toString();      
      return res.redirect(`http://yokibl.net${originalPath}${queryString2 ? '?' + queryString2 : ''}`);
    }

    if (queryParams.action === undefined) {
      queryParams.action = "get_user"
    }

    const filePath = path.join(process.cwd(), 'src', 'offplay', `${queryParams.action}.json`);
    // Lê o arquivo JSON e envia como resposta
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Erro ao processar a requisição');
      }

      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  }


  // Filmes
  if (originalPath.includes("/movie/")) {
    const parts = originalPath.split('/');
    let id = parts[parts.length - 1];
    let newUrl = `http://yokibl.net/movie/646678434xtvs/C775S7017v/${id}`
    return res.redirect(newUrl);
  }

  // Series
  if (originalPath.includes("/series/")) {
    const parts = originalPath.split('/');
    let id = parts[parts.length - 1];
    let newUrl = `http://yokibl.net/series/646678434xtvs/C775S7017v/${id}`
    return res.redirect(newUrl);
  }

  // Canais
  if (originalPath.includes("/live/")) {
    let newUrl;

    // Globo
    if (originalPath.endsWith("/1.ts")) {
      newUrl =  "http://15.235.15.230:14488/"
    }    

    // Sportv 1
    if (originalPath.endsWith("/2.ts")) {
      newUrl =  "https://cr7v.short.gy/ManoT/Whats75991634025/1/Index.m3u8"
    }

    // Sportv 1 [ALT]
    if (originalPath.endsWith("/3.ts")) {
      newUrl =  "https://cr7v.short.gy/ManoT/Whats75991634025/2/Index.m3u8"
    }

    // Sportv 2
    if (originalPath.endsWith("/4.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/172"
    }

    // Sportv 3
    if (originalPath.endsWith("/5.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/175"
    }

    // Premiere 1 
    if (originalPath.endsWith("/6.ts")) {
      newUrl =  "https://cr7v.short.gy/manoT/Clube/Index.m3u8"
    }

    // Premiere 1 [ALT]
    if (originalPath.endsWith("/8.ts")) {
      newUrl =  "https://anonmedia.foo/premiereclubes/tracks-v1a1/mono.m3u8"
    }

    // Premiere 2
    if (originalPath.endsWith("/7.ts")) {
      newUrl =  "https://anonmedia.foo/premiere2/tracks-v1a1/mono.m3u8"
    }

    // Premiere 2 [ALT]
    if (originalPath.endsWith("/9.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/149"
    }
    
    // Premiere 3
    if (originalPath.endsWith("/10.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/152"
    }

    // Premiere 3 [ALT]
    if (originalPath.endsWith("/11.ts")) {
      newUrl =  "https://anonmedia.foo/premiere3/tracks-v1a1/mono.m3u8"
    }

    // Premiere 4
    if (originalPath.endsWith("/12.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/155"
    }

    // Premiere 4 [ALT]
    if (originalPath.endsWith("/13.ts")) {
      newUrl =  "https://anonmedia.foo/premiere4/tracks-v1a1/mono.m3u8"
    }

    // Telecine Premium
    if (originalPath.endsWith("/14.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/307"
    }

    // Telecine Touch  
    if (originalPath.endsWith("/15.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/310"
    }

    // Telecine Cult  
    if (originalPath.endsWith("/16.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/298"
    }

    // Telecine Fun  
    if (originalPath.endsWith("/17.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/301"
    }

    // AMC  
    if (originalPath.endsWith("/18.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/301"
    }

    // HBO
    if (originalPath.endsWith("/19.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/251"
    }

    // HBO 2
    if (originalPath.endsWith("/20.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/248"
    }

    // HBO Family
    if (originalPath.endsWith("/21.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/253"
    }

    if (originalPath.endsWith("/22.ts")) {
      newUrl =  "http://authxplus-2.xyz:2082/Tourobox1-APhnnJ6sQS/7nAiGmzfNG/267"
    }

    // Globo RJ
    if (originalPath.endsWith("/23.ts")) {
      newUrl =  "https://stream1.freetv.fun/globo-rj-2-1.ctv"
    }

    // nxplay HH
    if (originalPath.endsWith("/24.ts")) {
      newUrl =  "https://cdn-2.nxplay.com.br/DISCOVERY_HH_NX/index.m3u8"
    }

    // Discovery Channel
    if (originalPath.endsWith("/25.ts")) {
      newUrl =  "https://cdn-2.nxplay.com.br/DISCOVERY_CHANNEL_NX/tracks-v1a1/mono.m3u8"
    }

    // Discovery Science HD
    if (originalPath.endsWith("/26.ts")) {
      newUrl =  "https://cdn-2.nxplay.com.br/DISCOVERY_SCIENCE_NX/index.m3u8"
    }

    // Discovery Theater
    if (originalPath.endsWith("/27.ts")) {
      newUrl =  "https://cdn-5.nxplay.com.br/DISCOVERY_THEATER_NX/index.m3u8"
    }

    // History
    if (originalPath.endsWith("/28.ts")) {
      newUrl =  "https://cdn-2.nxplay.com.br/HISTORY_TK/index.m3u8"
    }

    // Animal Planet HD
    if (originalPath.endsWith("/29.ts")) {
      newUrl =  "https://cdn-2.nxplay.com.br/ANIMAL_PLANET_NX/index.m3u8"
    }

    // SBT
    if (originalPath.endsWith("/30.ts")) {
      newUrl =  "https://aovivo.maissbt.com/channel_540.m3u8"
    }

    // Band
    if (originalPath.endsWith("/31.ts")) {
      newUrl =  "https://stream1.freetv.fun/band-1.m3u8"
    }

    // Record TV
    if (originalPath.endsWith("/32.ts")) {
      newUrl =  "https://stream1.freetv.fun/record-sp-2-1.m3u8"
    }

    // Rede TV
    if (originalPath.endsWith("/33.ts")) {
      newUrl =  "https://cdn2.easy.tv.br/redetv/index.m3u8"
    }

    return res.redirect(newUrl);
  }
  
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
