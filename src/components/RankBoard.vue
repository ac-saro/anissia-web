<template>
  <div class="rank-board">
    <div>종목 조회 순위</div>
    <div>
      <div v-for="node in stocks" :key="node">종목 {{node}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  methods: {
    load() {
      console.log('load latest')
      this.stocks = [1,2,3,4,5,6,7];
    }
  },
  created() {
    this.load();
  },
})
export default class LatestDocs extends Vue {
  data() {
    return {
      stocks: [] as any[]
    };
  }
}
</script>

<style>
.rank-board {}

</style>
