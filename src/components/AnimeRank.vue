<template>
  <div class="anime-rank">
    <table class="rank-tab">
      <tr>
        <td><div :class="{'select': period === 'day'}" @click="selectRankType('day')">일간</div></td>
        <td><div :class="{'select': period === 'week'}" @click="selectRankType('week')">주간</div></td>
        <td><div :class="{'select': period === 'month'}" @click="selectRankType('month')">월간</div></td>
      </tr>
    </table>
    <div class="rank-pad">
      <table class="rank-table">
        <tr v-for="node in list" :key="node.animeNo">
          <td class="date">{{node.rank}}</td>
          <td class="subject">
            <router-link :to="`/anime/${node.animeNo}`">{{node.subject}}</router-link>
          </td>
          <td class="diff">
            <div v-if="node.diff == null" class="diff-new" title="#100 신규진입">◆</div>
            <div v-else-if="node.diff == 0">&nbsp;</div>
            <div v-else-if="node.diff > 0" class="diff-up">▲ {{node.diff}}</div>
            <div v-else-if="node.diff < 0" class="diff-down">▼ {{-node.diff}}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import AnimeService from "@/service/AnimeService";

@Options({
  methods: {
    selectRankType(type: string) {
      this.period = type;
      if (!this[type].length) {
        AnimeService.getRank(type, (list) => this.list = this[type] = list);
      } else {
        this.list = this[type];
      }
    }
  },
  created() {
    this.selectRankType('day');
  },
})
export default class AnimeRank extends Vue {
  data() {
    return {
      period: 'day',
      list: [],
      day: [],
      week: [],
      month: []
    };
  }
}
</script>

<style>
.anime-rank {  }
.anime-rank table { width:100%; }
.anime-rank .rank-tab td { width:33.33%; }
.anime-rank .rank-tab td div { text-align: center; line-height: 48px; cursor: pointer }
.anime-rank .rank-pad { padding:4px 0 0; }
.anime-rank .rank-table td { height: 36px; padding: 6px 0; line-height: 1.6; font-size:14px }
.anime-rank .rank-table td.date { min-width:20px; text-align: left; padding:0 16px; font-weight: bold }
.anime-rank .rank-table td.subject { }
.anime-rank .rank-table td.diff { min-width:50px; text-align: right; padding-right:16px; font-weight: bold }

html.light .anime-rank .rank-table td.diff .diff-up { color:#d45e5e }
html.light .anime-rank .rank-table td.diff .diff-down { color:#7490c3 }
html.light .anime-rank .rank-table td.diff .diff-new { color:#ddd }
html.light .anime-rank .rank-table td,
html.light .anime-rank .rank-tab td div { border-bottom: 1px solid #eee }
html.light .anime-rank .rank-tab td div.select { border-color: #276998 }
html.light .anime-rank a { color:#333 }

html.dark .anime-rank .rank-table td.diff .diff-up { color:#753333 }
html.dark .anime-rank .rank-table td.diff .diff-down { color:#2a3f67 }
html.dark .anime-rank .rank-table td.diff .diff-new { color:#333 }
html.dark .anime-rank .rank-table td,
html.dark .anime-rank .rank-tab td div { border-bottom: 1px solid #222 }
html.dark .anime-rank .rank-tab td div.select { border-color: #276998 }
html.dark .anime-rank a { color:#aaa }
</style>
