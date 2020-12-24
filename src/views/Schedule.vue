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
          <div class="doc-title">애니메이션 편성표</div>
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
                  <div class="label">가로</div>
                  <input type="range" min="180" max="900" step="10" v-model="htmlWidth" />
                </div>
                <div class="line">
                  <div class="label">세로</div>
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

          <div class="doc-title">애니메이션 편성표</div>
          <div class="doc-desc">
            <div><router-link to="/schedule/2015">애니메이션 편성표</router-link></div>
            <div><router-link to="/schedule/2009">애니메이션 편성표 (구버전)</router-link><span class="comment"> - <router-link to="/introduce">연혁보기</router-link></span></div>
          </div>


          <div class="doc-desc">
            웹사이트 : <a href="/schedule/2015" target="_blank">최신버전</a> | <a href="/schedule/2009" target="_blank">레트로버전</a> | <router-link to="/introduce">연혁보기</router-link>
          </div>



          <div class="doc-title">서드파티 플랫폼</div>

          <div class="doc-title"><span class="icon"><i class="fas fa-info-circle" style="color:#fbc5ac"></i> 애니메이션 편성표</span></div>
          <div class="doc-desc">
            <table class="timetable-table timetable-application">
              <tr><th>플랫폼</th><th>이름</th><th>개발</th><th>출시연도</th></tr>
              <!-- web -->
              <tr>
                <th rowspan="3"><img src="@/assets/page/schedule-th-web.svg" title="web" class="pmark" /></th>
                <td><router-link to="/timetable/2015">애니메이션 편성표</router-link></td>
                <th><span title="개발: 박용서">애니시아</span></th>
                <td>2015</td>
              </tr>
              <tr>
                <td><router-link to="/timetable/2009">애니 편성표 (Legacy)</router-link></td>
                <th><span title="그래픽: 매디, 개발: 박용서">애니시아</span></th>
                <td>2009</td>
              </tr>
              <tr>
                <td><a href="https://anion.herokuapp.com" target="_blank">Ani-ON</a></td>
                <th>Zn</th>
                <td>2015</td>
              </tr>
              <!-- ios -->
              <tr>
                <th><img src="@/assets/page/schedule-th-ios.svg" title="ios" class="pmark" /></th>
                <td><a href="https://apps.apple.com/kr/app/aeni-pyeonseongpyo/id917536862" target="_blank">애니 편성표</a></td>
                <th>Young Ho Kim</th>
                <td>2014</td>
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
                <td>2015</td>
              </tr>
              <!-- chrome -->
              <tr>
                <th rowspan="2"><img src="@/assets/page/schedule-th-chrome.svg" title="chrome" class="pmark" /></th>
                <td><a href="https://chrome.google.com/webstore/detail/%EC%95%A0%EB%8B%88%ED%8E%B8%EC%84%B1%ED%91%9C/alpjhdpeaicbnhdjbgfiidbckephhlda" target="_blank">애니편성표</a></td>
                <th>눅세</th>
                <td><span title="등록일을 찾을 수 없음 최초 리뷰가 2014년">2014?</span></td>
              </tr>
              <tr>
                <td><a href="https://chrome.google.com/webstore/detail/anisched/lkpfenhnbjcjekjihacpcoekgdclobdn" target="_blank">AniSched</a></td>
                <th>Novang</th>
                <td><span title="등록일을 찾을 수 없음 마지막 업데이트가 2015년">2015?</span></td>
              </tr>
              <!-- api -->
              <tr>
                <th><img src="@/assets/page/schedule-th-api.svg" title="API" class="pmark" /></th>
                <td><a href="https://github.com/anissia-net/anissia-web/blob/master/README-API.md" target="_blank">애니메이션 편성표 API</a></td>
                <th><span title="개발: 박용서">애니시아</span></th>
                <td><span title="2009, 2015 API는 폐기됨">2020</span></td>
              </tr>
            </table>
            <span style="color:#777; font-size:13px;">
          * 링크증발, 장기간 비정상 작동시 목록에서 삭제
          <span class="mob-hide">
          (삭제이력을 관리하지 않음)
          </span>
        </span>
          </div>

          <!--
          <div class="doc-title"><span class="icon"><i class="fas fa-info-circle" style="color:#fbc5ac"></i> 소스코드 삽입</span></div>
          <div class="doc-desc">
            <table class="timetable-source mob-hide">
              <tr>
                <td class="view">
                  -- preview html type --
                  <div v-if="atm == 'f'">
                    <html :src="atfPath()" ref="atfp" :width="atf.w" :height="atf.h"></html>
                  </div>
                  -- preview image type --
                  <div v-if="atm == 'i'">
                    <div class="img-preview" :style="{width: `${ati.w}px`, cursor: 'default'}" ondragstart="return false" onselectstart="return false">
                      <div class="img-title" :style="{background: ati.titleBg.hex, color: ati.title.hex}">애니편성표</div>
                      <div class="img-ymd" :style="{background: ati.ymdBg.hex, color: ati.ymd.hex}">{{ati.dataYmd}}</div>
                      <div class="img-node" :style="{background: ati.listBg.hex, color: ati.list.hex}" v-for="node in ati.dataList" :key="node">{{node}}</div>
                    </div>
                  </div>
                </td>
                <td class="edit">
                 -- type --
                  <div class="title">소스타입</div>
                  <div>
                    <input type="radio" name="timetable-mode" v-model="atm" value="f" id="timetable-mode-f" />
                    <label for="timetable-mode-f" title="일반적으로 html 이 가능한 모든 사이트에 삽입 가능"> 아이프레임</label>
                  </div>
                  <div>
                    <input type="radio" name="timetable-mode" v-model="atm" value="i" id="timetable-mode-i" />
                    <label for="timetable-mode-i" title="네이버 블로그 처럼 html이 금지된 경우 사용."> 이미지</label>
                  </div>
                  <div v-if="atm == 'f'">
                    <div class="title">색상 (A: 활성)</div>
                    <div class="color unit">
                      <div class="p-name">배경</div>
                      <div class="p-btn" :style="{background: atf.bg.hex}" @click="() => toggleColorPicker('atf.bg')">&nbsp;</div>
                      <div class="p-box" v-if="acp === 'atf.bg'"><color v-model="atf.bg" :disableAlpha="true" /></div>
                    </div>
                    <div class="color unit">
                      <div class="p-name">제목</div>
                      <div class="p-btn" :style="{background: atf.titleBg.hex}" @click="() => toggleColorPicker('atf.titleBg')">&nbsp;</div>
                      <div class="p-btn" :style="{background: atf.title.hex}" @click="() => toggleColorPicker('atf.title')">&nbsp;</div>
                      <div class="p-box" v-if="acp === 'atf.titleBg'"><color v-model="atf.titleBg" :disableAlpha="true" /></div>
                      <div class="p-box" v-if="acp === 'atf.title'"><color v-model="atf.title" :disableAlpha="true" /></div>
                    </div>
                    <div class="color unit">
                      <div class="p-name">네비</div>
                      <div class="p-btn" :style="{background: atf.navBg.hex}" @click="() => toggleColorPicker('atf.navBg')">&nbsp;</div>
                      <div class="p-btn" :style="{background: atf.nav.hex}" @click="() => toggleColorPicker('atf.nav')">&nbsp;</div>
                      <div class="p-box" v-if="acp === 'atf.navBg'"><color v-model="atf.navBg" :disableAlpha="true" /></div>
                      <div class="p-box" v-if="acp === 'atf.nav'"><color v-model="atf.nav" :disableAlpha="true" /></div>
                    </div>
                    <div class="color unit">
                      <div class="p-name">네비A</div>
                      <div class="p-btn" :style="{background: atf.navActBg.hex}" @click="() => toggleColorPicker('atf.navActBg')">&nbsp;</div>
                      <div class="p-btn" :style="{background: atf.navAct.hex}" @click="() => toggleColorPicker('atf.navAct')">&nbsp;</div>
                      <div class="p-box" v-if="acp === 'atf.navActBg'"><color v-model="atf.navActBg" :disableAlpha="true" /></div>
                      <div class="p-box" v-if="acp === 'atf.navAct'"><color v-model="atf.navAct" :disableAlpha="true" /></div>
                    </div>
                    <div class="color unit">
                      <div class="p-name">목록</div>
                      <div class="p-btn" :style="{background: atf.listBg.hex}" @click="() => toggleColorPicker('atf.listBg')">&nbsp;</div>
                      <div class="p-btn" :style="{background: atf.list.hex}" @click="() => toggleColorPicker('atf.list')">&nbsp;</div>
                      <div class="p-box" v-if="acp === 'atf.listBg'"><color v-model="atf.listBg" :disableAlpha="true" /></div>
                      <div class="p-box" v-if="acp === 'atf.list'"><color v-model="atf.list" :disableAlpha="true" /></div>
                    </div>
                    <div class="color unit">
                      <div class="p-name">목록A</div>
                      <div class="p-btn" :style="{background: atf.listActBg.hex}" @click="() => toggleColorPicker('atf.listActBg')">&nbsp;</div>
                      <div class="p-btn" :style="{background: atf.listAct.hex}" @click="() => toggleColorPicker('atf.listAct')">&nbsp;</div>
                      <div class="p-box" v-if="acp === 'atf.listActBg'"><color v-model="atf.listActBg" :disableAlpha="true" /></div>
                      <div class="p-box" v-if="acp === 'atf.listAct'"><color v-model="atf.listAct" :disableAlpha="true" /></div>
                    </div>
                    <div class="color unit">
                      <div class="p-name" title="제목앞 [] 사이에 들어감 `결방`, `完`, `01/17`(시작날짜)등이 있음">접두어</div>
                      <div class="p-btn" :style="{background: atf.prefix.hex}" @click="() => toggleColorPicker('atf.prefix')">&nbsp;</div>
                      <div class="p-box" v-if="acp === 'atf.prefix'"><color v-model="atf.prefix" :disableAlpha="true" /></div>
                    </div>
                    <div class="title">크기</div>
                    <div class="size">
                      <div>가로</div>
                      <input type="number" v-model="atf.w" />
                      <input type="range" v-model="atf.w" min="180" max="900" step="10" />
                    </div>
                    <div class="size">
                      <div>세로</div>
                      <input type="number" v-model="atf.h"/>
                      <input type="range" v-model="atf.h" min="240" max="780" step="10" />
                    </div>
                    <div class="title">소스코드</div>
                    <div class="html">
                      <textarea :value="atfHtmlCode()" readonly></textarea>
                    </div>
                  </div>
                  <div v-if="atm == 'i'">
                    <div class="title">색상</div>
                    <div class="color unit">
                      <div class="p-name">제목 </div>
                      <div class="p-btn" :style="{background: ati.titleBg.hex}" @click="() => toggleColorPicker('ati.titleBg')">&nbsp;</div>
                      <div class="p-btn" :style="{background: ati.title.hex}" @click="() => toggleColorPicker('ati.title')">&nbsp;</div>
                      <div class="p-box" v-if="acp === 'ati.titleBg'"><color v-model="ati.titleBg" :disableAlpha="true" /></div>
                      <div class="p-box" v-if="acp === 'ati.title'"><color v-model="ati.title" :disableAlpha="true" /></div>
                    </div>
                    <div class="color unit">
                      <div class="p-name">날짜 </div>
                      <div class="p-btn" :style="{background: ati.ymdBg.hex}" @click="() => toggleColorPicker('ati.ymdBg')">&nbsp;</div>
                      <div class="p-btn" :style="{background: ati.ymd.hex}" @click="() => toggleColorPicker('ati.ymd')">&nbsp;</div>
                      <div class="p-box" v-if="acp === 'ati.ymdBg'"><color v-model="ati.ymdBg" :disableAlpha="true" /></div>
                      <div class="p-box" v-if="acp === 'ati.ymd'"><color v-model="ati.ymd" :disableAlpha="true" /></div>
                    </div>
                    <div class="color unit">
                      <div class="p-name">목록 </div>
                      <div class="p-btn" :style="{background: ati.listBg.hex}" @click="() => toggleColorPicker('ati.listBg')">&nbsp;</div>
                      <div class="p-btn" :style="{background: ati.list.hex}" @click="() => toggleColorPicker('ati.list')">&nbsp;</div>
                      <div class="p-box" v-if="acp === 'ati.listBg'"><color v-model="ati.listBg" :disableAlpha="true" /></div>
                      <div class="p-box" v-if="acp === 'ati.list'"><color v-model="ati.list" :disableAlpha="true" /></div>
                    </div>
                    <div class="title">크기</div>
                    <div class="size unit">
                      <div>가로</div>
                      <input type="number" v-model="ati.w" />
                      <input type="range" v-model="ati.w" min="150" max="900" step="10" />
                    </div>
                    <div class="title">소스코드</div>
                    <div class="html">
                      <textarea :value="atiHtmlCode()" readonly></textarea>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
            <div class="only-mob-show" style="text-align:center; padding:64px 0;">
              해상도가 낮아 표시되지 않습니다.<br/><br/>
              소스 퍼기기는 PC 사용을 권장합니다.
            </div>
          </div>
