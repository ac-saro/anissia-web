<!--
2019-08-17 박용서: 2015년 소스를 vuejs 에 맞게 변경
2020-12-25 박용서: 다크모드 추가 (2015 Version 유지)
-->

<template>
  <div id="sc2015" @click="e => closePopup(e)" :class="colorMode">
    <div class="title" ondragstart="return false" onselectstart="return false">
      <div class="color-mode" v-if="isWeb">
        <svg id="dark-mode" @click="applyColorMode('dark')" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="moon" class="svg-inline--fa fa-moon fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258.885 258.885"><path d="M205.635,252.709c-0.973,0-1.958-0.233-2.864-0.708l-73.334-38.557l-73.33,38.557c-2.072,1.086-4.582,0.906-6.482-0.469,c-1.892-1.375-2.84-3.705-2.441-6.011l14.003-81.659L1.859,106.031c-1.678-1.637-2.279-4.077-1.561-6.305,c0.727-2.225,2.657-3.849,4.975-4.185l81.99-11.917l36.666-74.297c2.065-4.201,8.959-4.201,11.024,0l36.671,74.297l81.99,11.917,c2.317,0.336,4.239,1.96,4.972,4.185c0.721,2.228,0.12,4.668-1.562,6.305l-59.327,57.832l14.003,81.659,c0.396,2.306-0.552,4.636-2.443,6.011C208.175,252.307,206.909,252.709,205.635,252.709z"/></svg>
        <svg id="light-mode" @click="applyColorMode('light')" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun" class="svg-inline--fa fa-sun fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>
      </div>
      <a href="/" target="_blank">애니<span class="mob-hide">메이션</span> 편성표</a>
    </div>
    <table class="nav" ondragstart="return false" onselectstart="return false">
      <tr>
        <th v-for="(name, idx) in weekList" :key="name"
          @click="selectAnimeList(idx)" :class="{'sel': (weekNow == idx)}">{{name}}</th>
      </tr>
    </table>
    <div class="main" ondragstart="return false" onselectstart="return false">
      <table class="list">
        <tr v-for="node in animeList" :key="node.an">
          <td class="tod" :class="{'tod-date': !isPureWeek()}">
            <span v-if="isPureWeek()">{{node.time}}</span>
            <span v-else>
              <span>{{node.time.length === 10 ? node.time.substring(0, 4) : node.time}}</span><span
                class="mob-hide">{{node.time.length === 10 ? node.time.substring(4) : ''}}</span>
            </span>
          </td>
          <td class="subject" @click="openAnimeDetail(node);">
            <span class="prefix" v-if="node.subjectPrefix">[<b>{{node.subjectPrefix}}</b>] </span>
            {{node.subject}}
          </td>
          <td class="genres mob-hide">{{node.genres.replace(',', ' / ')}}</td></tr>
      </table>
    </div>
    <div class="popup" v-if="animeNow != null">
      <div class="box">
        <a target="_blank" v-if="animeNow.website.length > 10" :href="animeNow.website" class="subject">{{animeNow.subject}}</a>
        <span class="subject" v-else>{{animeNow.subject}}</span>
        <div class="date" v-if="animeNow.period">{{animeNow.period}}</div>
        <div v-for="node in captionList" :key="`${node.name}`">
          <a v-if="node.website !== ''" class="node" :href="node.website" target="_blank">
            <span>{{node.episode}}</span>
            <b>&nbsp;{{node.name}}&nbsp;</b>
            <span class="time">{{node.updDt}}</span>
          </a>
          <div v-else class="node">
            <span>{{node.episode}}</span>
            <b>&nbsp;{{node.name}}&nbsp;</b>
            <span class="time">{{node.updDt}}</span>
          </div>
        </div>
        <div v-if="captionList.length === 0" class="node-empty">자막이 없습니다.</div>
      </div>
    </div>
    <div id="user-style"></div>
    <div id="sc2015-theme-error" style="display:none">
      <table><tr><td>애니편성표의 커스텀코드가 잘못되었습니다.<br/><br/><a href="/schedule" target="_blank">애니시아</a>에서 재설정 하시기 바랍니다.</td></tr></table>
    </div>
  </div>
</template>

<script lang="ts">
import Nabi from '@/utils/nabi';
import AnissiaUtil from '@/utils/AnissiaUtil';
import {Options, Vue} from "vue-class-component";
import AnimeService from "@/service/AnimeService";

