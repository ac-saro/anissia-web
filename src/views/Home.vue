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

          <div class="doc-title">임시알림</div>
          <div style="font-size:14px; padding:8px 12px 12px; line-height: 1.8;">
            리뉴얼 이후, 계정을 분실하신 회원분들이 많아
            <router-link to="/recover/email">아이디찾기 (임시)</router-link>,
            <router-link to="/recover">암호분실</router-link>
            메뉴를 오픈하였습니다.<br/>
          </div>

          <div class="home-anime-rank active-panel-wrap">
            <AnimeRank mode="static"/>
          </div>

          <div class="doc-title">운영기록</div>
          <div class="active-panel-wrap">
            <active-panel :admin="false"/>
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

@Options({
  computed: {
  },
  components: {
    AnimeRank,
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
#home .base-mat { padding: 8px 8px 0; }
#home .doc-title { font-size: 20px; border-bottom: 1px solid #276998; color: #276998; padding: 6px 8px 8px; }
#home .doc-title a { text-decoration: none }
#home .active-panel-wrap { padding-bottom: 16px; }

@media (max-width:800px) {
  #home .active-panel tr:nth-child( n + 6 ) { display: none }
}

@media (max-width: 1023px) {
  #home .active-panel tr:nth-child( n + 11 ) { display: none }
}

@media (min-width: 1024px) {
  #home .home-anime-rank { display: none; }
  #home .recent { overflow:auto }
  #home .recent .recent-unit { float:left; width:50%; box-sizing: border-box }
}

</style>