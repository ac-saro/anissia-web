<template>
  <div class="color-picker-closer-area" @click="closerColorPicker">
    <div class="basic-layout">
      <div class="basic-layout-left">
        <div class="base-mat">
          <LatestDocs />
        </div>
      </div>
      <div class="basic-layout-right">
        <div class="base-mat">
          <RankBoard />
        </div>
      </div>
      <div id="schedule" class="basic-layout-main">
        <div class="base-mat">

          <!----------------------------------------------------- 애니편성표 소스 생성기 [시작] ----------------------------------------------------->

          <div style="padding:2px 0 0; overflow: auto">
            <div style="float:left">애니편성표: <a href="/schedule/2015" target="_blank">바로가기</a> | <a href="/schedule/2009" target="_blank">구버전</a> | <router-link to="/introduce">연혁</router-link></div>
            <div style="text-align: right" class="mob-hide">제작 : <a href="https://gs.saro.me" target="_blank">가리사니</a></div>
          </div>
          <div class="html-gen">
            <div class="tool-preview">
              <iframe v-if="mode === 'html'" class="preview-border" src="/schedule/2015" ref="html" :width="htmlWidth" :height="htmlHeight"></iframe>
              <div v-else-if="mode === 'img'" class="preview-img preview-border" :style="{width: `${img.width}px`}">
