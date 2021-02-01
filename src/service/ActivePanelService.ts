import PageData from "@/models/PageData";
import Result from "@/models/Result";
import AnissiaUtil from "@/utils/AnissiaUtil";

export default class ActivePanelService {

  public static getList(page: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/active-panel/list/${page}`).then(e => e.json()).then(data => {
      data.content.forEach((e: any) => { e.regDtText = AnissiaUtil.ymdOrDynamicAgo(e.regDt) });
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
    fetch(`/api/active-panel/notice`, {
      headers: [['Content-Type', 'application/json']],
      method: 'POST',
      body: JSON.stringify({text, published})
    })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

}
