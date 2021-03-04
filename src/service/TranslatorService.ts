import AnissiaUtil from "@/utils/AnissiaUtil";
import {DateFormat} from "@/utils/nabi/DateFormat";
import PageData from "@/models/PageData";
import Result from "@/models/Result";
import Ajax from "@/utils/Ajax";

export default class TranslatorService {

  public static getApplyList(page: number, callback: (data: PageData<any>) => void): void {
    fetch(`/api/translator/apply/list/${page}`).then(e => e.json()).then(data => callback(PageData.cast(data, e => TranslatorService.bindApply(e))));
  }

  public static getApply(applyNo: number, callback: (data: any) => void): void {
    fetch(`/api/translator/apply/applyNo/${applyNo}`).then(e => e.json()).then(data => callback(TranslatorService.bindApply(data)));
  }

  public static createApply(website: string, callback: (data: Result<number>) => void): void {
    fetch(`/api/translator/apply`, { ...Ajax.post, ...Ajax.json, body: JSON.stringify({website}) })
        .then(e => e.json()).then(data => callback(Result.assign(data)));
  }

  public static bindApply(e: any) {
    e.regDyText = AnissiaUtil.ymdOrDynamicAgo(e.regDt);
    e.regDtText = e.regDt.replace('T', ' ');
    switch (e.result) {
      case 'ACT': e.resultText = '진행'; break;
      case 'PASS': e.resultText = '수리'; break;
      case 'FAIL': e.resultText = '반려'; break;
    }
    return e;
  }
}