-->
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
    htmlCode() {
      return `<iframe src="${this.htmlSrc}" width="${this.htmlWidth}" height="${this.htmlHeight}" frameborder="0"></iframe>`;
    },
    htmlSrc() {
      return (
          location.origin + '/schedule/2015#'+
          this.htmlBgLight+
          this.htmlTitleBgLight+
          this.htmlTitleLight+
          this.htmlNavBgLight+
          this.htmlNavLight+
          this.htmlNavActBgLight+
          this.htmlNavActLight+
          this.htmlListBgLight+
          this.htmlListLight+
          this.htmlListActBgLight+
          this.htmlListActLight+
          this.htmlPrefixLight+
          this.htmlBgDark+
          this.htmlTitleBgDark+
          this.htmlTitleDark+
          this.htmlNavBgDark+
          this.htmlNavDark+
          this.htmlNavActBgDark+
          this.htmlNavActDark+
          this.htmlListBgDark+
          this.htmlListDark+
          this.htmlListActBgDark+
          this.htmlListActDark+
          this.htmlPrefixDark
      );
    }
  },
  components: {
    LatestDocs,
    RankBoard
    //Color
  },
  created() {
  },
  methods: {
    openColorPicker(event: MouseEvent) {
      this.colorPickerOpen = true;
      this.$nextTick(() => {
        if (this.colorPicker) {
          this.colorPicker.destroy();
        }
        const cp = this.$refs.colorPicker;
        cp.style.top = (event.clientY + 20) + 'px';
        cp.style.left = (event.clientX - 128) + 'px';
        this.colorPickerVar = (event.target as any).getAttribute('v');
        this.colorPicker = new ColorPicker({
          parent: this.$refs.colorPicker,
          onDone: this.closeColorPicker,
          onChange: this.selectColorPicker,
          color: `#${this[this.colorPickerVar]}`,
          alpha: false,
          popup: false
        });
        if (this.mode === 'html') {
          if (this.colorPickerVar.endsWith('Light')) {
            this.$refs.html.contentWindow.colorMode('light');
          } else if (this.colorPickerVar.endsWith('Dark')) {
            this.$refs.html.contentWindow.colorMode('dark');
          }
        }
      });
    },
    selectColorPicker(color: any) {
      this[this.colorPickerVar] = color.hex.substring(1, 7);
      if (this.mode === 'html') {
        this.drawHtml();
      }
    },
    closeColorPicker(color: any) {
      this.selectColorPicker(color);
      this.colorPickerOpen = false;
    },
    closerColorPicker(e: Event) {
      console.log(Nabi.matchesParents(e.target, ['.color-picker', '.color-picker-closer-area']));
      if (this.colorPickerOpen && Nabi.matchesParents(e.target, ['.color-picker', '.color-picker-closer-area', '.color']) === '.color-picker-closer-area') {
        this.colorPickerOpen = false;
      }
    },
    drawHtml() {
      const sc = this.$refs.html.contentWindow;
      sc.repaint(this.htmlSrc.substring(this.htmlSrc.indexOf('#')));
    }




  }
})

