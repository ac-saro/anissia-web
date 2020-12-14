export default class AccountService {

  public static joinApply(email: string, password: string, passwordConfirm: string, name: string, callback: (success: boolean, message: string) => void): void {
    if (email === '') {
      callback(false, '계정(이메일)을 입력해주세요.');
      return;
    } else if (password === '') {
      callback(false, '암호를 입력해주세요.');
      return;
    } else if (password !== passwordConfirm) {
      callback(false, '암호가 서로 일치하지 않습니다.');
      return;
    } else if (name === '') {
      callback(false, '이름을 입력해주세요.');
      return;
    }

    fetch('/api/account/join/apply', {
      method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password, name}),
    }).then((e) => e.json()).then((res) => callback(res.st === 'OK', res.msg));
  }


}
