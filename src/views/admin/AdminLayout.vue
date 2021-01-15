<template>
  <div>
    <div v-if="user.isAdmin">
      <div class="basic-layout">
        <div class="basic-layout-right">
          <div class="base-mat">
            최근수정
          </div>
        </div>
        <div id="home" class="basic-layout-main">
          <div class="base-mat">

            <div class="home-anime-rank">
              <AnimeRank mode="static"/>
            </div>

            <div class="doc-title">액티브 패널</div>
            <div>
              내용
              <br/><br/><router-link to="/notice">공지사항</router-link> / <router-link to="/inquiry">문의</router-link>
              <br/><br/>
            </div>

            <div class="recent">
              <div class="recent-unit">
                <div class="doc-title">공지사항</div>
                <BoardRecent ticker="notice" :list="noticeList"/>
              </div>
              <div class="recent-unit">
                <div class="doc-title">문의 게시판</div>
                <BoardRecent ticker="inquiry" :list="inquiryList"/>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
    <div v-else>
      <p404/>
    </div>
  </div>
</template>


<script lang="ts">
import {Options, Vue} from "vue-class-component";
import P404 from "@/views/404.vue";

@Options({
  computed: {
    user() {
      return this.$store.user;
    },
  },
  components: {
    P404
  },
  created() {

  },
  methods: {

  }
})

export default class Home extends Vue {
  data() {
    return {
      noticeList: [],
      inquiryList: []
    };
  }
}
</script>

<style>
#home .base-mat { padding: 8px; }
#home .doc-title { font-size: 20px; border-bottom: 1px solid #276998; color: #276998; padding: 6px 8px 8px; }

@media (min-width: 1024px) {
  #home .home-anime-rank { display: none; }
  #home .recent { overflow:auto }
  #home .recent .recent-unit { float:left; width:50%; box-sizing: border-box }
}

</style>