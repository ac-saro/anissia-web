import AnissiaUtil from '@/utils/AnissiaUtil';
import Nabi from '@/utils/nabi';

export default class BoardTopic {

  public static cast(object: any): BoardTopic {
    const rv = Object.assign(new BoardTopic(), object);
    rv.regDt = AnissiaUtil.ymdOrDynamicAgo(rv.regDt);
    return rv;
  }

  public bn = 0;
  public code = '';
  public subject = '';
  public regDt = '';
  public postCount = 0;
  public name = '';

  public get url(): string {
    return Nabi.address().setPathname(`/${this.code}`).clearParameter().addParameter('view', this.bn).href;
  }
}
