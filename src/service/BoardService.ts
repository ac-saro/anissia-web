import PageData from "@/models/PageData";
import AnissiaUtil from "@/utils/AnissiaUtil";
import Ajax from "@/utils/Ajax";
import Result from "@/models/Result";

export default class BoardService {

  public static getTicker(ticker: string, callback: (data: any) => void): void {
    fetch(`/api/board/ticker/${ticker}`).then(e => e.json()).then(data => callback(data));
  }

  public static getTopic(ticker: string, topicNo: number, callback: (topic: any) => void): void {
    fetch(`/api/board/topic/${ticker}/${topicNo}`).then(e => e.json()).then(topic => {
      if (!topic.posts) { topic.posts = []; }
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

  public static createTopic(ticker: string, topic: any, callback: (result: Result<number|null>) => void): void {
    fetch(`/api/board/topic/${ticker}`, { ...Ajax.json, ...Ajax.post, body: JSON.stringify({ topic: topic.editTopic, content: topic.editContent }) })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static updateTopic(topicNo: number, topic: any, callback: (result: Result<any>) => void): void {
    fetch(`/api/board/topic/${topicNo}`, { ...Ajax.json, ...Ajax.put, body: JSON.stringify({ topic: topic.editTopic, content: topic.editContent }) })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static deleteTopic(topicNo: number, callback: (result: Result<any>) => void): void {
    fetch(`/api/board/topic/${topicNo}`, { ...Ajax.json, ...Ajax.delete })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static createPost(topicNo: number, post: any, callback: (result: Result<any>) => void): void {
    fetch(`/api/board/post/${topicNo}`, { ...Ajax.json, ...Ajax.post, body: JSON.stringify({ content: post.editContent }) })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static updatePost(postNo: number, post: any, callback: (result: Result<any>) => void): void {
    fetch(`/api/board/post/${postNo}`, { ...Ajax.json, ...Ajax.put, body: JSON.stringify({ content: post.editContent }) })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static deletePost(postNo: number, callback: (result: Result<any>) => void): void {
    fetch(`/api/board/post/${postNo}`, { ...Ajax.json, ...Ajax.delete })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }
}
