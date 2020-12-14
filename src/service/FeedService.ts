import Result from "@/models/Result";
import store from "@/store"
import PageData from "@/models/PageData";
import AnissiaUtil from "@/utils/AnissiaUtil";


export default class FeedService {

  public static getArticles(stockId: string, query: string, lessThenFeedNo: number,  callback: (result: any[]) => void) {
    fetch(`/api/feeds?stockId=${encodeURIComponent(stockId)}&query=${encodeURIComponent(query)}&lessThenFeedNo=${lessThenFeedNo}`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
    })
        .then((e) => e.json())
        .then(res => callback((res as any[]).map(e => FeedService.normalizeFeedItem(e))));
  }

  public static addArticle(name: string, password: string, content: string, targetStockId: string | null, callback: (result: Result<void>) => void) {
    const param = {name, password, content, targetStockId};
    if (!FeedService.preTaskParameter(param, (res) => callback(res))) {
      return;
    }
    fetch(`/api/feeds`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(param)
    })
    .then((e) => e.json())
    .then(res => callback(res));
  }

  public static addReply(id: number, name: string, password: string, content: string, callback: (result: Result<void>) => void) {
    const param = {name, password, content};
    if (!FeedService.preTaskParameter(param, (res) => callback(res))) {
      return;
    }

    fetch(`/api/feeds/${id}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(param)
    })
        .then((e) => e.json())
        .then((data) => alert(data));
  }

  public static deleteArticle(feedId: number, password: string, callback: (result: Result<void>) => void) {
    const param = {password};
    if (!FeedService.preTaskParameter(param, (res) => callback(res))) {
      return;
    }

    fetch(`/api/feeds/${feedId}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(param)
    })
        .then((e) => e.json())
        .then(res => callback(res));
  }

  public static deleteReply(feedId: number, replyId: number, password: string, callback: (result: Result<void>) => void) {
    const param = {password};
    if (!FeedService.preTaskParameter(param, (res) => callback(res))) {
      return;
    }

    fetch(`/api/feeds/${feedId}/${replyId}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(param)
    })
        .then((e) => e.json())
        .then(res => callback(res));
  }

  public static voteArticle(id: number, vote: string, callback: (result: any) => void) {
    fetch(`/api/feeds/${id}/${vote}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'}
    })
        .then((e) => e.json())
        .then((res) => {
          res.data = FeedService.normalizeFeedItem(res.data);
          callback(res);
        });
  }

  public static voteReply(feedId: number, replyId: number, vote: string, callback: (result: any) => void) {
    fetch(`/api/feeds/${feedId}/${replyId}/${vote}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'}
    })
        .then((e) => e.json())
        .then((res) => {
          res.data = FeedService.normalizeFeedItem(res.data);
          callback(res);
        });
  }

  public static preTaskParameter(param: any, ifInvalid: (result: Result<void>) => void): boolean {
    if ((param.isLogin = store.state.user.isLogin() ? 1 : 0) == 1) {
      if (typeof param.name === 'string') { param.name = '-'; }
      if (typeof param.password === 'string') { param.password = '----'; }
    }

    if (typeof param.name === 'string' && (param.name = param.name.trim()) === '') {
      ifInvalid(new Result("FAIL", "이름을 입력해주세요."));
      return false;
    }

    if (typeof param.password === 'string' && param.password == '') {
      ifInvalid(new Result("FAIL", "암호를 입력해주세요."));
      return false
    }

    if (typeof param.password === 'string' && param.password.length < 4) {
      ifInvalid(new Result("FAIL", "암호를 4자 이상이여야 합니다."));
      return false
    }

    if (typeof param.content === 'string' && param.content === '') {
      ifInvalid(new Result("FAIL", "내용을 입력해주세요"));
      return false;
    }
    return true;
  }

  public static normalizeFeedItem(e: any) {
    if (e == null) {
      return null;
    }
    e.regDtAgo = AnissiaUtil.ymdOrDynamicAgo(e.regDt);
    if (e.replies) {
      e.replies = e.replies.map(FeedService.normalizeFeedItem);
    }
    return e;
  }
}
