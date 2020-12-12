import AnissiaUtil from '@/utils/AnissiaUtil';

export default class AnimeTimetable {
  public bcType: string = '';
  public an: number = 0;
  public ongoing: number = 0;
  public subject: string = '';
  public startDate: string = '';
  public endDate: string = '';
  public website: string = '';

  private inGenres: string = '';
  private inBcTimeOrDate: string = '';

  public get genres(): string {
    return this.inGenres.replace(/\,/g, ' / ');
  }
  public set genres(genres: string) {
    this.inGenres = genres;
  }

  public get bcTimeOrDate(): string {
    return this.day ? this.inBcTimeOrDate : this.inBcTimeOrDate.replace(/\-/g, '.');
  }
  public set bcTimeOrDate(bcTimeOrDate: string) {
    this.inBcTimeOrDate = bcTimeOrDate;
  }

  public get day(): boolean {
    return AnissiaUtil.bcTypeIsDay(Number(this.bcType));
  }

  public get prefix(): string {
    return (AnissiaUtil
      .animeSubjectPrefix(this.bcType, this.ongoing, this.startDate, this.endDate))
      .replace(/[\d]{4}\-/, '').replace('-', '/');
  }

  public get period(): string {
    return AnissiaUtil.animePeriod(this.bcType, this.startDate, this.endDate);
  }
}
