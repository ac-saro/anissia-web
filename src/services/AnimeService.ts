import AnimeRank from '@/models/AnimeRank';
import PageData from '@/models/PageData';
import AnimeSummary from '@/models/AnimeSummary';
import Timetable from '@/models/AnimeTimetable';
import Caption from '@/models/AnimeCaption';
import AnimeContent from '@/models/AnimeContent';
import AnimeCaption from '@/models/AnimeCaption';

export default class AnimeService {
  // timetable anime list
  public static rank(type: string, callback: (animeRnak: AnimeRank) => void) {
    fetch(`/api/anime/rank/${type}`, { method: 'POST' }).then((e) => e.json())
      .then((list) => callback(list.map((e: any) => Object.assign(new AnimeRank(), e))));
  }

  public static list(page: number, callback: (info: PageData<AnimeSummary>) => void) {
    fetch(`/api/anime/list/${page}`, { method: 'POST' }).then((e) => e.json())
      .then((data) => callback(PageData.cast(data, (e) => Object.assign(new AnimeSummary(), e))));
  }

  public static view(view: number, callback: (info: AnimeContent) => void) {
    fetch(`/api/anime/view/${view}`, { method: 'POST' }).then((e) => e.json())
      .then((data) => {
        const content: AnimeContent = Object.assign(new AnimeContent(), data);
        content.captions = content.captions.map((e) => Object.assign(new Caption(), e));
        callback(content);
      });
  }

  public static caption(an: number, callback: (animeList: Caption[]) => void) {
    fetch(`/api/anime/caption/${an}`).then((e) => e.json())
      .then((e) => callback(e.map((caption: any) => Object.assign(new Caption(), caption))));
  }

  public static timetable(bcType: number, callback: (animeList: Timetable[]) => void) {
    fetch(`/api/anime/timetable/${bcType}`).then((e) => e.json())
      .then((list) => callback(list.map((anime: any) => Object.assign(new Timetable(), anime))));
  }
}
