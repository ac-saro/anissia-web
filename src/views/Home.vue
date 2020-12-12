<template>
  <div id="home" class="doc-area">
    <div class="rank">
      <table class="rank-type">
        <tr>
          <th v-for="node in rankTab" :key="node.value" 
              :title='node.title'
              @click="loadRank(node.value)"
              :class="{'rank-type-sel': rankSelect === node.value}">
            {{node.name}}
          </th>
        </tr>
      </table>
      <div v-for="rankType in rankTab" :key="rankType.value">
        <table v-if="rankSelect === rankType.value" class="rank-table" :class="{'rank-mob-limit': !rankMobFullDisplay}">
          <tr v-for="node in rank[rankType.value]" :key="node.an">
            <td class="rank-ranking">{{node.ranking}}</td>
            <td class="rank-info" :colspan="node.changeStatus() === '' ? '2' : '1'">
              <div><router-link :to="hrefAnimeByRank(node)">{{node.subject}}</router-link></div>
              <div class="rank-tags">
                <span v-for="genre in node.genreList()" :key="genre">#{{genre}}</span>
              </div>
            </td>
            <td class="rank-change" v-if="node.changeStatus() !== ''">
              <div v-if="node.changeStatus() === 'new'" class="rank-new" title="신규진입">◆◆</div>
              <div v-else-if="node.changeStatus() === 'up'" class="rank-up">▲ {{node.change()}}</div>
              <div v-else-if="node.changeStatus() === 'down'" class="rank-down">▼ {{node.change()}}</div>
            </td>
          </tr>
        </table>
      </div>
      <div class="rank-mob-more" v-if="!rankMobFullDisplay" @click="rankMobFullDisplay = true">애니메이션 순위 펼쳐보기</div>
    </div>

    <div class="main">
      <div class="shortcut">
        <table>
          <tr>
            <td>
              <router-link to="/timetable">
                <div><img src="@/assets/pages/home-nav-timetable.svg" /></div>
                <div>애니<span class="full">메이션</span> 편성표</div>
              </router-link>
            </td>
            <td>
              <router-link to="/anime">
                <div><img src="@/assets/pages/home-nav-anime.svg" /></div>
                <div>애니<span class="full">메이션</span> 정보</div>
              </router-link>
            </td>
            <td :class="{'mob-hide': !isLogin()}">
              <router-link to="/manage" v-if="enableAdminPage()" title="키보드 'a'키 3연타로 이동가능">
                <div><img src="@/assets/pages/home-nav-manage.svg" /></div>
                <div><span class="full">애니시아 </span>관리자</div>
              </router-link>
              <router-link to="/apply" v-else>
                <div><img src="@/assets/pages/home-nav-apply.svg" /></div>
                <div>자막<span class="full"> 제작자 </span>권한신청</div>
              </router-link>
            </td>
            <td :class="{'mob-hide': isLogin()}">
              <router-link to="/user" v-if="isLogin()">
                <div><img src="@/assets/pages/home-nav-user.svg"/></div>
                <div>회원정보<span class="full"> 열람/수정</span></div>
              </router-link>
              <router-link to="/register" v-else>
                <div><img src="@/assets/pages/home-nav-register.svg"/></div>
                <div><span class="full">애니시아 </span>회원가입</div>
              </router-link>
            </td>
          </tr>
        </table>
      </div>
      <div class="recent-area">
        <div class="recent-title"><i class="fas fa-clipboard-list" style="color:#92b5ce"></i> <span>운영기록</span></div>
        <Asl mode="view"/>
      </div>
      <div class="recent-board recent-area">
        <div class="recent-title"><i class="fas fa-rss" style="color:#efbade"></i> <span>새소식</span></div>
        <table>
          <tr v-for="node in recentBoard" :key="node.bn">
            <td>
              <router-link :to="node.url">{{node.subject}}</router-link>
            </td>
            <td class="mob-hide node-date">
              {{node.regDt}}
            </td>
          </tr>
        </table>
      </div>
    </div>

  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Nabi from '@/utils/nabi';
import Asl from '@/components/Asl.vue';
import AnimeRank from '@/models/AnimeRank';
import BoardTopic from '@/models/BoardTopic';
import UserSession from '@/models/UserSession';
import AnimeService from '@/services/AnimeService';
import BoardService from '@/services/BoardService';
import AnissiaUtil from '@/utils/AnissiaUtil';

