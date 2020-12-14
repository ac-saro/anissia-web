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
          종목메인
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

export default class Stock extends Vue {
}
</script>
