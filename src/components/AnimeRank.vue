<template>
  <div class="anime-rank">
    <div>애니메이션 순위</div>
    <div>
      <div v-for="node in stocks" :key="node">ㅁㅁㅁㅁ {{node}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  methods: {
    load() {
      console.log('load ActiveBoard')
      this.stocks = [1,2,3,4,5,6,7];
    }
  },
  created() {
    this.load();
  },
})
export default class AnimeRank extends Vue {
  data() {
    return {
      stocks: [] as any[]
    };
  }
}
</script>

<style>
.anime-rank {}

</style>
