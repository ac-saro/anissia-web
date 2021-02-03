import PageData from "@/models/PageData";
import AnimeService from "@/service/AnimeService";
import Result from "@/models/Result";
import Ajax from "@/utils/Ajax";

export default class AdminService {

  public static getAnimeList(status: string, query: string, page: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/admin/anime/${status}/${page}`).then(e => e.json()).then(data => callback(PageData.cast(data, (e: any) => AnimeService.norAnime(e))));
  }

  public static getCaptionList(state: number, page: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/admin/caption/list/${state}/${page}`).then(e => e.json()).then(data => callback(PageData.cast(data)));
  }

  public static addCaption(animeNo: number, callback: (result: Result<any>) => void): void {
    fetch(`/api/admin/caption/${animeNo}`, { ...Ajax.post, ...Ajax.json })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static delCaption(animeNo: number, callback: (result: Result<any>) => void): void {
    fetch(`/api/admin/caption/${animeNo}`, { ...Ajax.delete, ...Ajax.json })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static editCaption(anime: any, callback: (result: Result<any>) => void): void {
    fetch(`/api/admin/caption/${anime.animeNo}`, { ...Ajax.post, ...Ajax.json, body: JSON.stringify(anime) })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

}
