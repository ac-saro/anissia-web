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

          <div class="recent-caption-mob">
            <AnimeCaptionRecent mode="static"/>
          </div>

          <div class="home-anime-rank active-panel-wrap">
            <div class="doc-title">애니메이션 순위</div>
            <AnimeRank mode="static"/>
          </div>

          <div class="recent">
            <div class="recent-unit active-panel-wrap">
              <div class="doc-title"><router-link to="/notice">공지사항</router-link></div>
              <BoardRecent ticker="notice" :list="noticeList"/>
            </div>
            <div class="recent-unit active-panel-wrap">
              <div class="doc-title"><router-link to="/inquiry">문의 게시판</router-link></div>
              <BoardRecent ticker="inquiry" :list="inquiryList"/>
            </div>
          </div>

          <div class="recent-caption-full">
            <AnimeCaptionRecent />
          </div>

          <div class="doc-title">운영기록</div>
          <div class="active-panel-wrap">
            <active-panel :admin="false"/>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>


<script lang="ts">
import AnimeRank from "@/components/AnimeRank.vue";
import {Options, Vue} from "vue-class-component";
import BoardRecent from "@/components/BoardRecent.vue";
import BoardService from "@/service/BoardService";
import ActivePanel from "@/components/ActivePanel.vue";
import AnimeCaptionRecent from "@/components/AnimeCaptionRecent.vue";
import Anime from "@/views/Anime.vue";

@Options({
  computed: {
  },
  components: {
    Anime,
    AnimeRank,
    AnimeCaptionRecent,
    BoardRecent,
    ActivePanel
  },
  created() {
    this.recent();
  },
  methods: {
    recent() {
      BoardService.getRecentHome(data => {
        this.noticeList = data.notice;
        this.inquiryList = data.inquiry;
      });
    }
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
#home .base-mat { padding: 6px 0 0; }
#home .active-panel-wrap { padding-bottom: 16px; }

@media (max-width:800px) {
  #home .active-panel tr:nth-child( n + 6 ) { display: none }
}

@media (max-width: 1023px) {
  #home .active-panel tr:nth-child( n + 11 ) { display: none }
  #home .recent-caption-full { display: none }
}

@media (min-width: 1024px) {
  #home .home-anime-rank { display: none; }
  #home .recent-caption-mob { display: none }
  #home .recent { overflow:auto }
  #home .recent .recent-unit { float:left; width:50%; box-sizing: border-box }
}

</style>
