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
          <Board ticker="notice"/>
        </div>
      </div>
    </div>

  </div>
</template>

<style>


</style>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import AnimeRank from "@/components/AnimeRank.vue";
import Board from "@/components/Board.vue";

@Options({
  computed: {
  },
  components: {
    AnimeRank,
    Board
  },
  methods: {
  }
})

export default class Notice extends Vue {
  data() {
    return {};
  }
}
</script>
