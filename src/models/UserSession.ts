export default class UserSession {
  public static cast(obj: any): UserSession {
    return obj !== null ? Object.assign(new UserSession(), obj) : new UserSession();
  }

  public account = '';
  public name = '';
  public roles = [] as string[];

  public manager = false;
  public admin = false;

  public isLogin() {
    return this.account ? true : false;
  }

  // public hasRole(...roles: string[]): boolean {
  //   for (const role of roles) {
  //     if (this.roles.indexOf(role) !== -1) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
}
