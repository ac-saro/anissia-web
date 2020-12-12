type Callback = (success: boolean, message: string) => void;

export default class AccountService {

  public static requestMailAuthForAccountRecover(
      account: string, birth: string, callback: Callback) {
    fetch('/api/lobby/recover/request-mail-auth', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({account, birth}),
    }).then((e) => e.json()).then((res) => callback(res.code === 'OK', res.msg || ''));
  }

  public static verifyMailAuthForAccountRecover(absoluteToken: string, callback: Callback) {
    fetch('/api/lobby/recover/verify-mail-auth', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({absoluteToken}),
    }).then((e) => e.json()).then((res) => callback(res.code === 'OK', res.msg || ''));
  }

  public static changePasswordForAccountRecover(
      absoluteToken: string, password: string, passwordConfirm: string, callback: Callback) {
    if (password.length < 8) {
      setTimeout(() => callback(false, '암호는 8자 이상으로 입력해주세요.'), 50);
      return;
    }
    if (password !== passwordConfirm) {
      setTimeout(() => callback(false, '암호와 확인이 일치하지 않습니다.'), 50);
      return;
    }
    fetch('/api/lobby/recover/change-password', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({absoluteToken, password}),
    }).then((e) => e.json()).then((res) => callback(res.code === 'OK', res.msg || ''));
  }

  public static requestAccountRegistration(
      account: string, password: string, passwordConfirm: string, birth: string, name: string, callback: Callback) {
    if (account === '') {
      setTimeout(() => callback(false, '계정을 입력해주세요.'), 50);
      return;
    } else if (password.length < 8) {
      setTimeout(() => callback(false, '암호는 8자 이상으로 입력해주세요.'), 50);
      return;
    } else if (password !== passwordConfirm) {
      setTimeout(() => callback(false, '암호와 확인이 일치하지 않습니다.'), 50);
      return;
    } else if (name.length < 2) {
      setTimeout(() => callback(false, '이름을 2자 이상 입력해주세요.'), 50);
      return;
    }
    fetch('/api/lobby/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({account, password, birth, name}),
    }).then((e) => e.json()).then((res) => callback(res.code === 'OK', res.msg || ''));
  }

  public static verifyMailAuthAccountRegistration(absoluteToken: string, callback: Callback) {
    fetch('/api/lobby/register/verify-mail-auth', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({absoluteToken}),
    }).then((e) => e.json()).then((res) => callback(res.code === 'OK', res.msg || ''));
  }
}
