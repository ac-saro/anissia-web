<template>
  <div class="bbs-recent doc-area a-text-style">

    <table class="topics">
      <tr v-for="node in list" :key="node.topicNo">
        <td class="title">
          <router-link :to="`/${ticker}?topicNo=${node.topicNo}`">{{node.title}} {{node.postCount ? '('+node.postCount+')' : ''}}</router-link>
        </td>
        <td class="date mob-hide">{{norDate(node)}}</td>
      </tr>
      <div v-if="list.length == 0" class="empty">
        등록된 글이 없습니다.
      </div>
    </table>

  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import AnissiaUtil from "@/utils/AnissiaUtil"

@Options({
  props: {
    ticker: String,
    list: Array
  },
  methods: {
    norDate(node: any) {
      return AnissiaUtil.ymdOrDynamicAgo(node.regDt);
    }
  }
})

export default class BoardRecent extends Vue {}

</script>

<style>
.bbs-recent { padding-top:4px; }
.bbs-recent .topics { width:100%; }
.bbs-recent .topics td { padding:12px 10px; font-size:14px; height:40px; line-height: 1.5; border-bottom-width: 1px }
.bbs-recent .topics td.title { padding:0 0 0 8px; }
.bbs-recent .topics td.date { padding:0 8px 0 0; text-align:right; }
.bbs-recent .topics .empty { text-align: center; padding:90px 0; }

@media (max-width: 500px) {
  .bbs-recent .mob-hide { display: none }
}

html.light .bbs-recent .topics td a { color:#444 }

html.dark .bbs-recent .topics td a { color:#999 }
</style>
