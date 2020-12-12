import UserInfo from '@/models/UserInfo';
import AslModel from '@/models/AslModel';
import PageData from '@/models/PageData';
import ManageAnimeCaption from '@/models/ManageAnimeCaption';
import Nabi from '@/utils/nabi';

export default class ManageService {
  public static listCaption(page: number, callback: (list: PageData<ManageAnimeCaption>) => void) {
    fetch(`/api/manage/caption/list/${page}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
    })
    .then((e) => e.json())
    .then((data) => callback(PageData.cast(data, (e) => ManageAnimeCaption.cast(e))));
  }

  public static updateCaption(
    an: number, episode: string, ymdhms: string, website: string,
    callback: (pass: boolean, msg: string|null) => void) {
      // Nabi.dateFormat
      alert('test');
  }

  public static deleteCaption(an: number, callback: (pass: boolean, msg: string|null) => void) {
    alert('test');
  }

  public static addCaption(an: number, callback: (pass: boolean, msg: string|null) => void) {
    alert('test');
  }



  public static applyExist(callback: (exist: boolean) => void) {
    fetch(`/api/asl/user/apply/exist`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
    })
    .then((e) => e.json())
    .then((exist) => callback(exist));
  }

  public static apply(
      agree: boolean, site: string, titles: string, note: string,
      callback: (pass: boolean, msg: string|null) => void) {
    if (!agree) {
      callback(false, '주의사항에 동의해주세요.');
      return;
    } else if (!(/^https?\:\/\/.+/).test(site)) {
      callback(false, '주소는 http(s):// 를 포함하도록 작성해주세요.');
      return;
    } else if (titles.trim() === '') {
      callback(false, '한개 이상의 작품을 입력해주세요.');
      return;
    }

    fetch(`/api/asl/user/apply`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ site, titles, note }),
    })
    .then((e) => e.json())
    .then((res) => callback(res.code === 'OK', res.msg));
  }
}
