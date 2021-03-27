/**
 * markdown Util
 */
import mdi from 'markdown-it/dist/markdown-it.js'

export default class MarkdownUtil {
  public static md = mdi({
    html:         false,
    xhtmlOut:     false,
    breaks:       false,
    linkify:      false,
    typographer:  false,
    highlight(code: string, lang: string) { return code; },
  });

  public static render(text: string): string {
    return (MarkdownUtil.md.render(text) as string).split(/&lt;br[ ]?\/&gt;/g).join('<br/>');
  }
}
