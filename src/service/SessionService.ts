import store from '@/store';
import router from '@/router';

import UserSession from '@/models/UserSession';
import Ajax from "@/utils/Ajax";

export default class SessionService {


  public static login(email: string, password: string, tokenLogin: number, callback: (success: boolean, message: string) => void): void {
    if (tokenLogin === 1 && !confirm('정말로 자동로그인을 사용하시겠습니까?\n- 로그인정보가 현 기기에 저장됩니다.\n- 공공장소에서는 절대 사용하지 마십시오.')) {
      callback(false, '');
      return;
    }

    fetch('/api/session', {...Ajax.post, ...Ajax.json, body: JSON.stringify({email, password, tokenLogin})})
        .then((e) => e.json()).then((res) => {
      if (res.st === 'OK') {
        store.state.user = UserSession.cast(res.data);
        res.msg !== '' && localStorage.setItem('login-token', res.msg);
        callback(true, '');
      } else {
        callback(false, res.msg);
      }
    });
  }

  public static tokenLogin() {
    const absoluteToken = localStorage.getItem('login-token');
    if (absoluteToken) {
      fetch('/api/session/token', {...Ajax.post, ...Ajax.json, body: JSON.stringify({absoluteToken})})
          .then((e) => e.json()).then((res) => {
        if (res.st === 'OK') {
          store.state.user = UserSession.cast(res.data);
          res.msg !== '' && localStorage.setItem('login-token', res.msg);
          this.amendPathInSession();
        } else {
          localStorage.removeItem('login-token');
        }
      });
    }
  }

  /**
   * logout
   * @param success
   */
  public static logout(success?: () => void) {
    fetch(`/api/session`, {...Ajax.delete, ...Ajax.json})
        .then((e) => e.json()).then((data) => {
      if (data.st === 'OK') {
        store.state.user = UserSession.cast(null);
        localStorage.removeItem('login-token');
        success && success();
      } else {
        throw Error();
      }
    }).catch((e) => alert('로그아웃에 실패하였습니다.\n다시 시도해주세요.'));
  }

  /**
   * sync user session info
   * @param result
   */
  public static sync(result?: (isLogin: boolean) => void) {
    fetch(`/api/session`, {...Ajax.get, ...Ajax.json})
        .then((e) => e.json()).then((data) => {
      data = (store.state.user = UserSession.cast(data));
      result && result(data.isLogin);
      this.amendPathInSession();
    });
  }

  /**
   * Verify that the current path is a valid location in session permissions, otherwise move the path.
   * 현재 경로가 세션 권한 내 올바른 위치인지 확인하고, 그렇지 않은 경우 경로를 이동시킨다.
   * @param path
   *   now path (null is location.pathname)
   *   현재 경로 (null 일경우 location.pathname)
   * @returns
   *   path is a valid location within session permissions
   *   경로가 세션 권한 내 올바른 위치인지 여부
   */
  public static amendPathInSession(path?: string): boolean {
    path = (path ? path : location.pathname) as string;

    if (store.state.user.isLogin) {
      if (path.startsWith('/login')) {
        const rp = location.search.replace(/^\?/, '').split('&')
            .map((e) => decodeURIComponent(e))
            .filter((e) => (/^rp=\/[a-z]+/).test(e))
            .map((e) => e.substring(3))
            .filter((e) => !e.startsWith('/register') && !e.startsWith('/lost'));
        router.push(rp.length === 0 ? '/' : rp[0]);
        return false;
      }
    } else {
      if (path.startsWith('/user')) {
        router.push('/');
        return false;
      }
    }
    return true;
  }

}
