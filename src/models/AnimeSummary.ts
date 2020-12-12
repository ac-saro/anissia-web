import AnissiaUtil from '@/utils/AnissiaUtil';

export default class AnimeSummary {
  public an = 0;
  public status = 0;
  public ongoing = 0;
  public bcType = '';
  public bcTime = '';
  public subject = '';
  public genres = '';
  public startDate = '';
  public endDate = '';

  public get bcTimeOrDate(): string {
    return this.day ? this.bcTime : this.startDate.replace(/\-/g, '.');
  }

  public get day(): boolean {
    return AnissiaUtil.bcTypeIsDay(Number(this.bcType));
  }

  public get prefix(): string {
    return AnissiaUtil.animeSubjectPrefix(this.bcType, this.ongoing, this.startDate, this.endDate);
  }

  public get period(): string {
    return AnissiaUtil.animePeriod(this.bcType, this.startDate, this.endDate);
  }
}
