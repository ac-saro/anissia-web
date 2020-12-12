import AnissiaUtil from '@/utils/AnissiaUtil';
import BoardTopic from '@/models/BoardTopic';
import BoardPost from '@/models/BoardPost';

export default class BoardContent extends BoardTopic {

  public static cast(object: any): BoardContent {
    const rv = Object.assign(new BoardContent(), object);
    rv.regDt = AnissiaUtil.ymdOrDynamicAgo(rv.regDt);
    rv.posts = rv.posts.map((e: any) => BoardPost.cast(e));
    return rv;
  }

  public content = '';
  public posts = [] as BoardPost[];

  public get exist(): boolean {
    return this.bn > 0;
  }

  public isView = true;
}
