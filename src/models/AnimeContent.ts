import AnimeCaption from '@/models/AnimeCaption';
import AnimeSummary from '@/models/AnimeSummary';

export default class AnimeContent extends AnimeSummary {
  public website = '';
  public captions = [] as AnimeCaption[];

  public get exist(): boolean {
    return this.an > 0;
  }
}