export default class Schedule extends Vue {
  data() {
    return {

      colorPicker: null as ColorPicker | null,
      colorPickerOpen: false,
      colorPickerVar: '',

      mode: 'html',

      htmlBgLight: 'FFFFFF',
      htmlTitleBgLight: '44A59B',
      htmlTitleLight: 'FFFFFF',
      htmlNavBgLight: '38988E',
      htmlNavLight: '8ED6CE',
      htmlNavActBgLight: '1A6F66',
      htmlNavActLight: 'FFFFFF',
      htmlListBgLight: 'FFFFFF',
      htmlListLight: '555555',
      htmlListActBgLight: 'FDFFE5',
      htmlListActLight: '248278',
      htmlPrefixLight: 'CE2A6D',

      htmlBgDark: '000000',
      htmlTitleBgDark: '000000',
      htmlTitleDark: '777777',
      htmlNavBgDark: '111111',
      htmlNavDark: 'AAAAAA',
      htmlNavActBgDark: '111111',
      htmlNavActDark: '9C9937',
      htmlListBgDark: '070707',
      htmlListDark: '999999',
      htmlListActBgDark: '000000',
      htmlListActDark: 'CCCCCC',
      htmlPrefixDark: '5EB982',

      htmlWidth: 800,
      htmlHeight: 600,

      img: {
        titleBg: '#63A883',
        title: '#FFFFFF',
        ymdBg: '#D8D8D8',
        ymd: '#000000',
        listBg: '#FFFFFF',
        list: '#000000',
        width: 180,
        dataList: [] as string[],
        dataYmd: '',
      }

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

#schedule .html-gen { overflow: auto; }
#schedule .html-gen .tool-preview { float:left; padding:16px; box-sizing: border-box; text-align:center; width:calc(100% - 248px); }
#schedule .html-gen .tool-preview .preview-border {  border:0; max-width:100% !important; max-height:100% !important; vertical-align: middle;  }
#schedule .html-gen .tool-preview .preview-img { display: inline-block }
#schedule .html-gen .tool { padding:16px 8px; margin-left:calc(100% - 248px); }
#schedule .html-gen .tool .line > div { display:inline-block; vertical-align: top; margin-top:2px; }
#schedule .html-gen .tool .line .label { width:52px; height:32px; line-height: 30px; font-weight: bold }
#schedule .html-gen .tool .line .color { width:32px; height:32px; box-sizing: border-box; margin-left:2px; }
#schedule .html-gen .tool .line .color:not(.blank) { border:1px solid #ddd }

#schedule .color-picker { position: absolute; }

#schedule table.intro-table { margin:4px 0 20px; }
#schedule table.intro-table th { color:#2a4c8c }
#schedule table.intro-table th, #schedule table.intro-table td { padding:4px 12px; font-weight: normal }
#schedule table.intro-table, #schedule table.intro-table th, #schedule table.intro-table td { border:1px solid #dde1e6; }

html.light #schedule .html-gen .tool-preview .preview-border { border: 4px dashed #ddd; }

html.dark #schedule .html-gen .tool-preview .preview-border { border: 4px dashed #333; }

</style>