asdf
              </div>
            </div>
            <div class="tool">
              <div class="tool-title">소스타입</div>
              <div><label title="일반적으로 html 이 가능한 모든 사이트에 삽입 가능"> <input type="radio" name="schedule-mode" v-model="mode" value="html" /> HTML</label></div>
              <div><label title="네이버 블로그 처럼 html이 금지된 경우 사용."> <input type="radio" name="schedule-mode" v-model="mode" value="img" /> 이미지 (블로그 위젯)</label></div>

              <div v-if="mode === 'html'" >
                <div class="tool-title">색상 (A:활성)</div>
                <div class="line">
                  <div class="label">배경</div>
                  <div v="htmlBgLight" :style="`background:#${htmlBgLight}`" @click="openColorPicker" class="color"></div>
                  <div class="color blank"></div>
                  <div v="htmlBgDark" :style="`background:#${htmlBgDark}`" @click="openColorPicker" class="color"></div>
                  <div class="color blank"></div>
                </div>
                <div class="line">
                  <div class="label">제목</div>
                  <div v="htmlTitleBgLight" :style="`background:#${htmlTitleBgLight}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlTitleLight" :style="`background:#${htmlTitleLight}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlTitleBgDark" :style="`background:#${htmlTitleBgDark}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlTitleDark" :style="`background:#${htmlTitleDark}`" @click="openColorPicker" class="color"></div>
                </div>
                <div class="line">
                  <div class="label">네비</div>
                  <div v="htmlNavBgLight" :style="`background:#${htmlNavBgLight}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlNavLight" :style="`background:#${htmlNavLight}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlNavBgDark" :style="`background:#${htmlNavBgDark}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlNavDark" :style="`background:#${htmlNavDark}`" @click="openColorPicker" class="color"></div>
                </div>
                <div class="line">
                  <div class="label">네비A</div>
                  <div v="htmlNavActBgLight" :style="`background:#${htmlNavActBgLight}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlNavActLight" :style="`background:#${htmlNavActLight}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlNavActBgDark" :style="`background:#${htmlNavActBgDark}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlNavActDark" :style="`background:#${htmlNavActDark}`" @click="openColorPicker" class="color"></div>
                </div>
                <div class="line">
                  <div class="label">목록</div>
                  <div v="htmlListBgLight" :style="`background:#${htmlListBgLight}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlListLight" :style="`background:#${htmlListLight}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlListBgDark" :style="`background:#${htmlListBgDark}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlListDark" :style="`background:#${htmlListDark}`" @click="openColorPicker" class="color"></div>
                </div>
                <div class="line">
                  <div class="label">목록A</div>
                  <div v="htmlListActBgLight" :style="`background:#${htmlListActBgLight}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlListActLight" :style="`background:#${htmlListActLight}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlListActBgDark" :style="`background:#${htmlListActBgDark}`" @click="openColorPicker" class="color"></div>
                  <div v="htmlListActDark" :style="`background:#${htmlListActDark}`" @click="openColorPicker" class="color"></div>
                </div>
                <div class="line">
                  <div class="label">접두어</div>
                  <div v="htmlPrefixLight" :style="`background:#${htmlPrefixLight}`" @click="openColorPicker" class="color"></div>
                  <div class="color blank"></div>
                  <div v="htmlPrefixDark" :style="`background:#${htmlPrefixDark}`" @click="openColorPicker" class="color"></div>
                  <div class="color blank"></div>
                </div>
                <div class="tool-title">크기</div>
                <div class="line">
                  <input type="number" min="180" max="900" v-model="htmlWidth"/>
                  <input type="range" min="180" max="900" step="10" v-model="htmlWidth" />
                </div>
                <div class="line">
                  <input type="number" min="240" max="780"  v-model="htmlHeight"/>
                  <input type="range" min="240" max="780" step="10" v-model="htmlHeight">
                </div>

                <div class="tool-title">소스코드</div>
                <textarea readonly="readonly" v-model="htmlCode"></textarea>
              </div>
              <div v-else-if="mode === 'img'" >

              </div>



            </div>
          </div>
          <!----------------------------------------------------- 애니편성표 소스 생성기 [종료] ----------------------------------------------------->
          <div class="doc-title">서드파티</div>
          <div class="doc-desc">
            <table class="schedule-table schedule-application">
              <!-- ios -->
              <tr>
                <th><img src="@/assets/page/schedule-th-ios.svg" title="ios" class="pmark" /></th>
                <td><a href="https://apps.apple.com/kr/app/aeni-pyeonseongpyo/id917536862" target="_blank">애니 편성표</a></td>
                <th>Young Ho Kim</th>
                <td>2014년</td>
              </tr>
              <!-- android -->
              <tr>
                <th><img src="@/assets/page/schedule-th-android.svg" title="android" class="pmark" /></th>
                <td style="color:#aaa">개발자를 찾습니다.<br/>기존 앱 스토어에서 삭제됨</td>
                <th>-</th>
                <td>-</td>
              </tr>
              <!-- windows -->
              <tr>
                <th><img src="@/assets/page/schedule-th-windows.svg" title="windows" class="pmark" /></th>
                <td><a href="https://www.microsoft.com/p/anisched/9wzdncrd8kxg" target="_blank">AniSched</a></td>
                <th>Novang</th>
                <td>2015년</td>
              </tr>
              <!-- chrome -->
              <tr>
                <th rowspan="2"><img src="@/assets/page/schedule-th-chrome.svg" title="chrome" class="pmark" /></th>
                <td><a href="https://chrome.google.com/webstore/detail/%EC%95%A0%EB%8B%88%ED%8E%B8%EC%84%B1%ED%91%9C/alpjhdpeaicbnhdjbgfiidbckephhlda" target="_blank">애니편성표</a></td>
                <th>눅세</th>
                <td><span title="등록일을 찾을 수 없음 최초 리뷰가 2014년">2014년</span></td>
              </tr>
              <tr>
                <td><a href="https://chrome.google.com/webstore/detail/anisched/lkpfenhnbjcjekjihacpcoekgdclobdn" target="_blank">AniSched</a></td>
                <th>Novang</th>
                <td><span title="등록일을 찾을 수 없음 마지막 업데이트가 2015년">2015년</span></td>
              </tr>
            </table>
          </div>

          <div class="doc-title">소스코드 / API</div>
          <div class="doc-desc">
            <table class="schedule-table schedule-application">
              <tr>
                <th rowspan="3"><img src="@/assets/page/schedule-th-api.svg" title="API" class="pmark" /></th>
                <td><a href="https://github.com/anissia-net/anissia-web/blob/master/README-API.md" target="_blank">API</a></td>
                <th>3rd party 애니편성표 앱 제작을 위한 API 가이드</th>
              </tr>
              <tr>
                <td><a href="https://github.com/anissia-net/anissia-web" target="_blank">WEB</a></td>
                <th>FE - Vue.js, Typescript</th>
              </tr>
              <tr>
                <td><a href="https://github.com/anissia-net/anissia-core" target="_blank">CORE</a></td>
                <th>BE - Kotlin, Spring, JPA, QueryDSL, Elasticsearch</th>
              </tr>
            </table>
          </div>

          <div v-if="colorPickerOpen" class="color-picker" ref="colorPicker"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Feed from "@/components/Feed.vue";
