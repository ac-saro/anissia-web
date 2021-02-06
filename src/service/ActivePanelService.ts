import PageData from "@/models/PageData";
import Result from "@/models/Result";
import AnissiaUtil from "@/utils/AnissiaUtil";
import Ajax from "@/utils/Ajax";
import Nabi from "@/utils/nabi";

export default class ActivePanelService {

  public static getList(page: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/active-panel/list/${page}`).then(e => e.json()).then(data => {
      data.content.forEach((e: any) => {
        e.regDtText = AnissiaUtil.ymdOrDynamicAgo(e.regDt);
        if (e.code == 'TEXT') {
          e.html = ActivePanelService.toHtml(e.data1)
        } else if (e.code == 'ANIME') {
          e.html = ActivePanelService.toHtml(e.data1)
          if (e.status == 'U') {
            e.data2 = eval(`(${e.data2})`);
            e.data3 = eval(`(${e.data3})`);
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
