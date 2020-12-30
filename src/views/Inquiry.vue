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
          <Board ticker="inquiry"/>
        </div>
      </div>
    </div>

  </div>
</template>

<style>


</style>

<script lang="ts">
import AnimeRank from "@/components/AnimeRank.vue";
import Board from "@/components/Board.vue";
import {Options, Vue} from "vue-class-component";

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

export default class Inquiry extends Vue {
  data() {
    return {};
  }
}
</script>
