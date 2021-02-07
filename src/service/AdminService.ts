import PageData from "@/models/PageData";
import AnimeService from "@/service/AnimeService";
import Result from "@/models/Result";
import Ajax from "@/utils/Ajax";

export default class AdminService {

  public static getAnimeList(query: string, page: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/admin/anime/list/${page}?q=${encodeURIComponent(query)}`).then(e => e.json()).then(data => callback(PageData.cast(data, (e: any) => AnimeService.norAnime(e))));
  }

  public static getAnimeDelist(callback: (data: PageData<any>) => void): void {
    fetch(`/api/admin/anime/delist`).then(e => e.json()).then(data => callback(PageData.cast(data, (e: any) => AnimeService.norAnime(e))));
  }

  public static getCaptionList(state: number, page: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/admin/caption/list/${state}/${page}`).then(e => e.json()).then(data => callback(PageData.cast(data)));
  }

  public static addCaption(animeNo: number, callback: (result: Result<any>) => void): void {
    fetch(`/api/admin/caption/${animeNo}`, { ...Ajax.post, ...Ajax.json })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static deleteCaption(animeNo: number, callback: (result: Result<any>) => void): void {
    fetch(`/api/admin/caption/${animeNo}`, { ...Ajax.delete, ...Ajax.json })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static updateCaption(anime: any, callback: (result: Result<any>) => void): void {
    fetch(`/api/admin/caption/${anime.animeNo}`, { ...Ajax.put, ...Ajax.json, body: JSON.stringify(anime) })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static addAnime(anime: any, callback: (result: Result<any>) => void): void {
    fetch(`/api/admin/anime`, { ...Ajax.post, ...Ajax.json, body: JSON.stringify(anime) })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static deleteAnime(animeNo: number, callback: (result: Result<any>) => void): void {
    fetch(`/api/admin/anime/${animeNo}`, { ...Ajax.delete, ...Ajax.json })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static updateAnime(anime: any, callback: (result: Result<any>) => void): void {
    fetch(`/api/admin/anime/${anime.animeNo}`, { ...Ajax.put, ...Ajax.json, body: JSON.stringify(anime) })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static recoverAnime(agendaNo: number, callback: (result: Result<any>) => void): void {
    fetch(`/api/admin/anime/recover/${agendaNo}`, { ...Ajax.post, ...Ajax.json })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

}
