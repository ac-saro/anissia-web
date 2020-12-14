import Nabi from '@/utils/nabi';
/**
 * Anissia Util
 */
export default class AnissiaUtil {

  /**
   * date to ymd or dynamic ago
   * @param date date
   */
  public static ymdOrDynamicAgo(isoDate: string): string {
    return AnissiaUtil.formatOrDynamicAgo(isoDate, 'yyyy-MM-dd');
  }

  public static animeIsEnded(endDate: string): boolean {
    const today = new Date().toISOString().substring(0, 10); // ex) 1988-10-17
    return endDate !== '0000-00-00' && today.localeCompare(endDate) > 0;
  }

  public static formatOrDynamicAgo(isoDate: string, format: string): string {
    if (isoDate == null) {
      return '';
    }
    const date = Nabi.dateFormat().parseIsoDate(isoDate).toDate();
    let time = Math.floor(date.getTime() / 1000);
    let now = Math.floor(new Date().getTime() / 1000);
    if ((time + 60) > now) { // in 60 seconds
      return `${now - time}초 전`;
    }
    now = Math.floor(now / 60);
    time = Math.floor(time / 60);
    if ((time + 60) > now) { // in 60 minutes
      return `${now - time}분 전`;
    }
    now = Math.floor(now / 60);
    time = Math.floor(time / 60);
    if ((time + 24) > now) { // in 24 hours
      return `${now - time}시간 전`;
    }
    now = Math.floor(now / 24);
    time = Math.floor(time / 24);
    if ((time + 30) > now) { // in 24 hours
      return `${now - time}일 전`;
    }
    return Nabi.dateFormat(date).format(format);
  }
}
