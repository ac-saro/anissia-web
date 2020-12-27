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
        </div>
      </div>
    </div>

  </div>
</template>


<script lang="ts">
import AnimeRank from "@/components/AnimeRank.vue";
import {Options, Vue} from "vue-class-component";

@Options({
  computed: {
  },
  components: {
    AnimeRank
  },
  methods: {
  }
})

export default class Home extends Vue {
  data() {
    return {};
  }
}
</script>

<style>


@media (min-width: 1024px) {
  #home .home-anime-rank { display: none; }
}

</style>