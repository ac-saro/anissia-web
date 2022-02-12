<template>
  <div>
    <div class="basic-layout">
      <div id="inquiry" class="basic-layout-mono">
        <div class="base-mat">
          <Board ticker="inquiry"/>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
#inquiry .base-mat { padding: 8px 0; }
</style>

<script lang="ts">
import Board from "@/components/Board.vue";
import {Options, Vue} from "vue-class-component";

@Options({
  components: {
    Board
  }
})

export default class Inquiry extends Vue {}
</script>
