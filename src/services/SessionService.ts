import UserSession from '@/models/UserSession';
import store from '@/store';
import router from '@/router';

export default class SessionService {
  /**
   * go to the login page
   */
  public static goToTheLoginPage() {
    const path = document.location.pathname;
    const search = document.location.search;
    if (path.length > 1) {
      router.push(`/login?rp=${encodeURIComponent(path + search)}`);
    } else {
      router.push('/login');
    }
  }
  /**
   * try logout
   * @param success if success callback
   */
  public static doLogout(success: () => void) {
    fetch('/api/auth/logout', {method: 'POST', credentials: 'same-origin'}).then((e) => e.text()).then((res) => {
      if (res === 'OK') {
        store.state.user = UserSession.cast(null);
        localStorage.removeItem('login-token');
        success();
      } else {
        throw Error();
      }
    }).catch((e) => alert('로그아웃에 실패하였습니다.\n다시 시도해주세요.'));
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
    const user = store.state.user;
    if (!path) {
      path = location.pathname;
    }

    if (path.startsWith('/manage') && !user.manager) {
      router.push('/');
      return false;
    }

    if (user.isLogin()) {
      if (path.startsWith('/login')) {
        const rp = location.search.replace(/^\?/, '').split('&')
          .map((e) => decodeURIComponent(e))
          .filter((e) => (/^rp\=\/[a-z]+/).test(e))
          .map((e) => e.substring(3))
          .filter((e) => !e.startsWith('/register') && !e.startsWith('/recover'));
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
  /**
   * try login
   * @param account account
   * @param password password
   * @param tokenLogin use login token - 1: use, 0: not
   * @param callback (is success, error message)
   */
  public static doLogin(
    account: string, password: string, tokenLogin: number, callback: (success: boolean, message: string) => void,
  ): void {
    if (account === '') {
      setTimeout(() => callback(false, '계정을 입력해주세요.'), 50);
      return;
    } else if (password === '') {
      setTimeout(() => callback(false, '암호를 입력해주세요.'), 50);
      return;
    } else if (tokenLogin === 1 && !confirm('정말로 자동로그인을 사용하시겠습니까?\n공공장소에서는 절대 사용하지 마십시오.')) {
      callback(false, '');
      return;
    }
    fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({account, password, tokenLogin}),
    }).then((e) => e.json()).then((res) => {
      if (res.code === 'OK') {
        store.state.user = UserSession.cast(res.data);
        if (res.msg !== '') {
          localStorage.setItem('login-token', res.msg);
        }
        callback(true, '');
      } else {
        callback(false, res.msg);
      }
    });
  }
  /**
   * try token login (auto login)
   * @returns if success callback
   */
  public static doTokenLogin() {
    const absoluteToken = localStorage.getItem('login-token');
    if (absoluteToken) {
      fetch('/api/auth/token-login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({absoluteToken}),
      }).then((e) => e.json()).then((res) => {
        if (res.code === 'OK') {
          store.state.user = UserSession.cast(res.data);
          if (res.msg !== '') {
            localStorage.setItem('login-token', res.msg);
          }
          this.amendPathInSession();
          return true;
        } else {
          localStorage.removeItem('login-token');
        }
      });
    }
    return false;
  }
  /**
   * sync login session to server
   * @param success if logined callback
   */
  public static syncLoginSession(result?: (isLogin: boolean) => void) {
    fetch('/api/auth/session', {
      method: 'POST',
      credentials: 'same-origin',
    }).then((e) => e.json()).then((res) => {
      if ((store.state.user = UserSession.cast(res)).isLogin()) {
        SessionService.amendPathInSession();
        if (result) {
          result(true);
          return;
        }
      }
      if (result) {
        result(false);
      }
    });
  }
}
