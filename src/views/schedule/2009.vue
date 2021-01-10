<!--
 - 2019-08-17 박용서: 2009년 소스를 vuejs 에 맞게 변경 (IE6 호환성 제거)
 - 2020-12-20 박용서: vue.js 3.0 에 맞게 변경 (IE 호환성 제거)
-->

<template>
  <div id="sc2009" @click="e => closePopup(e)">
    <a href="/" target="_blank"><div id="mark">&nbsp;</div></a>
    <div class="nav">
      <div v-for="bcType in weekList" :key="bcType" @click="selectAnimeList(bcType)" 
        :style="{ backgroundPosition: `${bcType * -55}px ${bcType === weekNow ? -20 : 0}px` }"></div>
      </div>
    <div class="list">
      <div class="node">
        <div class="tod">{{ isPureWeek() ? '시간' : '날짜' }}</div>
        <div class="subject ti">제목</div>
        <div class="genres">분류</div>
      </div>
      <div v-for="node in animeList" :key="node.an"
        class="node node-hover" @click="openAnimeDetail(node);">
        <div class="tod">{{node.time}}</div>
        <div class="subject">
          <span v-if="node.subjectPrefix">[<b>{{node.subjectPrefix}}</b>] </span>
          {{node.subject}}
        </div>
        <div class="genres">{{node.genres.replace(',', ' / ')}}</div>
      </div>
    </div>
    <div class="popup" v-if="animeNow != null">
      <div class="box">
        <div v-if="animeNow.website" style="text-align:center;padding:0 0 3px 0">
          <a :href="animeNow.website" target="_blank" class="official">공식 사이트</a>
        </div>
        <div v-for="node in captionList" :key="`${node.an} ${node.name}`">
          <span v-if="node.website === ''">
            <div class="caption"><span>{{node.episode}}</span> {{node.name}} <span>{{node.updDt}}</span></div>
          </span>
          <a v-else :href="node.website" target="_blank">
            <div class="caption"><span>{{node.episode}}</span> {{node.name}} <span>{{node.updDt}}</span></div>
          </a>
        </div>
        <div v-if="captionList.length == 0" class="non-caption">
          자막이 없습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Nabi from '@/utils/nabi';
import AnissiaUtil from '@/utils/AnissiaUtil';
import AnimeService from "@/service/AnimeService";
import {Options, Vue} from "vue-class-component";

@Options({
  mounted() {
    this.selectAnimeList(new Date().getDay());
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
      AnimeService.getSchedule((this.weekNow = week).toString(), (e) => this.animeList = e);
    },
    openAnimeDetail(anime: any) {
      AnimeService.getCaptionByAnimeNo(anime.animeNo, (e) => {
        this.captionList = e;
        this.animeNow = anime;
      });
    },
    closePopup(event: MouseEvent) {
      if (this.animeNow !== null && Nabi.matchesParents(event.target, ['.box', '#sc2009']) !== '.box') {
        this.animeNow = null;
      }
    },
    closePopupKey(event: KeyboardEvent) {
      if (this.animeNow !== null && event.key === 'Escape') {
        this.animeNow = null;
      }
    }
  }
})

export default class Sc2009 extends Vue {
  data() {
    return {
      weekList: [...Array(9).keys()],
      weekNow: -1 as number,
      animeList: [] as any[],
      animeNow: null as any|null,
      captionList: [] as any[],
    };
  }
}
</script>

<style>
#sc2009 {
  position: absolute; top:0; right:0; bottom:0; left:0; background-color: #333;
  background-image: url(~@/assets/schedule/2009-bg.jpg); background-repeat: no-repeat;
  font-family: "Malgun Gothic", "Dotum"; min-width:530px;
}
#sc2009 a { text-decoration: none }
#sc2009 > div { position: absolute; }
#sc2009 .nav,
#sc2009 .list { width: 496px; left: 16px; border: 1px solid #a75; }
#sc2009 .mark { cursor: pointer; top: 10px; left: 200px; width: 130px; height: 36px; }
#sc2009 .nav { height: 20px; top: 48px; }
#sc2009 .nav > div { width: 55px; height: 20px; background-image: url(~@/assets/schedule/2009-menu.png); float: left; cursor: pointer; }
#sc2009 .list { height: 456px; top: 76px; background-color: rgba(200, 200, 255, 0.1); overflow: auto; }
#sc2009 .list > .node {
  background-color: rgba(235, 200, 200, 0.5); border: 1px solid #c99; overflow: auto;
  margin: 5px 4px; padding: 4px 0; font-weight: bold; font-size: 12px;
}
#sc2009 .list > .node.node-hover { cursor: pointer; }
#sc2009 .list > .node.node-hover:hover { background-color: rgba(245, 210, 210, 0.9); }
#sc2009 .list > .node > div { float: left; text-align: center; }
#sc2009 .list > .node.node-hover > .subject { text-align: left; }
#sc2009 .list > .node .tod { width: 14%; }
#sc2009 .list > .node .subject { width: 54%; padding-left: 1%; }
#sc2009 .list > .node .genres { width: 25%; }
#sc2009 .popup {
  position: absolute; top: 0; left: 0; width: 530px; height: 500px; padding-bottom:50px;
  background-color: rgba(0, 0, 0, 0.4); display: flex; align-items: center; justify-content: center;
}
#sc2009 .popup .box { background-color:rgba(255, 255, 255, 0.85); line-height: 1.5; padding: 18px 18px 18px; }
#sc2009 .popup .box a { color: #333; }
#sc2009 .popup .box a.official { color: #d43676; font-size:14px; }
#sc2009 .popup .box div.caption { padding: 4px 8px 3px; font-size: 12px; margin-top: 3px; color: #4354ab; }
#sc2009 .popup .box div.caption > span { margin:0 4px; font-weight: normal; color: #000; }
#sc2009 .popup .box div.caption:hover { background: #fff; }
#sc2009 .popup .box div.non-caption { color:#333; padding: 14px 24px; font-weight: normal; font-size:12px; }
</style>
