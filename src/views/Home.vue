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
        <Feed />
      </div>
    </div>

  </div>
</template>

<style>


</style>

<script lang="ts">
import Feed from "@/components/Feed.vue";
import LatestDocs from "@/components/LatestDocs.vue";
import RankBoard from "@/components/RankBoard.vue";
import {Options, Vue} from "vue-class-component";

@Options({
  computed: {
  },
  components: {
    Feed,
    LatestDocs,
    RankBoard
  },
  methods: {
  }
})

export default class Home extends Vue {
  data() {
    return {};
  }
}
</script>
