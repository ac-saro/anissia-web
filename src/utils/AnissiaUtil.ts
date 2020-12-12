import Nabi from '@/utils/nabi';
import BoardTopic from '@/models/BoardTopic';
/**
 * Anissia Util
 */
export default class AnissiaUtil {

  /**
   * bcType (broadcast type) is day?
   * day: 0:sun,1:mon...6:sat
   * unday: 7:other, 8:new
   * @param bcType broadcast type
   */
  public static bcTypeIsDay(bcType: number): boolean {
    return [7, 8].indexOf(bcType) === -1;
  }

  /**
   * date to ymd or dynamic ago
   * @param date date
   */
  public static ymdOrDynamicAgo(isoDate: string): string {
    return AnissiaUtil.formatOrDynamicAgo(isoDate, 'yyyy-MM-dd');
  }

  public static animeSubjectPrefix(bcType: string, ongoing: number, startDate: string, endDate: string) {
    const today = new Date().toISOString().substring(0, 10); // ex) 1988-10-17
    if (AnissiaUtil.bcTypeIsDay(Number(bcType))) { // is not ongoing
      if (ongoing === 0) { // is not ongoing
        return '결방';
      } else if (today.localeCompare(startDate) < 0) { // not yet start anime
        return startDate;
      } else if (AnissiaUtil.animeIsEnded(endDate)) { // anime end
        return '完';
      }
    }
    return '';
  }

  public static animeIsEnded(endDate: string): boolean {
    const today = new Date().toISOString().substring(0, 10); // ex) 1988-10-17
    return endDate !== '0000-00-00' && today.localeCompare(endDate) > 0;
  }

  public static animePeriod(bcType: string, startDate: string, endDate: string): string {
    if (startDate !== '0000-00-00' || endDate !== '0000-00-00') {
      const sd = startDate.replace('0000-00-00', '').replace(/\-99/g, '').replace('2099', '');
      const ed = endDate.replace('0000-00-00', '').replace(/\-99/g, '').replace('2099', '');
      let rv = '';
      if (sd && ed) { // exist both
        rv = sd === ed ? sd : `${sd} ~ ${ed}`;
      } else { // exist only one side
        rv = sd + ed;
        if (AnissiaUtil.bcTypeIsDay(Number(bcType)) && sd) { // is day and exsit only start date
            rv += ' ~ 진행중';
        }
      }
      // change date format : yyyy-MM-dd -> yyyy년 MM월 dd일
      return (`${rv} `
        .replace(/([\d]{4})\-([\d]{2})\-([\d]{2})/g, '$1년 $2월 $3일')
        .replace(/([\d]{4})\-([\d]{2})/g, '$1년 $2월')
        .replace(/([\d]{4}) /g, '$1년'))
        .trim();
    }
    return '';
  }

  public static formatOrDynamicAgo(isoDate: string, format: string): string {
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
