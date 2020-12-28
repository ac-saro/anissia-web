<template>
  <div>
    <div class="basic-layout">
      <div class="basic-layout-right">
        <div class="base-mat">
          <AnimeRank />
        </div>
      </div>
      <div id="home" class="basic-layout-main">
        <div class="base-mat">
          <div class="home-anime-rank">
            <AnimeRank mode="static"/>
          </div>
asdfs



          <pagination :total="3" :index="0" :unit="10" :href="href" />



          <saro-markdown v-model="aaa" placeholder="aaa" />

          {{aaa}}
        </div>
      </div>
    </div>

  </div>
</template>


<script lang="ts">
import AnimeRank from "@/components/AnimeRank.vue";
import Pagination from "@/components/Pagination.vue";
import SaroMarkdown from "@/components/SaroMarkdown.vue";
import {Options, Vue} from "vue-class-component";

@Options({
  computed: {
  },
  components: {
    AnimeRank,
    Pagination,
    SaroMarkdown
  },
  methods: {
    href(index: number) {
      return `?page=${index}`
    },
    asdf() {


    }
  }
})

export default class Home extends Vue {
  data() {
    return {
      aaa: '간다ㅏ란망ㄹㄴ머리ㅏㅓ'
    };
  }
}
</script>

<style>


@media (min-width: 1024px) {
  #home .home-anime-rank { display: none; }
}

</style>