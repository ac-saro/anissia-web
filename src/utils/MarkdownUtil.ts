/**
 * markdown Util
 */
export default class MarkdownUtil {
  public static md = require('markdown-it')({
    html:         false,
    xhtmlOut:     false,
    breaks:       true,
    linkify:      false,
    typographer:  false,
    highlight(code: string, lang: string) { return "코드를 지원하지 않습니다."; },
  });

  public static render(text: string): string {
    return MarkdownUtil.md.render(text) as string;
  }
}
