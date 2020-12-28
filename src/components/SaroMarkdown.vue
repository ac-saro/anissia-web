<template>
  <div :class="'saro-md-wrap' + (fullScreen ? ' md-screen-full' : '')">
    <div class="saro-md">
      <div class="saro-md-tool">
        <i @click="onTool('screen')" title="화면모드" :class="`fas ${fullScreen ? 'fa-compress-arrows-alt' : 'fa-expand-arrows-alt'} i-right`"></i>
        <i @click="onTool('mode')" title="편집모드" class="fas fa-columns i-right"></i>
        <i @click="onTool('b')" title="강조" class="fas fa-bold"></i>
        <i @click="onTool('i')" title="기울임" class="fas fa-italic"></i>
        <i @click="onTool('s')" title="취소선" class="fas fa-strikethrough"></i>
        <i @click="onTool('a')" title="링크" class="fas fa-link"></i>
        <i @click="onTool('ul')" title="목록" class="fas fa-list-ul"></i>
        <i @click="onTool('ol')" title="순차목록" class="fas fa-list-ol"></i>
        <i @click="onTool('bq')" title="틀" class="fas fa-quote-left"></i>
        <i @click="onTool('hr')" title="경계선" class="fas fa-minus"></i>
        <i @click="onTool('table')" title="표" class="fas fa-table"></i>
        <i @click="onTool('h1')" title="헤드라인1" class="i-text">H1</i>
        <i @click="onTool('h2')" title="헤드라인2" class="i-text">H2</i>
        <i @click="onTool('h3')" title="헤드라인3" class="i-text">H3</i>
      </div>
    </div>
    <div :class="`saro-md saro-md-body ${editMode}-view`" :style="style">
      <textarea ref="textarea" class="md-edit" :value="modelValue" :placeholder="placeholder"
        @input="input($event)"
        @keydown.tab="onTab"
        @keydown.enter="onEnter"></textarea><div
      class="md-edit md-view content" v-html="render(modelValue)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    modelValue: String,
    height: String,
    placeholder: String
  },
  created() {
    this.style = `height:${this.height || '320px'}`;
  },
  emits: ['update:modelValue'],
  methods: {
    md()  {
      let md: any = (window as any)['markdown-it-core-md'];
      if (!md) {
        (window as any)['markdown-it-core-md'] = md = require('markdown-it')({
          html:         false,
          xhtmlOut:     false,
          breaks:       false,
          linkify:      false,
          typographer:  false,
          highlight(code: string, lang: string) { return code; },
        });
      }
      return md;
    },
    render(text: string): string {
      return (this.md().render(text) as string).split(/&lt;br[ ]?\/&gt;/g).join('<br/>');
    },
    input(event: Event) {
      this.$emit('update:modelValue', (event.target as any).value);
    },
    onTool(type: string) {
      const ta = (this.$refs as any).textarea;
      const sel = this.getSelect(ta);
      switch (type) {
        case 'b' :
          sel.prefix += '**';
          sel.select = sel.select || '강조';
          sel.postfix = '**' + sel.postfix;
          break;
        case 's' :
          sel.prefix += '-';
          sel.select = sel.select || '취소선';
          sel.postfix = '-' + sel.postfix;
          break;
        case 'i' :
          sel.prefix += '*';
          sel.select = sel.select || '기울임';
          sel.postfix = '*' + sel.postfix;
          break;
        case 'bq' :
          sel.prefix += '\n> ';
          sel.select = sel.select || '틀';
          break;
        case 'h1' :
          sel.prefix += '\n# ';
          sel.select = sel.select || '헤드라인 1';
          break;
        case 'h2' :
          sel.prefix += '\n## ';
          sel.select = sel.select || '헤드라인 2';
          break;
        case 'h3' :
          sel.prefix += '\n### ';
          sel.select = sel.select || '헤드라인 3';
          break;
        case 'ul' :
          sel.prefix += '\n- ';
          sel.select = sel.select || '목차';
          break;
        case 'ol' :
          sel.prefix += '\n1. ';
          sel.select = sel.select || '순서목차';
          break;
        case 'hr' :
          sel.prefix += '\n\n---\n';
          break;
        case 'a' :
          if (sel.select.startsWith('http://') || sel.select.startsWith('https://')) {
            sel.select = `[링크](${sel.select})`;
          } else {
            sel.select = '[링크](URL)';
          }
          break;
        case 'table' :
          sel.select = `\n|제목|제목|제목|\n|-|-|-|\n|내용|내용|내용|\n`;
          break;
        case 'screen' :
          this.fullScreen = !this.fullScreen;
          break;
        case 'mode' :
          switch (this.editMode) {
            case 'both': this.editMode = 'edit'; break;
            case 'edit': this.editMode = 'view'; break;
            case 'view': this.editMode = 'both'; break;
          }
          break;
      }
      this.setSelect(ta, sel);
      this.$emit('input', ta.value);
    },
    onTab(event: KeyboardEvent) {
      event.preventDefault();
      const ta = event.target as HTMLTextAreaElement;
      const sel = this.getSelect(ta);
      if (sel.select.indexOf('\n') === -1) {
        const sl = this.getSelectLine(ta);
        const slLine = sl.select;
        // pre: `- ` | `* ` | `+ `
        if ((/^\s*[+\-*] /).test(slLine) || (/^\s*1\. /).test(slLine)) {
          if (event.shiftKey) {
            sl.prefix += sl.select.replace(/\t/g, '    ').replace(/^[ ]{1,4}/, '');
            sl.select = '';
          } else {
            sl.prefix += '    ' + sl.select;
            sl.select = '';
          }
          this.setSelect(ta, sl);
        } else {
          sel.prefix += '    ';
          this.setSelect(ta, sel);
        }
      } else {
        const sl = this.getSelectLine(ta);
        if (event.shiftKey) {
          sl.select = sl.select.split('\n').map((e: string) => e.replace(/\t/g, '    ').replace(/^[ ]{1,4}/, '')).join('\n');
        } else {
          sl.select = sl.select.split('\n').map((e: string) => '    ' + e).join('\n');
        }
        this.setSelect(ta, sl);
      }
      this.input(event);
    },
    onEnter(event: Event) {
      const ta = event.target as HTMLTextAreaElement;
      const sel = this.getSelect(ta);
      const preline = sel.prefix.match(/[^\n]*$/)[0];
      // pre: `- ` | `* ` | `+ `
      if ((/^\s*[+\-*]{1} /).test(preline)) {
        event.preventDefault();
        // pre: `-`
        if ((/^\s*[+\-*]{1}\s*$/).test(preline)) {
          sel.prefix = sel.prefix.substring(0, sel.prefix.lastIndexOf('\n') + 1);
        } else {
          sel.prefix += `\n${preline.match(/^\s*[+\-*]{1} /)[0]}`;
        }
        sel.select = '';
        this.setSelect(ta, sel);
        this.input(event);
      } else if ((/^\s*1\. /).test(preline)) {
        event.preventDefault();
        // pre: `-`
        if ((/^\s*1\.\s*$/).test(preline)) {
          sel.prefix = sel.prefix.substring(0, sel.prefix.lastIndexOf('\n') + 1);
        } else {
          sel.prefix += `\n${preline.match(/^\s*1\. /)[0]}`;
        }
        sel.select = '';
        this.setSelect(ta, sel);
        this.input(event);
      } else if ((/^\s+/).test(preline)) {
        event.preventDefault();
        sel.prefix += `\n${preline.match(/^\s+/)[0]}`;
        sel.select = '';
        this.setSelect(ta, sel);
        this.input(event);
      }
    },
    getSelect(target: HTMLTextAreaElement): any {
      const ss = target.selectionStart;
      const se = target.selectionEnd;
      const v = target.value;
      return {
        prefix: v.substring(0, ss).replace(/(\r\n|\r)/g, '\n'),
        select: v.substring(ss, se).replace(/(\r\n|\r)/g, '\n'),
        postfix: v.substring(se).replace(/(\r\n|\r)/g, '\n'),
      };
    },
    getSelectLine(target: HTMLTextAreaElement): any {
      const ss = target.selectionStart;
      const se = target.selectionEnd;
      const v = target.value;
      const pre = v.lastIndexOf('\n', ss - 1);
      const post = v.indexOf('\n', se);
      return {
        prefix: (pre !== -1 ? v.substring(0, pre + 1) : '').replace(/(\r\n|\r)/g, '\n'),
        select: (v.substring(pre !== -1 ? pre + 1 : 0, post !== -1 ? post : v.length)).replace(/(\r\n|\r)/g, '\n'),
        postfix: (post !== -1 ? v.substring(post) : '').replace(/(\r\n|\r)/g, '\n'),
      };
    },
    setSelect(target: HTMLTextAreaElement, data: any) {
      target.value = data.prefix + data.select + data.postfix;
      target.setSelectionRange(data.prefix.length, data.prefix.length + data.select.length);
      target.focus();
    }
  }
})
export default class SaroMarkdown extends Vue {
  data() {
    return {
      style: '',
      fullScreen: false,
      editMode: 'both',
    };
  }
}
</script>

