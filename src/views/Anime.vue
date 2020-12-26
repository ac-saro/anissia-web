<template>
  <div>
    <div class="basic-layout">
      <div class="basic-layout-right">
        <div class="base-mat">
          <AnimeRank />
        </div>
      </div>
      <div class="basic-layout-main">
        <div class="base-mat">
          <div v-if="animeNo > 0" class="anime-view">
            뷰 영역
          </div>
          <div>
            본문

          </div>
          애니정보 홈
        </div>
      </div>
    </div>

  </div>
</template>

<style>


</style>

<script lang="ts">
import AnimeRank from "@/components/AnimeRank.vue";
import {Options, Vue} from "vue-class-component";
import Nabi from "@/utils/nabi";

@Options({
  computed: {
  },
  components: {
    AnimeRank
  },
  created() {
    this.view();
    this.list();
  },
  methods: {
    view() {
      const animeNo = Number(Nabi.address().getParameter("animeNo") || '0');
      if ((this.animeNo = typeof animeNo == 'number' && animeNo > 0 ? animeNo : 0) == 0) {
        return;
      }

    },
    list() {

    }
  }
})

export default class Anime extends Vue {
  data() {
    return {
      animeNo: 0
    };
  }
}
</script>
