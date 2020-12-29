import PageData from "@/models/PageData";

export default class BoardService {
  public static getTicker(ticker: string, callback: (data: any) => void): void {
    fetch(`/api/board/ticker/${ticker}`).then(e => e.json()).then(data => callback(data));
  }
  public static getList(ticker: string, page:number, callback: (list: PageData<any>) => void): void {
    fetch(`/api/board/list/${ticker}/${page}`).then(e => e.json()).then(list => callback(PageData.cast(list, e => e)));
  }
}
