import UserInfo from '@/models/UserInfo';

export default class UserService {
  public static info(callback: (userInfo: UserInfo) => void) {
    fetch('/api/user/info', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
    }).then((e) => e.json()).then((result) => callback(Object.assign(new UserInfo(), result)));
  }

  public static updateInfo(
      password: string, passwordConfirm: string, birth: string, name: string,
      callback: (pass: boolean, msg: string) => void) {
    if (birth === '') {
      setTimeout(() => callback(false, '생일을 입력해주세요.\n'), 50);
      return;
    } else if (name.length < 2) {
      setTimeout(() => callback(false, '이름을 2자 이상 입력해주세요.'), 50);
      return;
    }

    if ((password + passwordConfirm).length > 0) {
      if (password.length < 8) {
        setTimeout(() => callback(false, '암호는 8자 이상으로 입력해주세요.'), 50);
        return;
      } else if (password !== passwordConfirm) {
        setTimeout(() => callback(false, '암호와 확인이 일치하지 않습니다.'), 50);
        return;
      }
    }

    fetch('/api/user/edit', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({password, birth, name}),
    }).then((e) => e.json()).then((res) => {
      callback(res.code === 'OK', res.msg);
    });
  }
}
