import PageData from "@/models/PageData";
import Result from "@/models/Result";
import AnissiaUtil from "@/utils/AnissiaUtil";
import Ajax from "@/utils/Ajax";
import Nabi from "@/utils/nabi";
import AnimeService from "@/service/AnimeService";

export default class ActivePanelService {

  public static getList(page: number, mode: string, callback: (data: PageData<any>) => void): void {
    fetch(`/api/active-panel/list/${page}?mode=${mode}`).then(e => e.json()).then(data => {
      data.content.forEach((e: any) => {
        e.regDtText = AnissiaUtil.ymdOrDynamicAgo(e.regDt);
        if (e.code == 'TEXT') {
          e.html = ActivePanelService.toHtml(e.data1)
        } else if (e.code == 'ANIME') {
          e.html = ActivePanelService.toHtml(e.data1)
          if (e.status == 'U') {
            const d2 = AnimeService.bindInfo(eval(`(${e.data2})`));
            const d3 = AnimeService.bindInfo(eval(`(${e.data3})`));
            e.moreInfo = [];
            const ids = [['subject', '제목'], ['statusText', '상태'], ['weekText', '요일'], ['time', '시간'], ['genres', '장르'], ['startDate', '시작일'], ['endDate', '종료일'], ['website', '웹사이트']]
            for (const id of ids) {
              const name = id[0];
              if (d2[name] != d3[name]) {
                e.moreInfo.push({t: id[1], o: d2[name] || '-', n: d3[name] || '-'});
              }
            }
            if (e.moreInfo.length > 0) { e.more = 0; }
          }
        }
      });
      callback(PageData.cast(data))
    });
  }

  public static addNotice(text: string, callback: (result: Result<void>) => void): void {
    text = text.trim();
    let published = false;
    if (text.length < 10) {
      callback(new Result("FAIL", "글자는 10글자 이상 입력해주세요."))
      return;
    }
    if (text.startsWith('!')) {
      published = true;
      text = text.substring(1).trim();
    }
    fetch(`/api/active-panel/notice`, {...Ajax.json, ...Ajax.post, body: JSON.stringify({text, published})})
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }


  private static toHtml(text: string) {
    const t = Nabi.enHtml(text);
    if (t.split('[').length == t.split(']').length) {
      return t.replace(/\[/g, '<b>').replace(/\]/g, '</b>');
    } else {
      return t;
    }
  }

}
