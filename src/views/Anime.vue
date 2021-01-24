<template>
  <div>
    <div class="basic-layout">
      <div class="basic-layout-right">
        <div class="base-mat">
          <AnimeRank />
        </div>
      </div>
      <div class="basic-layout-main" id="anime">
        <div class="base-mat">

          <div class="doc-title">애니메이션 정보</div>

          <!-- view -->
          <div v-if="anime">
            <div v-if="anime.animeNo">
              <div class="doc-title">{{anime.subject}}</div>
              <div class="anime-view">
                <table class="view">
                  <tr><td>장르</td><td>{{anime.genres.replace(',', ', ')}}</td></tr>
                  <tr><td>시작일</td><td>{{anime.startDate}}</td></tr>
                  <tr><td>종료일</td><td>{{anime.endDate}}</td></tr>
                  <tr><td>웹사이트</td><td><a :href="anime.website" target="_blank">{{anime.website}}</a></td></tr>
                </table>

                <div v-if="anime.captions && anime.captions.length" >
                  <div class="doc-title">자막</div>
                  <table class="caption">
                    <tr v-for="caption in anime.captions" :key="caption.name">
                      <td>{{caption.episode}}</td>
                      <td>{{caption.name}}</td>
                      <td>{{caption.updDt}}</td>
                      <td><a :href="caption.website" target="_blank">자막</a></td>
                    </tr>
                  </table>
                </div>

              </div>
            </div>
            <div v-else>
              <div class="doc-title">애니메이션 정보 (존재하지 않는 번호)</div>
              <div class="anime-view-error">
                존재하지 않거나<br/>삭제된 애니메이션 입니다.
              </div>
            </div>
          </div>

          <div class="search">
            <div>
              <input type="text" v-model="query" @keyup.enter="search()" @keyup="autocorrect"/>
            </div>
            <div>
              <div v-for="node in autoList" :key="node.key">
                {{node}}
              </div>
            </div>
          </div>

          <!-- list -->
          <div>
            <table class="list">
              <tr v-for="node in list.content" :key="node.animeNo">
                <td class="anime-no">{{node.animeNo}}</td>
                <td class="main">
                  <div class="subject"><router-link :to="hrefList(node.animeNo)">{{node.subject}}</router-link></div>
                  <div class="info a-text-style">
                    <span class="x-tag" v-for="tag in node.info" :key="tag">{{tag}}</span>
                    <span class="x-tag" v-for="tag in node.genres.split(/,/g)" :key="tag"><router-link :to="`/anime?q=%23${encodeURIComponent(tag)}`">{{tag}}</router-link></span>
                    <span class="x-tag" v-if="node.website"><a :href="node.website" target="_blank" class="fas fa-home"></a></span>
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <!-- page -->
          <div>
            <pagination :total="list.totalPages" :index="page" :unit="10" :href="hrefPage" :key="$route.fullPath"/>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>



<script lang="ts">
import AnimeRank from "@/components/AnimeRank.vue";
import {Options, Vue} from "vue-class-component";
import Nabi from "@/utils/nabi";
import PageData from "@/models/PageData";
import Pagination from "@/components/Pagination.vue";
import AnimeService from "@/service/AnimeService";
import AnissiaUtil from "@/utils/AnissiaUtil";

@Options({
  components: {
    AnimeRank,
    Pagination
  },
  created() {
    this.load();
  },
  watch: {
    $route(to, from) {
      this.load();
    }
  },
  methods: {
    load() {
      const animeNo = Nabi.address().getIntParameter("animeNo");
      this.query = (Nabi.address().getParameter("q") || '').trim();
      this.page = Math.max(Nabi.address().getIntParameter("page"), 1) - 1;
      const pageQuery = `${this.page} ${this.query}`;

      // view
      if (animeNo > 0) {
        AnimeService.getAnime(animeNo, anime => this.anime = anime);
      } else {
        this.anime = null;
      }

      // list
      if (this.pageQuery != pageQuery) {
        this.pageQuery = pageQuery;
        AnimeService.getList(this.query, this.page, list => {
          list.content.forEach(e => e.info = AnimeService.toInfo(e));
          this.list = list;
        });
      }
    },
    autocorrect(event: KeyboardEvent) {
      const word = (event.target as any).value;
      if (this.autoQuery != word) {
        this.autoQuery = word;
        AnimeService.getAnimeAutocorrect(word, list => this.autoList = AnissiaUtil.highlight(word, list))
      }
    },
    hrefList(animeNo: number) {
      return Nabi.address().setParameter('animeNo', animeNo).href;
    },
    hrefPage(index: number) {
      return Nabi.address().deleteParameter('animeNo').setParameter('page', index + 1).href;
    },
    search() {
      const q = this.query.trim();
      if (q) {
        this.$router.push(Nabi.address().deleteParameter(['page', 'animeNo']).setParameter('q', q).href);
      } else {
        Nabi.address().clearParameter().href;
      }
    }
  }
})

export default class Anime extends Vue {
  data() {
    return {
      anime: null as any,
      query: '',
      autoQuery: '',
      autoList: [],
      autoIndex: -1,
      page: 0,
      pageQuery: '',
      list: new PageData()
    };
  }
}
</script>

<style>

#anime .base-mat { padding: 8px; }
#anime .doc-title { font-size: 20px; border-bottom: 1px solid #276998; color: #276998; padding: 6px 8px 8px; }
#anime .anime-view-error { font-size:24px; text-align: center; line-height: 2; margin:50px 0 70px; }

#anime table { width:100% }
#anime table.list { margin-top:6px }
#anime table.list th { height:40px;  }
#anime table.list td { font-size:13px; padding:10px 4px; border-bottom-width: 1px; line-height: 1.5 }
#anime table.list td.anime-no { text-align: center; width:60px; }
#anime table.list td div.subject { font-size:15px; padding-top:2px; }
#anime table.list td div.info { padding:4px 0 2px; }


@media (max-width: 800px) {
  #anime .mob-hide { display: none; }
}

</style>