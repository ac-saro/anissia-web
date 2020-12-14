<template>
  <div>
    <div class="basic-layout">
      <div class="basic-layout-left">
        <div class="base-mat">
          <LatestDocs />
        </div>
      </div>
      <div class="basic-layout-right">
        <div class="base-mat">
          <RankBoard />
        </div>
      </div>
      <div class="basic-layout-main">
        <div class="base-mat">
          종목피드 {{$route.params.id}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LatestDocs from "@/components/LatestDocs.vue";
import RankBoard from "@/components/RankBoard.vue";
import {Options, Vue} from "vue-class-component";

@Options({
  components: {
    LatestDocs,
    RankBoard
  },
  methods: {
  }
})

export default class StockFeed extends Vue {

}
</script>
