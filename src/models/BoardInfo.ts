import UserSession from '@/models/UserSession';

export default class BoardInfo {
  public code = '';
  public writableRoles = [] as string[];
  public writablePostRoles = [] as string[];

  public isWritable(user: UserSession): boolean {
    return (this.code !== '' && user.isLogin()
      && ['ANY'].concat(user.roles).filter((e) => this.writableRoles.indexOf(e) !== -1).length > 0);
  }

  public isWritablePost(user: UserSession): boolean {
    return (this.code !== '' && user.isLogin()
      && ['ANY'].concat(user.roles).filter((e) => this.writablePostRoles.indexOf(e) !== -1).length > 0);
  }

  public get exist(): boolean {
    return this.code !== '';
  }
}
