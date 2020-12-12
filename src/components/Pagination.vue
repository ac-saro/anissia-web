<template>
  <div class="pagination">
    
    <span>
      <router-link v-if="hasPrevUnit()" :to="href(Math.max(0, index - unit))" class="page-area">◀</router-link>
      <span v-else class="page-area page-disabled">◀</span>
    </span>

    <span v-for="node in pagination()" :key="node.index">
      <span v-if="isDisabled(node.index)" class="page-area page-disabled page-no">{{node.text}}</span>
      <span v-else-if="isNow(node.index)" class="page-area page-now page-no">{{node.text}}</span>
      <router-link v-else :to="node.href" class="page-area page-no">{{node.text}}</router-link>
    </span>

    <span>
      <router-link class="page-area" v-if="hasNextUnit()" :to="href(Math.min(total - 1, index + unit))">▶</router-link>
      <span v-else class="page-area page-disabled">▶</span>
    </span>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
  @Prop() private unit: number = 10;
  @Prop() private total!: number;
  @Prop() private index!: number;
  @Prop() private href!: ((index: number) => string);

  private isNow(index) {
    return this.index === index;
  }
  private isDisabled(index) {
    return this.total <= index;
  }
  private pagination(): any[] {
    const s = Math.floor(this.index / this.unit) * this.unit;
    const rv = [] as any[];
    for (let i = 0 ; i < this.unit ; i++) {
      rv.push({index: (s + i), text: (s + i + 1), href: this.href(s + i)});
    }
    return rv;
  }
  private hasPrevUnit(): boolean {
    return this.index > 0;
  }
  private hasNextUnit(): boolean {
    return (this.total - 1) > this.index;
  }
}
</script>

<style>
.pagination { text-align: center; padding:20px 0 80px; }
.pagination .page-area { 
  line-height: 40px; padding:0 10px; margin:0; display: inline-block; 
  font-size:15px; border:1px solid #ddd;
}
.pagination .page-area.page-no { border-width:1px 0 }
.pagination .page-area.page-disabled { color:#777 }
.pagination .page-area.page-now { color: #227fc1; font-weight: bold; }
.pagination .page-area,
.pagination a.page-area { text-decoration: none }
.pagination a.page-area { color:#333 }
.pagination a.page-area:hover { color:#227fc1 }

@media (max-width: 700px) {
  .pagination .page-area { border-width: 1px !important; margin:8px 4px; }
}
</style>