import LatestDocs from "@/components/LatestDocs.vue";
import RankBoard from "@/components/RankBoard.vue";
import { Options, Vue } from "vue-class-component";
import Nabi from "@/utils/nabi";
import ColorPicker from "vanilla-picker"

@Options({
  computed: {
    // -- HTML -----------------------------------------------------------------------------------------
    htmlCode() {
      return `<iframe src="${location.origin + '/schedule/2015#' + this.htmlSrc}" width="${this.htmlWidth}" height="${this.htmlHeight}" frameborder="0"></iframe>`;
    },
    htmlSrc() {
      return (
          this.htmlBgLight + this.htmlTitleBgLight + this.htmlTitleLight + this.htmlNavBgLight + this.htmlNavLight + this.htmlNavActBgLight +
          this.htmlNavActLight + this.htmlListBgLight + this.htmlListLight + this.htmlListActBgLight + this.htmlListActLight + this.htmlPrefixLight +
          this.htmlBgDark + this.htmlTitleBgDark + this.htmlTitleDark + this.htmlNavBgDark + this.htmlNavDark + this.htmlNavActBgDark +
          this.htmlNavActDark + this.htmlListBgDark + this.htmlListDark + this.htmlListActBgDark + this.htmlListActDark + this.htmlPrefixDark
      );
    }
  },
  components: {
    LatestDocs,
    RankBoard
    //Color
  },
  watch: {
  },
  methods: {
    // -- Color Picker -----------------------------------------------------------------------------------------
    openColorPicker(event: MouseEvent) {
      this.colorPickerOpen = true;
      this.$nextTick(() => {
        const cp = this.$refs.colorPicker;
        cp.style.top = (event.clientY + 20) + 'px';
        cp.style.left = (event.clientX - 128) + 'px';
        this.colorPickerVar = (event.target as any).getAttribute('v');
        this.colorPicker = new ColorPicker({parent: cp, onDone: this.closeColorPicker, onChange: this.selectColorPicker, color: `#${this[this.colorPickerVar]}`, alpha: false, popup: false});
        this.mode === 'html' && this.$refs.html.contentWindow.colorMode(this.colorPickerVar.endsWith('Light') ? 'light': 'dark');
      });
    },
    selectColorPicker(color: any) {
      this[this.colorPickerVar] = color.hex.substring(1, 7);
      this.mode === 'html' && this.drawHtml()
    },
    closeColorPicker() {
      this.colorPickerOpen = false;
      this.colorPicker && this.colorPicker.destroy();
      this.$refs.colorPicker.innerHTML = '';
    },
    closerColorPicker(e: Event) {
      console.log(Nabi.matchesParents(e.target, ['.color-picker', '.color-picker-closer-area']));
      if (this.colorPickerOpen && Nabi.matchesParents(e.target, ['.color-picker', '.color-picker-closer-area', '.color']) === '.color-picker-closer-area') {
        this.closeColorPicker();
      }
    },
    // -- HTML -----------------------------------------------------------------------------------------
    drawHtml() {
      const sc = this.$refs.html.contentWindow;
      sc.repaint(this.htmlSrc);
    }
  }
})

