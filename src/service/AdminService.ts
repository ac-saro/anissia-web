import PageData from "@/models/PageData";

export default class AdminService {

  public static getCaptionList(state: number, page: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/admin/caption/list/${state}/${page}`).then(e => e.json()).then(data => callback(PageData.cast(data)));
  }

}
