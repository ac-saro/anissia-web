<template>
  <div>
    <div class="basic-layout">
      <div class="basic-layout-left">
        <div class="base-mat">
          <ActiveBoard />
        </div>
      </div>
      <div class="basic-layout-right">
        <div class="base-mat">
          <AnimeRank />
        </div>
      </div>
      <div class="basic-layout-main">
        문의
      </div>
    </div>

  </div>
</template>

<style>


</style>

<script lang="ts">
import Feed from "@/components/Feed.vue";
import ActiveBoard from "@/components/ActiveBoard.vue";
import AnimeRank from "@/components/AnimeRank.vue";
import {Options, Vue} from "vue-class-component";

@Options({
  computed: {
  },
  components: {
    Feed,
    ActiveBoard,
    AnimeRank
  },
  methods: {
  }
})

export default class Inquiry extends Vue {
  data() {
    return {};
  }
}
</script>