<style>
.saro-md > .md-edit {
  box-sizing: border-box; border:0; margin: 0; vertical-align: top;
  height:100%; padding:8px; font-size:15px; line-height: 1.8; resize: none
}
.saro-md.both-view > .md-edit { width:50%; display: inline-block; }
.saro-md.both-view > div { border-left:1px solid #ddd; }
.saro-md.edit-view > textarea { width:100%; }
.saro-md.edit-view > div,
.saro-md.view-view > textarea { display: none; }

.saro-md > .md-view { overflow-y:auto }
.saro-md .saro-md-tool { overflow:auto; border-bottom: 1px solid #eee }
.saro-md .saro-md-tool i {
  width: 38px; height: 38px; line-height: 38px; box-sizing: border-box; display: inline-block; text-align: center;
    color: #566c88; transition: color .3s; cursor: pointer; border-right: 1px solid #eee; font-size: 20px; vertical-align: top;
}
.saro-md .saro-md-tool i.i-right { float: right; border: 0; border-left: 1px solid #eee; }
.saro-md .saro-md-tool i.i-text { font-style: normal }
.saro-md .saro-md-tool i:hover { color: #c00 }

.saro-md-wrap.md-screen-full { z-index: 1000; position: fixed; top:0; left:0; right:0; bottom:0; background: #fff; }
.saro-md-wrap.md-screen-full .saro-md-body { height: calc(100% - 40px) !important; }
</style>
