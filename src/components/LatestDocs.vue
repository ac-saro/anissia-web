<template>
  <div class="latest-docs">
    <div>최근변경 문서 리스트</div>
    <div>
      <div v-for="node in stocks" :key="node">최근변경 {{node}}</div>
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
.latest-docs {}

</style>
