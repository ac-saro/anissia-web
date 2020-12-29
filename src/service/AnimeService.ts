import AnissiaUtil from "@/utils/AnissiaUtil";
import {DateFormat} from "@/utils/nabi/DateFormat";
import PageData from "@/models/PageData";

export default class AnimeService {

  public static getList(query: string, page: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/anime/list/${page}`).then(e => e.json()).then(data => callback(PageData.cast(data, (e: any) => this.norAnime(e))));
  }

  public static getAnime(animeNo: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/anime/animeNo/${animeNo}`).then(e => e.json()).then(anime => callback(this.norAnime(anime)));
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
      callback(list);
    });
  }

  private static norCaption(e: any) {
    const dt = e.updDt.split(' ');
    e.updDt = dt[0] === new DateFormat().format("yyyy-MM-dd") ? dt[1] : dt[0];
    e.episode = e.episode === '0' ? '단편' : (e.episode + '화');
    return e;
  }

  private static norAnime(e: any, weekParam: string | null = null) {
    const week = weekParam || e.week;
    e.subjectPrefix = AnissiaUtil.getSubjectPrefix(week, e.status, e.startDate, e.endDate);
    e.time = e.time != '' ? e.time.replace('-99-99', '') : 'N/A';
    e.period = AnissiaUtil.animePeriod(week, e.startDate, e.endDate);
    if (e.captions && e.captions.length) {
      e.captions = e.captions.map((caption: any) => this.norCaption(caption));
    }
    return e;
  }
}
