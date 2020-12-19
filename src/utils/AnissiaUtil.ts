import Nabi from '@/utils/nabi';
import {DateFormat} from "@/utils/nabi/DateFormat";
/**
 * Anissia Util
 */
export default class AnissiaUtil {

  /**
   * pure week: 0:sun,1:mon...6:sat
   * week extension: 7:other, 8:new
   */
  public static isPureWeek(week: number): boolean {
    return [7, 8].indexOf(week) === -1;
  }

  public static getSubjectPrefix(week: string, status: string, startDate: string, endDate: string) {
    const today = new DateFormat().format("yyyy-MM-dd"); // ex) 1988-10-17
    if (AnissiaUtil.isPureWeek(Number(week))) { // is not status
      if (status === 'OFF') { // is not status
        return '결방';
      } else if (today.localeCompare(startDate) <= 0) { // not yet start anime
        return startDate;
      } else if (AnissiaUtil.animeIsEnded(endDate)) { // anime end
        return '完';
      }
    }
    return '';
  }

  /**
   * date to ymd or dynamic ago
   * @param date date
   */
  public static ymdOrDynamicAgo(isoDate: string): string {
    return AnissiaUtil.formatOrDynamicAgo(isoDate, 'yyyy-MM-dd');
  }

  public static animeIsEnded(endDate: string): boolean {
    const today = new DateFormat().format("yyyy-MM-dd"); // ex) 1988-10-17
    return endDate !== '' && today.localeCompare(endDate) >= 0;
  }

  public static animePeriod(week: string, startDate: string, endDate: string): string {
    if (startDate !== '' || endDate !== '') {
      const sd = startDate.replace(/-99/g, '');
      const ed = endDate.replace(/-99/g, '');
      let rv = '';
      if (sd && ed) { // exist both
        rv = sd === ed ? sd : `${sd} ~ ${ed}`;
      } else { // exist only one side
        rv = sd + ed;
        if (AnissiaUtil.isPureWeek(Number(week)) && sd) { // is day and exsit only start date
          rv += ' ~ 진행중';
        }
      }
      // change date format : yyyy-MM-dd -> yyyy년 MM월 dd일
      return (`${rv} `
          .replace(/([\d]{4})-([\d]{2})-([\d]{2})/g, '$1년 $2월 $3일')
          .replace(/([\d]{4})-([\d]{2})/g, '$1년 $2월')
          .replace(/([\d]{4}) /g, '$1년'))
          .trim();
    }
    return '';
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