export default Vue.extend({
  components: {
    Asl,
  },
  data() {
    return {
      rankMobFullDisplay: false,
      rankSelect: 'animeRank1Day',
      rankTab: [
        {name: '일간', title: '24시간', value: 'animeRank1Day'},
        {name: '주간', title: '7일', value: 'animeRank7Days'},
        {name: '월간', title: '35일 (7일 * 5회)', value: 'animeRank35Days'},
      ],
      rank: {
        animeRank1Day: [] as AnimeRank[],
        animeRank7Days: [] as AnimeRank[],
        animeRank35Days: [] as AnimeRank[],
      },
      recentBoard: [] as BoardTopic[],
    };
  },
  created() {
    this.loadRank(this.rankSelect);
    this.loadRecentBoard();
  },
  methods: {
    isLogin() {
      return this.getUser().isLogin();
    },
    enableAdminPage() {
      return this.getUser().manager;
    },
    getUser() {
      return this.$store.state.user as UserSession;
    },
    hrefAnimeByRank(rank: AnimeRank) {
      return Nabi.address().setPathname('/anime').setParameter('view', rank.an).href;
    },
    loadRank(type: string) {
      if ((this.rank[type] as AnimeRank[]).length === 0) {
        AnimeService.rank(type, (list) => {
          this.rank[type] = list;
          this.rankSelect = type;
        });
      } else {
        this.rankSelect = type;
      }
    },
    loadRecentBoard() {
      BoardService.recent((e) => this.recentBoard = e);
    },
  },
});
</script>

<style>
#home .rank table { width:100%; font-size:15px; }
#home .rank th { transition: all .3s }
#home .rank table.rank-type th { cursor: pointer; line-height: 40px; border-bottom: 1px solid #eee; color:#aaa; font-size:14px; font-weight: normal }
#home .rank table.rank-type th.rank-type-sel { border-color:#366798; color:#395c7f }
#home .rank table.rank-table td { color:#555; }
#home .rank table.rank-table td.rank-ranking { width:40px; padding:0 4px; text-align: center; font-weight: 800; color:#777; font-size:12px; }
#home .rank table.rank-table td.rank-info { padding:7px 6px 6px; color:#000 }
#home .rank table.rank-table td.rank-info a { color:#485463; text-decoration: none }
#home .rank table.rank-table tr:hover td.rank-info a { color:#255898; }
#home .rank table.rank-table td.rank-info .rank-tags { padding-top:4px; font-size:12px; }
#home .rank table.rank-table td.rank-info .rank-tags > span { margin-right: 8px; color:#7a8088; cursor: default }
#home .rank table.rank-table td.rank-info .rank-tags > span:hover { color:#005aff;  }
#home .rank table.rank-table td.rank-change { width:50px; padding:0 4px; }
#home .rank table.rank-table td.rank-change div { text-align: center; white-space: nowrap; }
#home .rank table.rank-table td.rank-change .rank-up { color:#bf5757 }
#home .rank table.rank-table td.rank-change .rank-down { color:#5280b1 }
#home .rank table.rank-table td.rank-change .rank-new { color:#e66d6d }

#home .main .shortcut {font-family: "Noto Sans KR", "Malgun Gothic", "Dotum"; }
#home .main .shortcut a { color:#777; text-decoration: none; font-size:16px; }
#home .main .shortcut a:hover { color:#476a8a; }
#home .main .shortcut a:hover img { opacity: 1; filter: grayscale(0); }
#home .main .shortcut table { width:100%; }
#home .main .shortcut td { width:25%; text-align: center; padding:22px 0 16px; }
#home .main .shortcut td img { max-width: 52px; max-height: 52px; margin:0 0 10px; }

#home .main .recent-area .recent-title { line-height: 44px; font-size:14px; padding-left:6px; color:#666;  }
#home .main .recent-area .recent-title i { font-size:16px; margin-right: 2px; }
#home .main .recent-area table { width:100%; line-height: 1.8 }
#home .main .recent-area table tr td {  font-size:14px; padding:8px; }
#home .main .recent-area table tr:hover td { background: #fafafa }
#home .main .recent-area table tr td a { text-decoration: none; color:#333 }

#home .main .recent-board td.node-date { width:120px; text-align:right; color:#777 }



@media (min-width: 701px) {
  #home { padding-top:4px; }
  #home .rank { float: right; width:45%; box-sizing: border-box; padding:0 8px 0 0; }
  #home .rank table.rank-table tr:hover td { background: #f9f9f9; }
  #home .rank table.rank-table tr:hover td.rank-ranking { color:#bf5757 }
  #home .rank table.rank-table tr:hover td.rank-info { color:#4270b7}
  #home .rank table.rank-table tr:hover td.rank-info .rank-tags { color:#65756a }
  #home .rank .rank-mob-more { display:none }
  
  #home .main { margin-right:45.5%; box-sizing: border-box; padding:0 0 0 8px; }
  
  #home .main .shortcut a div img { opacity: .8; filter: grayscale(.6); transition: filter .3s, opacity .3s }
}

@media (min-width: 801px) {
  #home .rank { width:400px; }
  #home .main { margin-right: 404px; }
}

@media (max-width: 1000px) {
  #home .main .shortcut td { width:25%; text-align: center; padding:22px 0 16px; }
  #home .main .shortcut td .full { display:none }
  #home .main .shortcut td img { max-width: 32px; max-height: 32px; margin:0 0 10px; }
  #home .main .mob-hide { display:none }
}

@media (max-width: 700px) {
  #home .rank table.rank-mob-limit tr:nth-child(n+6) td { display:none }
  #home .rank .rank-mob-more { line-height: 48px; font-size:13px; text-align:center; font-weight: bold; border-bottom: 1px solid #eee; }
}

</style>
