<template>
  <div>
    <div class="basic-layout">
      <div class="basic-layout-right">
        <div class="base-mat">
          <AnimeRank />
        </div>
      </div>
      <div id="home" class="basic-layout-main">
        <div class="base-mat">
          <div class="home-anime-rank">
            <AnimeRank mode="static"/>
          </div>
            asdfs

          <br/><br/><router-link to="/notice">공지사항</router-link>
          <br/><br/><router-link to="/inquiry">문의</router-link>
          <br/><br/>


        <!-- <saro-markdown v-model="aaa" placeholder="aaa" />   -->

        </div>
      </div>
    </div>

  </div>
</template>


<script lang="ts">
import AnimeRank from "@/components/AnimeRank.vue";
import {Options, Vue} from "vue-class-component";

@Options({
  computed: {
  },
  components: {
    AnimeRank
  },
  created() {
    console.log('created');
  },
  methods: {
  }
})

export default class Home extends Vue {
}
</script>

<style>


@media (min-width: 1024px) {
  #home .home-anime-rank { display: none; }
}

</style>