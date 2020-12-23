<template>
  <div>
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
      <div class="basic-layout-main">
        <div id="schedule" class="base-mat">


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

          <div class="doc-title"><span class="icon"><i class="fas fa-info-circle" style="color:#fbc5ac"></i> 소스코드 삽입</span></div>
          <div class="doc-desc">
            <table class="timetable-source mob-hide">
              <tr>
                <td class="view">
                  <!-- preview iframe type -->
                  <div v-if="atm == 'f'">
                    <iframe :src="atfPath()" ref="atfp" :width="atf.w" :height="atf.h"></iframe>
                  </div>
                  <!-- preview image type -->
                  <div v-if="atm == 'i'">
                    <div class="img-preview" :style="{width: `${ati.w}px`, cursor: 'default'}" ondragstart="return false" onselectstart="return false">
                      <div class="img-title" :style="{background: ati.titleBg.hex, color: ati.title.hex}">애니편성표</div>
                      <div class="img-ymd" :style="{background: ati.ymdBg.hex, color: ati.ymd.hex}">{{ati.dataYmd}}</div>
                      <div class="img-node" :style="{background: ati.listBg.hex, color: ati.list.hex}" v-for="node in ati.dataList" :key="node">{{node}}</div>
                    </div>
                  </div>
                </td>
                <td class="edit">
                  <!-- type -->
                  <div class="title">소스타입</div>
                  <div>
                    <input type="radio" name="timetable-mode" v-model="atm" value="f" id="timetable-mode-f" />
                    <label for="timetable-mode-f" title="일반적으로 iframe 이 가능한 모든 사이트에 삽입 가능"> 아이프레임</label>
                  </div>
                  <div>
                    <input type="radio" name="timetable-mode" v-model="atm" value="i" id="timetable-mode-i" />
                    <label for="timetable-mode-i" title="네이버 블로그 처럼 iframe이 금지된 경우 사용."> 이미지</label>
                  </div>
                  <!-- iframe options -->
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
                  <!-- image options -->
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
import Color from "vue-color/src/components/Chrome.vue";
import Nabi from "@/utils/nabi";

@Options({
  computed: {
  },
  components: {
    Feed,
    LatestDocs,
    RankBoard,
    //Color
  },
  methods: {
    atfPath() {
      const p = this.atf;
      return (
          '/timetable/2015#' + (
              p.bg.hex +
              p.titleBg.hex + p.title.hex + p.navBg.hex + p.nav.hex + p.navActBg.hex + p.navAct.hex +
              p.listBg.hex + p.list.hex + p.listActBg.hex + p.listAct.hex + p.prefix.hex
          ).replace(/#/g, '')
      );
    },
    atfHtmlCode() {
      const p = this.atf;
      return `
        <iframe src="${location.origin}${this.atfPath()}" ref="atfp" width="${p.w}" height="${p.h}" frameborder="0">
        </iframe>`.replace(/[\s]{2,}/g, '');
    },
    atiHtmlCode() {
      const p = this.ati;
      const param = `${p.w}/${p.titleBg.hex}${p.title.hex}${p.ymdBg.hex}${p.ymd.hex}${p.listBg.hex}${p.list.hex}`;
      return `
        <a href="${location.origin}/timetable/2015" target="_blank">
          <img src="${location.origin}/api/timetable/svg/${param}"/>
        </a>`.replace(/#/g, '').replace(/[\s]{2,}/g, '');
    },
    toggleColorPicker(acp: string) {
      this.acp = this.acp !== acp ? acp : '';
    },
    // click outside the colorpicker closes the colorpicker
    closeColorPicker(e: Event) {
      if (this.acp && Nabi.matchesParents(e.target, ['.p-box', '.p-btn', '.timetable-area']) === '.timetable-area') {
        this.acp = '';
      }
    },
  }
})

export default class Schedule extends Vue {
  data() {
    return {
      // timetable mode - f:frame, i:image
      atm: 'f',
      // timetable color picker
      acp: '',
      // timetable frame [act: active]
      atf: {
        bg: { hex: '#EEEEEE' },
        titleBg: { hex: '#44A59B' },
        title: { hex: '#FFFFFF' },
        navBg: { hex: '#38988E' },
        nav: { hex: '#8ED6CE' },
        navActBg: { hex: '#1A6F66' },
        navAct: { hex: '#FFFFFF' },
        listBg: { hex: '#FFFFFF' },
        list: { hex: '#555555' },
        listActBg: { hex: '#FDFFE5' },
        listAct: { hex: '#248278' },
        prefix: { hex: '#CE2A6D' },
        w: 800,
        h: 600,
      },
      // timetable image
      ati: {
        titleBg: { hex: '#63A883' },
        title: { hex: '#FFFFFF' },
        ymdBg: { hex: '#D8D8D8' },
        ymd: { hex: '#000000' },
        listBg: { hex: '#FFFFFF' },
        list: { hex: '#000000' },
        w: 180,
        dataList: [] as string[],
        dataYmd: '',
      },
    };
  }
}
</script>


<style>


</style>