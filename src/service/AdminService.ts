import PageData from "@/models/PageData";
import AnimeService from "@/service/AnimeService";

export default class AdminService {

  public static getAnimeList(status: string, query: string, page: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/admin/anime/${status}/${page}`).then(e => e.json()).then(data => callback(PageData.cast(data, (e: any) => AnimeService.norAnime(e))));
  }

  public static getCaptionList(state: number, page: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/admin/caption/list/${state}/${page}`).then(e => e.json()).then(data => callback(PageData.cast(data)));
  }

}