@Options({
  mounted() {
    this.selectAnimeList(new Date().getDay());
    const theme = location.hash.length > 1 ? location.hash : 'ffffff5987b6fffffff2f2f2497ba79cb3c7ffffffffffff555555f8f8f82474cecb3434000000000000777777111111777777111111c3b443070707999999000000cccccc3a7da3';
    // custom theme
    ((window as any).repaint = ((colors: string) => {
      const c: string[] = colors.match(/[0-9a-f]{6}/ig) || [];
      if (c.filter((e: string) => /^[0-9a-f]{6}$/i.test(e)).length === 24) {
        /**
         * c[light/dark]  description
         * c[0/12]    body background color
         * c[1/13]    subject background color
         * c[2/14]    subject front color
         * c[3/15]    navigator background color
         * c[4/16]    navigator front color
         * c[5/17]    week background color
         * c[6/18]    week front color
         * c[7/19]    list background color
         * c[8/20]    list front color
         * c[9/21]    list:hover background color
         * c[10/22]   list:hover front color
         * c[11/23]   subject prefix front color
         */
        (document.getElementById('user-style') as any).innerHTML = `<style>
        #sc2015.light .main, #sc2015.light .popup .box { background: #${c[0]} }
        #sc2015.light .title, #sc2015.light .popup .box .subject { background: #${c[1]} }
        #sc2015.light .title a, #sc2015.light .popup .box .subject { color: #${c[2]} }
        #sc2015.light .title svg { fill:#${c[2]} }
        #sc2015.light .nav th, #sc2015.light .popup .box .date { background: #${c[3]}; color: #${c[4]} }
        #sc2015.light .nav th:hover, #sc2015.light .nav th.sel { background: #${c[5]}; color: #${c[6]} }
        #sc2015.light .list td, #sc2015.light .popup .box .node, #sc2015.light .popup .box .node-empty { background: #${c[7]}; color:#${c[8]}; }
        #sc2015.light .list tr:hover td, #sc2015.light .popup .box .node:hover { background: #${c[9]}; color:#${c[10]}; }
        #sc2015.light .list tr:not(:hover) td .prefix b { color:#${c[11]} }
        #sc2015.dark .main, #sc2015.dark .popup .box { background: #${c[12]} }
        #sc2015.dark .title, #sc2015.dark .popup .box .subject { background: #${c[13]} }
        #sc2015.dark .title a, #sc2015.dark .popup .box .subject { color: #${c[14]} }
        #sc2015.dark .title svg { fill:#${c[14]} }
        #sc2015.dark .nav th, #sc2015.dark .popup .box .date { background: #${c[15]}; color: #${c[16]} }
        #sc2015.dark .nav th:hover, #sc2015.dark .nav th.sel { background: #${c[17]}; color: #${c[18]} }
        #sc2015.dark .list td, #sc2015.dark .popup .box .node, #sc2015.dark .popup .box .node-empty { background: #${c[19]}; color:#${c[20]}; }
        #sc2015.dark .list tr:hover td, #sc2015.dark .popup .box .node:hover { background: #${c[21]}; color:#${c[22]}; }
        #sc2015.dark .list tr:not(:hover) td .prefix b { color:#${c[23]} }
        </style>`;
      } else {
        (document.querySelector('#sc2015-theme-error') as any).style.display = '';
      }
    }))(theme);
  },
  created() {
    this.applyColorMode(null);
    window.addEventListener('keydown', this.closePopupKey, true);
    (window as any).colorMode = this.applyColorMode;
    if (Nabi.address().getParameter('mode') == 'app') {
      this.isWeb = false;
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.closePopupKey, true);
  },
  methods: {
    // pure week: 日,月,火,水,木,金,土 (0,1,2,3,4,5,6)
    // week extension: 外,新 (7,8)
    isPureWeek() {
      return AnissiaUtil.isPureWeek(this.weekNow);
    },
    selectAnimeList(week: number): void {
      AnimeService.getSchedule(week.toString(), (e) => {
        this.animeList = e;
        this.weekNow = week;
      });
    },
    openAnimeDetail(anime: any) {
      AnimeService.getCaptionByAnimeNo(anime.animeNo, (e) => {
        this.captionList = e;
        this.animeNow = anime;
      });
    },
    closePopup(event: MouseEvent) {
      if (this.animeNow !== null && Nabi.matchesParents(event.target, ['.box', '#sc2015']) !== '.box') {
        this.animeNow = null;
      }
    },
    closePopupKey(event: KeyboardEvent) {
      if (this.animeNow !== null && event.key === 'Escape') {
        this.animeNow = null;
      }
    },
    applyColorMode(mode: string|null) {
      if (mode == null) {
        mode = this.getMode();
        this.colorMode = mode != null ? mode : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      } else {
        localStorage.setItem('schedule2015ColorMode', (this.colorMode = mode));
      }
    },
    getMode() {
      if (this.isWeb) {
        return (localStorage.getItem('schedule2015ColorMode') as string|null);
      } else {
        return 'light';
      }
    }
  }
})

