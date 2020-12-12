<!--
 - 2019-08-17 박용서:
 - 2009년 소스를 vuejs 에 맞게 변경
 - 변경시 기존 IE6 호환성 폐기 IE10 이상 권장 (2020년 기준으로 무의미하다고 판단)
-->

<template>
  <div id="t2009" @click="e => closePopup(e)">
    <a href="/" target="_blank"><div id="mark">&nbsp;</div></a>
    <div class="nav">
      <div v-for="bcType in bcTypeList" :key="bcType" @click="selectAnimeList(bcType)" 
        :style="{ backgroundPosition: `${bcType * -55}px ${bcType === bcTypeNow ? -20 : 0}px` }"></div>
      </div>
    <div class="list">
      <div class="node">
        <div class="tod">{{ bcTypeIsDay() ? '시간' : '날짜' }}</div>
        <div class="subject ti">제목</div>
        <div class="genres">분류</div>
      </div>
      <div v-for="node in animeList" :key="node.an"
        class="node node-hover" @click="openAnimeDetail(node);">
        <div class="tod">{{node.bcTimeOrDate}}</div>
        <div class="subject">
          <span v-if="node.prefix">[<b>{{node.prefix}}</b>] </span>
          {{node.subject}}
        </div>
        <div class="genres">{{node.genres}}</div>
      </div>
    </div>
    <div class="popup" v-if="animeNow != null">
      <div class="box">
        <div v-if="animeNow.website" style="text-align:center;padding:0 0 3px 0">
          <a :href="animeNow.website" target="_blank" class="official">공식 사이트</a>
        </div>
        <a :href="node.website" target="_blank" v-for="node in captionList" :key="`${node.an} ${node.name}`">
          <div class="caption">
              {{node.episode}} <span>{{node.updDt}}</span> {{node.name}}
          </div>
        </a>
        <div v-if="captionList.length == 0" class="non-caption">
          자막이 없습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Nabi from '@/utils/nabi';
import Timetable from '@/models/AnimeTimetable';
import Caption from '@/models/AnimeCaption';
import AnissiaUtil from '@/utils/AnissiaUtil';
import AnimeService from '@/services/AnimeService';

export default Vue.extend({
  data() {
    return {
      bcTypeList: [...Array(9).keys()],
      bcTypeNow: -1,
      animeList: [] as Timetable[],
      animeNow: null as  Timetable | null,
      captionList: [] as Caption[],
    };
  },
  mounted() {
    this.selectAnimeList(new Date().getDay());
  },
  created() {
    window.addEventListener('keydown', this.closePopupKey, true);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.closePopupKey, true);
  },
  methods: {
    bcTypeIsDay() {
      return AnissiaUtil.bcTypeIsDay(this.bcTypeNow);
    },
    selectAnimeList(bcType: number): void {
      AnimeService.timetable((this.bcTypeNow = bcType), (e) => this.animeList = e);
    },
    openAnimeDetail(anime: Timetable) {
      AnimeService.caption(anime.an, (e) => {
        this.captionList = e;
        this.animeNow = anime;
      });
    },
    closePopup(event: MouseEvent) {
      if (this.animeNow !== null && Nabi.matchesParents(event.target, ['.box', '#t2009']) !== '.box') {
        this.animeNow = null;
      }
    },
    closePopupKey(event: KeyboardEvent) {
      if (this.animeNow !== null && event.keyCode === 27) {
        this.animeNow = null;
      }
    },
  },
});
</script>

<style>
#t2009 { 
  position: absolute; top:0; right:0; bottom:0; left:0; background-color: #333;
  background-image: url(~@/assets/timetable/2009-bg.jpg); background-repeat: no-repeat;
  font-family: "Malgun Gothic", "Dotum"; min-width:530px;
}
#t2009 a { text-decoration: none }
#t2009 > div { position: absolute; }
#t2009 .nav, 
#t2009 .list { width: 496px; left: 16px; border: 1px solid #a75; }
#t2009 .mark { cursor: pointer; top: 10px; left: 200px; width: 130px; height: 36px; }
#t2009 .nav { height: 20px; top: 48px; }
#t2009 .nav > div { width: 55px; height: 20px; background-image: url(~@/assets/timetable/2009-menu.png); float: left; cursor: pointer; }
#t2009 .list { height: 456px; top: 76px; background-color: rgba(200, 200, 255, 0.1); overflow: auto; }
#t2009 .list > .node {
  background-color: rgba(235, 200, 200, 0.5); border: 1px solid #c99; overflow: auto;
  margin: 5px 4px; padding: 4px 0; font-weight: bold; font-size: 12px;
}
#t2009 .list > .node.node-hover { cursor: pointer; }
#t2009 .list > .node.node-hover:hover { background-color: rgba(245, 210, 210, 0.9); }
#t2009 .list > .node > div { float: left; text-align: center; }
#t2009 .list > .node.node-hover > .subject { text-align: left; }
#t2009 .list > .node .tod { width: 14%; }
#t2009 .list > .node .subject { width: 54%; padding-left: 1%; }
#t2009 .list > .node .genres { width: 25%; }
#t2009 .popup {
  position: absolute; top: 0; left: 0; width: 530px; height: 500px; padding-bottom:50px;
  background-color: rgba(0, 0, 0, 0.4); display: flex; align-items: center; justify-content: center;
}
#t2009 .popup .box { background-color:rgba(255, 255, 255, 0.85); line-height: 1.5; padding: 18px 18px 18px; }
#t2009 .popup .box a { color: #333; }
#t2009 .popup .box a.official { color: #d43676; font-size:14px; }
#t2009 .popup .box div.caption { padding: 4px 8px 3px; font-size: 12px; margin-top: 3px; color: #4354ab; }
#t2009 .popup .box div.caption > span { margin:0 4px; font-weight: normal; color: #000; }
#t2009 .popup .box div.caption:hover { background: #fff; }
#t2009 .popup .box div.non-caption { color:#333; padding: 14px 24px; font-weight: normal; font-size:12px; }
</style>
