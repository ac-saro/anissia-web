import AnissiaUtil from '@/utils/AnissiaUtil';

export default class AslModel {

  public static cast(object: any): AslModel {
    const rv = Object.assign(new AslModel(), object);
    rv.actDt = AnissiaUtil.ymdOrDynamicAgo(rv.actDt);
    if (rv.cmd !== 'html') {
      rv.data1 = rv.data1 ? JSON.parse(rv.data1) : null;
      rv.data2 = rv.data2 ? JSON.parse(rv.data2) : null;
      rv.data3 = rv.data3 ? JSON.parse(rv.data3) : null;
    }
    return rv;
  }

  public cpNo = 0;
  public pub = false;
  public active = false;
  public cmd = '';
  public status = '';
  public data1 = '' as any;
  public data2 = '' as any;
  public data3 = '' as any;
  public actDt = '';
}
