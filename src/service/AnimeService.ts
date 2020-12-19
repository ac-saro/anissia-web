import AnissiaUtil from "@/utils/AnissiaUtil";
import {DateFormat} from "@/utils/nabi/DateFormat";

export default class AnimeService {

  public static getCaptionByAnimeNo(animeNo: string, callback: (data: any) => void): void {
    fetch(`/api/anime/caption/animeNo/${animeNo}`).then(e => e.json()).then(list => callback(list.map((e: any) => {
      const dt = e.updDt.split(' ');
      e.updDt = dt[0] === new DateFormat().format("yyyy-MM-dd") ? dt[1] : dt[0];
      e.episode = e.episode === '0' ? '단편' : (e.episode + '화');
      return e;
    })));
  }

  public static getSchedule(week: string, callback: (list: any[]) => void): void {
    fetch(`/api/anime/schedule/${week}`).then(e => e.json()).then(list => callback(list.map((e: any) => {
      e.subjectPrefix = AnissiaUtil.getSubjectPrefix(week, e.status, e.startDate, e.endDate);
      e.time = e.time != '' ? e.time.replace('-99-99', '') : 'N/A';
      e.period = AnissiaUtil.animePeriod(week, e.startDate, e.endDate);
      return e;
    })));
  }
}
