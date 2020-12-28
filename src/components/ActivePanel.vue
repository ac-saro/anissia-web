<template>
  <div class="active-panel">
    <div>최근변경</div>
    <div>
      <div v-for="node in stocks" :key="node">최근변경 {{node}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

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
export default class ActivePanel extends Vue {
  data() {
    return {
      stocks: [] as any[]
    };
  }
}
</script>

<style>
.active-panel {}

</style>
