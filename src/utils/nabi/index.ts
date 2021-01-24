/**
 * Nabi library
 * 2019-08-24 Yong Seo PARK : create
 */

import { Address } from './Address';
import { DateFormat } from './DateFormat';

export default class Nabi {
  /**
   * find out first query matched parents and return query from the element
   * if does not find out matched parents until root Element; return '' (empty string)
   * @param element begin childe HTMLElement
   * @param matchQueries parants dom queries for matching and return query
   */
  public static matchesParents(element: HTMLElement | Element | EventTarget | null, matchQueries: string[]): string {
    let dom: HTMLElement | null = (element as HTMLElement) || null;
    while (dom) {
      for (const query of matchQueries) {
        if (dom.matches(query)) {
          return query;
        }
      }
      dom = dom.parentElement;
    }
    return '';
  }

  /**
   * is valid email format
   * @param email target email adress
   * @param length limit length
   */
  public static isEmail(email: string, length?: number): boolean {
    if (length && email.length > length) {
      return false;
    }
    return (/^[_a-z0-9-]+(\.[_a-z0-9-])*@([_a-z0-9-]+\.)+[a-z]{2,}$/).test(email);
  }

  public static zerofill(no: number, length: number): string {
    const m = no < 0;
    const rv = (m ? (no * -1) : no).toString();
    const dif = length - rv.length;
    let zero = '';
    if (dif > 0) {
      for (let i = 0 ; i < dif ; i++) {
        zero += '0';
      }
    }
    return (m ? '-' : '') + zero + rv;
  }

  /**
   * iso 8601 date format
   */
  public static isoDateFormat(isoDate: string, format: string): string {
    return Nabi.dateFormat().parseIsoDate(isoDate).format(format);
  }

  public static dateFormat(date?: Date) {
    return new DateFormat(date);
  }

  public static validDateFormat(date: string, format: string): boolean {
    return new DateFormat().parse(date, format).format(format) === date;
  }

  public static nowTimezone() {
    const tm = new Date().getTimezoneOffset() * -1;
    const h = Math.floor(Math.abs(tm) / 60);
    const m = Math.abs(tm) - (h * 60);

    if (tm >= 0) {
      return `+${Nabi.zerofill(h, 2)}:${Nabi.zerofill(m, 2)}`;
    } else if (tm < 0) {
      return `-${Nabi.zerofill(h, 2)}:${Nabi.zerofill(m, 2)}`;
    }
  }

  public static address(setNowAddress = true): Address {
    return new Address(setNowAddress);
  }

  public static enHtml(text: string): string {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }
}
