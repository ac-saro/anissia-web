import AnissiaUtil from "@/utils/AnissiaUtil";
import {DateFormat} from "@/utils/nabi/DateFormat";
import PageData from "@/models/PageData";

export default class AnimeService {

  static cacheAutocorrect: any = {};
  static genres: string[] = [];

  public static getList(query: string, page: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/anime/list/${page}?q=${encodeURIComponent(query)}`).then(e => e.json()).then(data => callback(PageData.cast(data, (e: any) => this.norAnime(e))));
  }

  public static getAnime(animeNo: number, callback: (data: any) => void): void {
    fetch(`/api/anime/animeNo/${animeNo}`).then(e => e.json()).then(anime => callback(this.norAnime(anime)));
  }

  public static getGenres(callback: (genres: string[]) => void): void {
    if (AnimeService.genres.length) {
      callback(AnimeService.genres);
    } else {
      fetch(`/api/anime/genres`).then(e => e.json()).then(genres => callback((AnimeService.genres = genres)));
    }
  }

  public static getAnimeAutocorrect(query: string, callback: (list: any[]) => void): void {
    if (query.trim() != '') {
      const cache = AnimeService.cacheAutocorrect[query];
      if (cache) {
        callback(cache);
      } else {
        fetch(`/api/anime/autocorrect?q=${encodeURIComponent(query)}`).then(e => e.json()).then(e => callback((AnimeService.cacheAutocorrect[query] = e)));
      }
    } else {
      callback([]);
    }
  }

  public static getCaptionByAnimeNo(animeNo: string, callback: (data: any) => void): void {
    fetch(`/api/anime/caption/animeNo/${animeNo}`).then(e => e.json()).then(list => callback(list.map((e: any) => this.norCaption(e))));
  }

  public static getSchedule(week: string, callback: (list: any[]) => void): void {
    fetch(`/api/anime/schedule/${week}`).then(e => e.json()).then(list => callback(list.map((e: any) => this.norAnime(e, week))));
  }

  public static getRank(type: string, callback: (list: any[]) => void): void {
    fetch(`/api/anime/rank/${type}`).then(e => e.json()).then(list => {
      for (let i = list.length - 1 ; i >= 1 ; i--) {
        if (list[i - 1].rank === list[i].rank) {
          list[i].rank = '-';
        }
      }
      if (list.length < 30) {
        list = list.concat([...new Array(30).keys()].map(e => ({animeNo: 0, rank: e+1})).slice(list.length));
      }
      callback(list);
    });
  }

  public static norCaption(e: any) {
    e.updDt = AnissiaUtil.ymdOrDynamicAgo(e.updDt);
    e.episode = e.episode === '0' ? '단편' : (e.episode + '화');
    if (e.website === '') {
      e.episode = '준비중';
    }
    return e;
  }

  public static norAnime(e: any, weekParam: string | null = null) {
    const week = weekParam || e.week;
    e.pureWeek = AnissiaUtil.isPureWeek(week);
    e.subjectPrefix = AnissiaUtil.getSubjectPrefix(week, e.status, e.startDate, e.endDate);
    e.time = e.time != '' ? e.time.replace(/-99/g, '') : '-';
    e.period = AnissiaUtil.animePeriod(week, e.startDate, e.endDate);
    if (e.captions && e.captions.length) {
      e.captions = e.captions.map((caption: any) => this.norCaption(caption));
    }
    return e;
  }

  public static bindInfo(anime: any): any {
    anime.info = [anime.period];
    anime.weekText = AnissiaUtil.toKoWeek(anime.week);
    anime.timeText = anime.pureWeek ? AnissiaUtil.toKo12Time(anime.time) : '';
    anime.genreList = anime.genres.split(/,/g).filter((e: string) => e != '');
    if (!anime.pureWeek) {
      anime.info.push(AnissiaUtil.toKoWeek(anime.week));
    } else if (['ON', 'OFF'].indexOf(anime.status) != -1 && anime.week) {
      anime.info.push("매주 (" + anime.weekText + ") " + anime.timeText);
      if (anime.status == 'OFF') { anime.info.push('금주결방'); }
    }
    switch (anime.status) {
      case 'ON': anime.statusText = anime.pureWeek ? '방영중' : `신작/기타`; break;
      case 'OFF': anime.statusText = '결방'; break;
      case 'END': anime.statusText = '완결'; break;
      case 'DEL': anime.statusText = '삭제대기'; break;
      case 'REQ': anime.statusText = '등록요청'; break;
    }
    return anime;
  }

  public static toInfo(anime: any): string[] {
    return AnimeService.bindInfo(anime).info.filter((e: string) => e);
  }
}
