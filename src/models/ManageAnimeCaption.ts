import Nabi from '@/utils/nabi';

export default class ManageAnimeCaption {
  public static cast(object: any): ManageAnimeCaption {
    const rv = Object.assign(new ManageAnimeCaption(), object);
    const ad = Nabi.isoDateFormat(rv.updDt, 'yyyyMMdd HHmmss').split(/ /);
    rv.adYmd = ad[0];
    rv.adHms = ad[1];
    return rv;
  }

  public an = 0;
  public updDt = '';
  public website = '';
  public name = '';
  public subject = '';
  public episode = '';
  public adYmd = '';
  public adHms = '';
}
