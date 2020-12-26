<template>
  <div>
    <div class="basic-layout">
      <div class="basic-layout-right">
        <div class="base-mat">
          <AnimeRank />
        </div>
      </div>
      <div class="basic-layout-main">
        1111
      </div>
    </div>

  </div>
</template>

<style>


</style>

<script lang="ts">
import AnimeRank from "@/components/AnimeRank.vue";
import {Options, Vue} from "vue-class-component";

@Options({
  computed: {
  },
  components: {
    AnimeRank
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
