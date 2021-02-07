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

}
