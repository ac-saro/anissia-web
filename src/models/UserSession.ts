export default class UserSession {
  public static cast(obj: any): UserSession {
    return obj !== null ? Object.assign(new UserSession(), obj) : new UserSession();
  }

  public name = '';
  public roles = [] as string[];

  public get isLogin() {
    return this.name != '' ? true : false;
  }

  public get isRoot() {
    return this.hasRole('ROOT');
  }

  public get isAdmin() {
    return this.hasRole('ROOT', 'TRANSLATOR');
  }

  public hasRole(...roles: string[]) {
    for (let i = 0 ; i < roles.length ; i++) {
      if (this.roles.indexOf(roles[i]) != -1) {
        return true;
      }
    }
    return false;
  }
}
