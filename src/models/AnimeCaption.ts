export default class AnimeCaption {
  public updDt = '';
  public website = '';
  public name = '';

  private inEpisode = '';

  public get episode(): string {
    return this.inEpisode !== '0' ? `${this.inEpisode}화` : '';
  }
  public set episode(episode: string) {
    this.inEpisode = episode;
  }

  public get isoUpdDt(): string {
    return `${this.updDt.replace(' ', 'T')}+09:00`;
  }
}