export default class Schedule extends Vue {
  data() {
    return {
      // mode
      mode: 'html',
      // HTML - color - light mode
      htmlBgLight: 'FFFFFF',
      htmlTitleBgLight: '44A59B', htmlTitleLight: 'FFFFFF',
      htmlNavBgLight: '38988E', htmlNavLight: '8ED6CE',
      htmlNavActBgLight: '1A6F66', htmlNavActLight: 'FFFFFF',
      htmlListBgLight: 'FFFFFF', htmlListLight: '555555',
      htmlListActBgLight: 'FDFFE5', htmlListActLight: '248278',
      htmlPrefixLight: 'CE2A6D',
      // HTML - color - dark mode
      htmlBgDark: '000000',
      htmlTitleBgDark: '000000', htmlTitleDark: '777777',
      htmlNavBgDark: '111111', htmlNavDark: 'AAAAAA',
      htmlNavActBgDark: '111111', htmlNavActDark: '9C9937',
      htmlListBgDark: '070707', htmlListDark: '999999',
      htmlListActBgDark: '000000', htmlListActDark: 'CCCCCC',
      htmlPrefixDark: '5EB982',
      // HTML - size
      htmlWidth: 800, htmlHeight: 600,
      // IMG - color
      imgTitleBg: '#63A883',
      imgTitle: '#FFFFFF',
      imgYmdBg: '#D8D8D8',
      imgYmd: '#000000',
      imgListBg: '#FFFFFF',
      imgList: '#000000',
      // IMG - size
      imgWidth: 180,
      // IMG - date
      imgDataList: [] as string[],
      imgDataYmd: '',
      // color picker
      colorPicker: null as ColorPicker | null,
      colorPickerOpen: false,
      colorPickerVar: '',
    };
  }
}
</script>


<style>
#schedule { font-family: "Malgun Gothic", "Dotum"; }
#schedule .base-mat { padding:8px; }
#schedule .doc-title {
  font-size: 20px;
  border-bottom: 1px solid #276998;
  color: #276998;
  padding: 6px 8px 8px;
}
#schedule .doc-desc { padding: 12px 8px; line-height: 1.8; margin-bottom: 8px }
#schedule .doc-desc .comment { font-size:15px; }

#schedule .icon i { margin-right:4px; }
#schedule table.schedule-table { margin:4px 0 0; }
#schedule table.schedule-table th, #schedule table.schedule-table td { padding:4px 12px; font-weight: normal }
#schedule table.schedule-table, #schedule table.schedule-table th, #schedule table.schedule-table td { border:1px solid #dde1e6; }
#schedule table.schedule-application .pmark { width:80px; height: 80px; vertical-align: middle; margin:20px; }
#schedule table.schedule-application td,
#schedule table.schedule-application th { padding:8px 12px; }

#schedule .html-gen { overflow: auto; }
#schedule .html-gen .tool-preview { float:left; padding:16px; box-sizing: border-box; text-align:center; width:calc(100% - 208px); }
#schedule .html-gen .tool-preview .preview-border {  border:0; max-width:100% !important; max-height:100% !important; vertical-align: middle;  }
#schedule .html-gen .tool-preview .preview-img { display: inline-block }
#schedule .html-gen .tool { padding:16px 8px; margin-left:calc(100% - 208px); }
#schedule .html-gen .tool .line > div { display:inline-block; vertical-align: top; margin-top:2px; }
#schedule .html-gen .tool .line .label { width:52px; height:32px; line-height: 30px; font-weight: bold }
#schedule .html-gen .tool .line .color { width:32px; height:32px; box-sizing: border-box; margin-left:2px; }
#schedule .html-gen .tool .line .color:not(.blank) { border:1px solid #ddd }

#schedule .color-picker { position: absolute; }

#schedule table.intro-table { margin:4px 0 20px; }
#schedule table.intro-table th { color:#2a4c8c }
#schedule table.intro-table th, #schedule table.intro-table td { padding:4px 12px; font-weight: normal }
#schedule table.intro-table, #schedule table.intro-table th, #schedule table.intro-table td { border:1px solid #dde1e6; }

@media (max-width: 600px) {
  #schedule .mob-hide { display: none; }
}

html.light #schedule .html-gen .tool-preview .preview-border { border: 4px dashed #ddd; }

html.dark #schedule .html-gen .tool-preview .preview-border { border: 4px dashed #333; }

</style>