import Ajax from "@/utils/Ajax";
import Result from "@/models/Result";

export default class AccountService {

  public static register(email: string, password: string, passwordConfirm: string, name: string, callback: (result: Result<any>) => void): void {
    if (password !== passwordConfirm) {
      callback(new Result('FAIL', '암호가 서로 일치하지 않습니다.'));
      return;
    }
    fetch('/api/account/register', {
      ...Ajax.post, ...Ajax.json, body: JSON.stringify({email, password, name}),
    }).then((e) => e.json()).then((data) => callback(Result.assign(data)));
  }

  public static registerValidation(absoluteToken: string, callback: (result: Result<any>) => void): void {
    fetch('/api/account/register', {
      ...Ajax.put, ...Ajax.json, body: JSON.stringify({absoluteToken}),
    }).then((e) => e.json()).then((data) => callback(Result.assign(data)));
  }

  public static recover(email: string, name: string, callback: (result: Result<any>) => void): void {
    fetch('/api/account/recover', {
      ...Ajax.post, ...Ajax.json, body: JSON.stringify({email, name}),
    }).then((e) => e.json()).then((data) => callback(Result.assign(data)));
  }

  public static recoverValidation(absoluteToken: string, callback: (result: Result<any>) => void): void {
    fetch('/api/account/recover', {
      ...Ajax.put, ...Ajax.json, body: JSON.stringify({absoluteToken}),
    }).then((e) => e.json()).then((data) => callback(Result.assign(data)));
  }

  public static recoverPassword(absoluteToken: string, password: string, passwordConfirm: string, callback: (result: Result<any>) => void): void {
    if (password !== passwordConfirm) {
      callback(new Result('FAIL', '암호가 서로 일치하지 않습니다.'));
      return;
    }
    fetch('/api/account/recover/password', {
      ...Ajax.put, ...Ajax.json, body: JSON.stringify({absoluteToken, password}),
    }).then((e) => e.json()).then((data) => callback(Result.assign(data)));
  }

  public static recoverEmail(name: string, callback: (result: Result<any>) => void): void {
    if (name == '') {
      callback(new Result('FAIL', '닉네임을 입력해주세요.'));
      return;
    }
    fetch(`/api/account/recover/email/${name}`)
        .then((e) => e.json()).then((data) => callback(Result.assign(data)));
  }

  public static getUser(callback: (result: any) => void): void {
    fetch('/api/account/user').then(e => e.json()).then(e => callback(e));
  }

  public static updateUserPassword(oldPassword: string, newPassword: string, newPasswordConfirm: string, callback: (result: Result<any>) => void): void {
    if (newPassword !== newPasswordConfirm) {
      callback(new Result('FAIL', '새 암호가 서로 일치하지 않습니다.'));
      return;
    }
    fetch('/api/account/user/password', {
      ...Ajax.put, ...Ajax.json, body: JSON.stringify({oldPassword, newPassword}),
    }).then((e) => e.json()).then((data) => callback(Result.assign(data)));
  }

  public static updateUserName(password: string, name: string, callback: (result: Result<any>) => void): void {
    fetch('/api/account/user/name', {
      ...Ajax.put, ...Ajax.json, body: JSON.stringify({password, name}),
    }).then((e) => e.json()).then((data) => callback(Result.assign(data)));
  }
}
