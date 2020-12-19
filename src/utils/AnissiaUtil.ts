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
