<template>
  <div class="pagination">

    <span>
      <router-link v-if="hasPrevUnit" :to="href(Math.max(0, index - unit))" class="page-area">◀</router-link>
      <span v-else class="page-area page-disabled">◀</span>
    </span>

    <span v-for="node in pagination" :key="node.index">
      <span v-if="isDisabled(node.index)" class="page-area page-disabled page-no">{{node.text}}</span>
      <span v-else-if="isNow(node.index)" class="page-area page-now page-no">{{node.text}}</span>
      <router-link v-else :to="node.href" class="page-area page-no">{{node.text}}</router-link>
    </span>

    <span>
      <router-link class="page-area" v-if="hasNextUnit" :to="href(Math.min(total - 1, index + unit))">▶</router-link>
      <span v-else class="page-area page-disabled">▶</span>
    </span>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    unit: Number, // view page count unit: ex) 5 -> ◀ 1 2 3 4 5 ▶
    total: Number, // total page count
    index: Number, // index (zero-based)
    href: Function // ( /* zero-based */ index: number) => href:String
  },
  computed: {
    hasPrevUnit(): boolean {
      return this.index > 0;
    },
    hasNextUnit(): boolean {
      return (this.total - 1) > this.index;
    },
    pagination(): any[] {
      const offset = Math.floor(this.index / this.unit) * this.unit;
      return [...new Array(this.unit).keys()].map(i => ({
        index: offset + i,
        text: offset + i + 1,
        href: this.href(offset + i)
      }))
    },
  },
  methods: {
    isNow(index: number) {
      return this.index === index;
    },
    isDisabled(index: number) {
      return this.total <= index;
    }
  }
})
export default class Pagination extends Vue {
}

</script>

<style>
.pagination { text-align: center; padding:12px 0; }
.pagination .page-area { line-height: 40px; padding:0 10px; margin:0; display: inline-block; font-size:15px; }
.pagination .page-area.page-no { border-width:1px 0 }
.pagination .page-area.page-now { font-weight: bold; }
.pagination .page-area,
.pagination a.page-area { text-decoration: none }

@media (max-width: 700px) {
  .pagination .page-area { border-width: 1px !important; margin:8px 4px; }
}

html.light .pagination .page-area { border:1px solid #ddd; }
html.light .pagination .page-area.page-disabled { color:#777 }
html.light .pagination .page-area.page-now { color: #227fc1; font-weight: bold; }
html.light .pagination a.page-area { color:#333 }
html.light .pagination a.page-area:hover { color:#227fc1 }

html.dark .pagination .page-area { border:1px solid #222; }
html.dark .pagination .page-area.page-disabled { color:#444 }
html.dark .pagination .page-area.page-now { color: #227fc1; font-weight: bold; }
html.dark .pagination a.page-area { color:#aaa }
html.dark .pagination a.page-area:hover { color:#227fc1 }
</style>
