import BoardTopic from '@/models/BoardTopic';
import BoardContent from '@/models/BoardContent';
import BoardPost from '@/models/BoardPost';
import BoardInfo from '@/models/BoardInfo';
import PageData from '@/models/PageData';

export default class BoardService {
  public static recent(callback: (BoardList: BoardTopic[]) => void) {
    fetch('/api/board/any/recent', {
      method: 'POST',
    }).then((e) => e.json()).then((list) => callback(list.map(BoardTopic.cast)));
  }

  public static info(code: string, callback: (info: BoardInfo) => void) {
    fetch(`/api/board/any/info/${code}`, { method: 'POST' }).then((e) => e.json())
      .then((data) => callback(Object.assign(new BoardInfo(), data)));
  }

  public static topic(code: string, page: number, callback: (info: PageData<BoardTopic>) => void) {
    fetch(`/api/board/any/topic/${code}/${page}`, { method: 'POST' }).then((e) => e.json())
      .then((data) => callback(PageData.cast(data, BoardTopic.cast)));
  }

  public static view(code: string, view: number, callback: (info: BoardContent) => void) {
    fetch(`/api/board/any/view/${code}/${view}`, { method: 'POST' }).then((e) => e.json())
      .then((data) => callback(BoardContent.cast(data)));
  }

  public static topicWrite(
      code: string, subject: string, content: string, callback: (pass: boolean, msg: string|null, bn: number) => void) {
    fetch(`/api/board/user/topic/write/${code}`, {
      method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({subject, content}),
    }).then((e) => e.json())
      .then((res) => callback(res.code === 'OK', res.msg, res.data));
  }

  public static topicEdit(
      bn: number, subject: string, content: string,
      callback: (pass: boolean, msg: string|null) => void) {
    fetch(`/api/board/user/topic/edit/${bn}`, {
      method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({subject, content}),
    }).then((e) => e.json())
      .then((res) => callback(res.code === 'OK', res.msg));
  }

  public static topicDelete(bn: number, callback: (pass: boolean, msg: string|null) => void) {
    fetch(`/api/board/user/topic/delete/${bn}`, { method: 'POST', credentials: 'same-origin' }).then((e) => e.json())
      .then((res) => callback(res.code === 'OK', res.msg));
  }

  public static postWrite(bn: number, content: string, callback: (pass: boolean, msg: string|null) => void) {
    fetch(`/api/board/user/post/write/${bn}`, {
      method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content}),
    }).then((e) => e.json())
      .then((res) => callback(res.code === 'OK', res.msg));
  }

  public static postEdit(brn: number, content: string, callback: (pass: boolean, msg: string|null) => void) {
    fetch(`/api/board/user/post/edit/${brn}`, {
      method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content}),
    }).then((e) => e.json())
      .then((res) => callback(res.code === 'OK', res.msg));
  }

  public static postDelete(
      bn: number, brn: number, callback: (pass: boolean, msg: string|null) => void) {
    fetch(`/api/board/user/post/delete/${bn}/${brn}`, { method: 'POST', credentials: 'same-origin' })
      .then((e) => e.json()).then((res) => callback(res.code === 'OK', res.msg));
  }
}
