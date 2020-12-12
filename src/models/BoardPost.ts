import AnissiaUtil from '@/utils/AnissiaUtil';

export default class BoardPost {

  public static cast(object: any): BoardPost {
    const rv = Object.assign(new BoardPost(), object);
    rv.regDt = AnissiaUtil.ymdOrDynamicAgo(rv.regDt);
    return rv;
  }

  public brn = 0;
  public bn = 0;
  public topic = false;
  public content = '';
  public regDt = '';
  public name = '';

  public isView = true;
}