export default class Sc2015 extends Vue {
  data() {
    return {
      weekList: ['日', '月', '火', '水', '木', '金', '土', '外', '新'],
      weekNow: -1,
      isWeb: true,
      animeList: [] as any[],
      animeNow: null as any|null,
      captionList: [] as any[],
      colorMode: '' as string
    };
  }
}

</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
@keyframes sc2015-popup {
  from { background-color: rgba(0, 0, 0, 0); } to { background-color: rgba(0, 0, 0, .3); }
}
#sc2015 { min-height: 100%; }
#sc2015 ::-webkit-scrollbar { display: none; }
#sc2015 a { text-decoration: none; }
#sc2015 table { width:100%; }
#sc2015 .title { font-size:32px; font-weight: 200; line-height: 64px; text-align: center }
#sc2015 .title .color-mode { position: absolute; top:0; right:0; height:64px; }
#sc2015 .title svg { width:28px; height:28px; margin:18px; opacity: .4; transition: all .2s; }
#sc2015 .title svg:hover { opacity: 1; transform: rotate(22deg); }
#sc2015 .nav th { line-height: 40px; cursor: pointer; transition: background-color 0.2s, color 0.2s; }
#sc2015 .main { position: absolute; right:0; bottom:0; left:0; overflow-y:auto }
#sc2015 .list { font-size:16px; font-family: "Noto Sans KR", "Malgun Gothic", "Dotum"; }
#sc2015 .list td { height: 48px; line-height: 1.8; padding:0; transition: background-color 0.2s, color 0.2s; }
#sc2015 .list td.tod { width:64px; text-align: center; }
#sc2015 .list td.genres { text-align: right; padding-right:14px; }
#sc2015 .list td.subject { cursor: pointer; }
#sc2015 .list td.subject b { font-weight: normal }

#sc2015 .popup {
  position: fixed; top:0; right:0; bottom:0; left:0; backdrop-filter: blur(3px);
  animation-name: sc2015-popup; animation-duration: .2s; animation-iteration-count: 1; animation-fill-mode: forwards;
}
#sc2015 .popup .box { font-weight: 400; transition: height 0.2s }
#sc2015 .popup .box .date { padding: 8px; line-height: 1.2; text-align: center; }
#sc2015 .popup .box .node,
#sc2015 .popup .box .node-empty { font-size: 15px; text-align: center; font-weight: 400; line-height: 40px; margin:0 0 1px; }
#sc2015 .popup .box .node b { line-height: 2.5; }
#sc2015 .popup .box .node-empty { padding: 40px 0 50px; text-align: center; }
#sc2015 .popup .box a,
#sc2015 .popup .box span.subject { text-decoration: none; display: block; text-align: center; }
#sc2015 .popup .box .subject { font-size: 20px; line-height: 2; padding: 0 12px; font-weight: 100; }

#sc2015-theme-error { position: fixed; top:0; left:0; right:0; bottom:0; background: #000; }
#sc2015-theme-error table { width:100%; height:100%; }
#sc2015-theme-error table td { text-align: center; color:#fff; line-height: 1; font-size: 1.5em; }

@media (min-width: 601px) {
  #sc2015 .main { top:104px; }
  #sc2015 .list td.tod.tod-date { width:106px; }
  #sc2015 .popup .box { width: 400px; margin: 120px auto 0 auto; }
}

@media (max-width: 600px) {
  #sc2015 .main { top:92px; }
  #sc2015 .title { font-size:24px; line-height: 52px; }
  #sc2015 .title .color-mode { height:52px; }
  #sc2015 .title .color-mode svg { width:28px; height:28px; margin:12px; }
  #sc2015 .mob-hide { display: none; }
  #sc2015 .popup .box { margin: 80px 24px 0; }
  #sc2015 .popup .box .subject { font-size:18px; }
}

@media (max-width: 300px) {
  #sc2015 .main { top:92px; }
  #sc2015 .title { font-size:24px; line-height: 52px; }
  #sc2015 .title .color-mode { height:52px; }
  #sc2015 .title .color-mode svg { width:28px; height:24px; margin:14px 4px 14px 4px; }
  #sc2015 .mob-hide { display: none; }
  #sc2015 .popup .box { margin: 80px 24px 0; }
  #sc2015 .popup .box .subject { font-size:12px; padding:4px; }
  #sc2015 .popup .box .date { font-size:12px; padding:4px; }
  #sc2015 .popup .box .node { font-size:14px; }
  #sc2015 .popup .box .node .time { display:none }
}

#sc2015.light #light-mode, #sc2015.dark #dark-mode { display: none }
</style>
