import PageData from "@/models/PageData";
import AnissiaUtil from "@/utils/AnissiaUtil";

export default class BoardService {

  public static getTicker(ticker: string, callback: (data: any) => void): void {
    fetch(`/api/board/ticker/${ticker}`).then(e => e.json()).then(data => callback(data));
  }

  public static getTopic(ticker: string, topicNo: number, callback: (topic: any) => void): void {
    fetch(`/api/board/topic/${ticker}/${topicNo}`).then(e => e.json()).then(topic => {

      callback(topic);
    });
  }

  public static getList(ticker: string, query: string, page: number, callback: (list: PageData<any>) => void): void {
    fetch(`/api/board/list/${ticker}/${page}`).then(e => e.json()).then(list => callback(PageData.cast(list, e => {
      e.regDt = AnissiaUtil.formatOrDynamicAgo(e.regDt, 'yyyy-MM-dd');
      return e;
    })));
  }

  public static getRecentHome(callback: (data: any) => void): void {
    fetch(`/api/board/recent/home`).then(e => e.json()).then(data => callback(data));
  }
}
