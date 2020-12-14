export default class UserSession {
  public static cast(obj: any): UserSession {
    return obj !== null ? Object.assign(new UserSession(), obj) : new UserSession();
  }

  public name = '';
  public roles = [] as string[];

  public isLogin() {
    return this.name ? true : false;
  }
}
