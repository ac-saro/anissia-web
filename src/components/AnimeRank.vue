<template>
  <div class="anime-rank a-text-style">
    <table class="rank-tab">
      <tr>
        <td><div class="basic-border-color" :class="{'select': rank.period === 'week'}" @click="selectRankType('week')">주간</div></td>
        <td><div class="basic-border-color" :class="{'select': rank.period === 'month'}" @click="selectRankType('month')">월간</div></td>
        <td><div class="basic-border-color" :class="{'select': rank.period === 'quarter'}" @click="selectRankType('quarter')">분기</div></td>
      </tr>
    </table>
    <div class="rank-pad">
      <table class="rank-table">
        <tr v-for="node in rank.list" :key="node.animeNo" :class="({'empty-list': node.animeNo == 0})">
          <td class="rank">{{node.rank}}</td>
          <td class="subject">
            <router-link v-if="node.animeNo > 0" :to="`/anime?animeNo=${node.animeNo}`">{{node.subject}}</router-link>
            <div v-else>-</div>
          </td>
          <td class="diff">
            <div v-if="node.animeNo == 0 || node.diff == 0"> </div>
            <div v-else-if="node.diff == null" class="diff-up diff-new fas fa-angle-double-up" title="#100 신규진입"></div>
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
  props: {
    /**
     * "dynamic" or undefined (default value)
     * - after created, call the api automatically
     * "static"
     * - after created, do not call the api automatically
     */
    mode: String
  },
  created() {
    if (this.mode != 'static' && this.rank.list.length == 0) {
      this.selectRankType('week');
    }
  },
  computed: {
    rank() {
      return this.$store.state.rank;
    }
  },
  methods: {
    selectRankType(type: string) {
      this.rank.period = type;
      if (!this.rank[type].length) {
        AnimeService.getRank(type, (list) => this.rank.list = this.rank[type] = list);
      } else {
        this.rank.list = this.rank[type];
      }
    }
  },
})
export default class AnimeRank extends Vue {
  data() {
    return {}
  }
}
</script>

<style>
.anime-rank {  }
.anime-rank table { width:100%; }
.anime-rank .rank-tab td { width:33.33%; }
.anime-rank .rank-tab td div { text-align: center; line-height: 48px; cursor: pointer; font-size:15px; }
.anime-rank .rank-table td,
.anime-rank .rank-tab td div { border-bottom-width: 1px; }
.anime-rank .rank-pad { padding:4px 0 0; }
.anime-rank .rank-table td { height: 36px; padding: 6px 0; line-height: 1.6; font-size:14px }
.anime-rank .rank-table td.rank { min-width:20px; max-width: 50px; text-align: center; padding:0 16px; font-weight: bold }
.anime-rank .rank-table td.subject { width:90%; }
.anime-rank .rank-table td.diff { min-width:50px; text-align: right; padding-right:16px; font-weight: bold }
.anime-rank .rank-table td.diff .diff-new { font-size:16px; }
.anime-rank .rank-table tr.empty-list { opacity: .3 }

@media (max-width: 1023px) {
  .anime-rank .rank-table tr:nth-child( n + 11 ) { display: none }
}

html.light .anime-rank .rank-table td.diff .diff-up { color:#d45e5e }
html.light .anime-rank .rank-table td.diff .diff-down { color:#7490c3 }
html.light .anime-rank .rank-table td.diff .diff-new { color:#e03f3f }
html.light .anime-rank .rank-tab td div.select { border-color: #276998 }
html.light .anime-rank a { color:#333 }

html.dark .anime-rank .rank-table td.diff .diff-up { color:#651f1f }
html.dark .anime-rank .rank-table td.diff .diff-down { color:#2a3c6f }
html.dark .anime-rank .rank-table td.diff .diff-new { color:#ca3838 }
html.dark .anime-rank .rank-tab td div.select { border-color: #276998 }
html.dark .anime-rank a { color:#aaa }
</style>
