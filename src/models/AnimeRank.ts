export default class AnimeRank {
  public an: number = 0;
  public ranking: number = 0;
  public prevRanking: number = 0;
  public subject: string = '';
  public genres: string = '';

  public genreList(): string[] {
    return this.genres ? this.genres.split(/\,/g) : [];
  }

  public change(): number {
    return Math.abs(this.prevRanking - this.ranking);
  }

  public changeStatus(): string {
    if (this.prevRanking === 0) {
      return 'new';
    }
    const change = this.prevRanking - this.ranking;
    if (change > 0) {
      return 'up';
    } else if (change < 0) {
      return 'down';
    }
    return '';
  }
}
