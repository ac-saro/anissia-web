<template>
  <div class="anime-caption-recent a-text-style">
    <div class="doc-title">최근 자막</div>
    <table class="basic-border-color">
      <tr v-for="node in recent.captions" :key="node.animeNo">
        <td class="main-td">
          <router-link :to="`http://localhost:8080/anime?animeNo=${node.animeNo}`">{{node.subject}}</router-link>
          <div class="mode-mob sub-info"><a :href="node.website" target="_blank"><span class="fas fa-closed-captioning"></span>&nbsp; {{node.episode}}&nbsp; <b>{{node.name}}</b>&nbsp; {{node.updDt}}</a></div>
        </td>
        <td class="name mode-full">
          <a :href="node.website" target="_blank">
            <span class="fas fa-closed-captioning"></span>&nbsp; {{node.episode}}&nbsp; <b>{{node.name}}</b>&nbsp; {{node.updDt}}
          </a>
        </td>
      </tr>
    </table>
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
    if (this.mode != 'static') {
      this.getCaptionRecent();
    }
  },
  computed: {
    recent() {
      return this.$store.state.recent;
    }
  },
  methods: {
    getCaptionRecent() {
      if (!this.recent.captions.length) {
        AnimeService.getCaptionRecent((list) => this.recent.captions = list);
      }
    }
  }
})
export default class AnimeCaptionRecent extends Vue {
  data() {
    return {}
  }
}
</script>

<style>
.anime-caption-recent { padding:0 0 16px; }
.anime-caption-recent table { width:100%; }
.anime-caption-recent table td { height:28px; padding:10px 8px; font-size:14px; border-width:1px 0 0; line-height: 1.8 }
.anime-caption-recent table td.name { text-align: right }
.anime-caption-recent table td.main-td .sub-info { margin:8px 0 0 1px; }

@media (max-width: 600px) {
  .anime-caption-recent .mode-full { display: none }
}
@media (min-width: 601px) {
  .anime-caption-recent .mode-mob { display: none }
}

@media (max-width: 1023px) {
  .anime-caption-recent table tr:nth-child( n + 6 ) { display: none }
}
@media (min-width: 1024px) {
  .anime-caption-recent table tr:nth-child( n + 13 ) { display: none }
}

</style>
