<template>
  <div>
    <div class="basic-layout">
      <div id="notice" class="basic-layout-mono">
        <div class="base-mat">
          <Board ticker="notice"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import Board from "@/components/Board.vue"

@Options({
  components: {
    Board
  }
})

export default class Notice extends Vue {}
</script>

<style>
#notice .base-mat { padding: 8px; }
</style>
