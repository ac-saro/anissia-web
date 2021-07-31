/**
 * markdown Util
 */
export default class MarkdownUtil {
  public static md = require('markdown-it')({
    html:         false,
    xhtmlOut:     false,
    breaks:       false,
    linkify:      false,
    typographer:  false,
    highlight(code: string, lang: string) { return "코드를 지원하지 않습니다."; },
  });

  public static render(text: string): string {
    const rv = (MarkdownUtil.md.render(text) as string)
      .split(/&lt;br[ ]?\/&gt;/g).join('<br/>')
      .replace(/[\r]+/g, "")
      .split(/[\n]{1,2}/g).join('<br/>');
    return rv;
  }
}
