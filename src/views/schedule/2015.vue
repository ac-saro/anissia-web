<!--
2019-08-17 박용서: 2015년 소스를 vuejs 에 맞게 변경
2020-12-20 박용서: 다크모드 추가 (2015 Version 유지) 
-->

<template>
  <div id="sc2015" @click="e => closePopup(e)">
    <div class="title" ondragstart="return false" onselectstart="return false">
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
            <span class="time">[{{node.updDt.substring(5, 16).replace('-', '/')}}]</span>
          </a>
          <div v-else class="node">
            <span>준비중</span>
            <b>&nbsp;{{node.name}}&nbsp;</b>
            <span class="time">[{{node.updDt.substring(5, 16).replace('-', '/')}}]</span>
          </div>
        </div>
        <div v-if="captionList.length === 0" class="node-empty">자막이 없습니다.</div>
      </div>
    </div>
    <div id="user-style"></div>
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
    // custom theme
    ((window as any).repaint = (() => {
      const c: string[] = location.hash.match(/[0-9a-f]{6}/ig) || [];
      if (c.filter((e: string) => /^[0-9a-f]{6}$/i.test(e)).length === 12) {
        /**
         * c[0]  body background color
         * c[1]  subject background color
         * c[2]  subject front color
         * c[3]  navigator background color
         * c[4]  navigator front color
         * c[5]  bc-type[week-more] background color
         * c[6]  bc-type[week-more] front color
         * c[7]  list background color
         * c[8]  list front color
         * c[9]  list:hover background color
         * c[10] list:hover front color
         * c[11] subject prefix front color
         */
        (document.getElementById('user-style') as any).innerHTML = `<style>
        #sc2015 .main, #sc2015 .popup .box { background: #${c[0]} }
        #sc2015 .title, #sc2015 .popup .box .subject { background: #${c[1]} }
        #sc2015 .title a, #sc2015 .popup .box .subject { color: #${c[2]} }
        #sc2015 .nav th, #sc2015 .popup .box .date { background: #${c[3]}; color: #${c[4]} }
        #sc2015 .nav th:hover, #sc2015 .nav th.sel { background: #${c[5]}; color: #${c[6]} }
        #sc2015 .list td, #sc2015 .popup .box .node,
        #sc2015 .popup .box .node-empty { background: #${c[7]}; color:#${c[8]}; }
        #sc2015 .list tr:hover td, #sc2015 .popup .box .node:hover { background: #${c[9]}; color:#${c[10]}; }
        #sc2015 .list tr:not(:hover) td .prefix b { color:#${c[11]} }
        </style>`;
      }
    }))();
  },
  created() {
    window.addEventListener('keydown', this.closePopupKey, true);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.closePopupKey, true);
  },
  methods: {
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
      if (this.animeNow !== null && event.keyCode === 27) {
        this.animeNow = null;
      }
    },
  }
})

export default class Sc2015 extends Vue {
  data() {
    // [week => broadcast type] 반영타입: 0~6 (일-토)요일, 7 그밖, 8 신작
    return {
      weekList: ['日', '月', '火', '水', '木', '金', '土', '外', '新'],
      weekNow: -1,
      animeList: [] as any[],
      animeNow: null as any|null,
      captionList: [] as any[],
    };
  }
}

</script>

<style>
@keyframes sc2015-popup {
  from { background-color: rgba(0, 0, 0, 0); } to { background-color: rgba(0, 0, 0, .3); }
}
#sc2015 { min-height: 100%; }
#sc2015 a { text-decoration: none; }
#sc2015 table { width:100%; }
#sc2015 .title { font-size:32px; font-weight: 200; line-height: 64px; text-align: center }
#sc2015 .nav th { line-height: 40px; cursor: pointer; transition: background-color 0.2s, color 0.2s; }
#sc2015 .main { position: absolute; right:0; bottom:0; left:0; overflow-y:auto }
#sc2015 .list { border-collapse: separate; border-spacing: 0 1px; font-size:16px; font-family: "Noto Sans KR", "Malgun Gothic", "Dotum"; font-weight: 600 }
#sc2015 .list td { height: 48px; line-height: 1.8; padding:0; transition: background-color 0.2s, color 0.2s; }
#sc2015 .list td.tod { width:64px; text-align: center; }
#sc2015 .list td.genres { text-align: right; padding-right:14px; }
#sc2015 .list td.subject { cursor: pointer; }

#sc2015 .popup {
  position: fixed; top:0; right:0; bottom:0; left:0;
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
#sc2015 .popup .box .subject { font-size: 20px; line-height: 2; padding-bottom: 2px; padding: 0 12px; font-weight: 100; }


@media (min-width: 601px) {
  #sc2015 .main { top:106px; }
  #sc2015 .list td.tod.tod-date { width:106px; }
  #sc2015 .popup .box { width: 400px; margin: 120px auto 0 auto; }
}

@media (max-width: 600px) {
  #sc2015 .main { top:94px; }
  #sc2015 .title { font-size:24px; line-height: 52px; }
  #sc2015 .mob-hide { display: none; }
  #sc2015 .popup .box { margin: 80px 24px 0; }
  #sc2015 .popup .box .subject { font-size:18px; }
}

@media (max-width: 300px) {
  #sc2015 .main { top:94px; }
  #sc2015 .title { font-size:24px; line-height: 52px; }
  #sc2015 .mob-hide { display: none; }
  #sc2015 .popup .box { margin: 80px 24px 0; }
  #sc2015 .popup .box .subject { font-size:12px; padding:4px; }
  #sc2015 .popup .box .date { font-size:12px; padding:4px; }
  #sc2015 .popup .box .node { font-size:14px; }
  #sc2015 .popup .box .node .time { display:none }
}

/** colors */
#sc2015 .main, #sc2015 .popup .box { background: #eee }
#sc2015 .title, #sc2015 .popup .box .subject { background: #44a59b }
#sc2015 .title a, #sc2015 .popup .box .subject { color: #fff }
#sc2015 .nav th, #sc2015 .popup .box .date { background: #38988e; color: #8ed6ce }
#sc2015 .nav th:hover, #sc2015 .nav th.sel { background: #1a6f66; color: #fff }
#sc2015 .list td, #sc2015 .popup .box .node, #sc2015 .popup .box .node-empty { background: #fff; color:#555; }
#sc2015 .list tr:hover td, #sc2015 .popup .box .node:hover { background: #fdffe5; color:#248278; }
#sc2015 .list tr:not(:hover) td .prefix b { color:#ce2a6d }
</style>
