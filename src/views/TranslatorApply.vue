<template>
  <div @click="clickAutocorrect">
    <div class="basic-layout">
      <div class="basic-layout-mono" id="tr-apply">
        <div class="base-mat">

          <div class="doc-title">자막</div>


          <!-- list -->
          <div>
            <table class="list">
              <tr v-for="node in list.content" :key="node.animeNo" :class="({sel: node.animeNo == animeNo})">
                <td class="anime-no">{{node.animeNo}}</td>
                <td class="main">
                  <div class="subject"><router-link :to="hrefList(node.animeNo)">{{node.subject}}</router-link></div>
                  <div class="info a-text-style">
                    <span class="x-tag" v-for="tag in node.info" :key="tag">{{tag}}</span>
                    <span class="x-tag" v-for="tag in node.genres.split(/,/g)" :key="tag"><router-link :to="`/anime?q=%23${encodeURIComponent(tag)}`">{{tag}}</router-link></span>
                    <span class="x-tag" v-if="node.website"><a :href="node.website" target="_blank" class="fas fa-home"></a></span>
                    <span class="x-tag" v-if="node.captionCount"><span class="fas fa-closed-captioning">&nbsp;{{node.captionCount}}</span></span>
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <div class="anime-empty" v-if="list.content.length == 0">
            해당하는 애니메이션이 존재하지 않습니다.
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
      const animeNo = this.animeNo = Nabi.address().getIntParameter("animeNo");
      this.query = (Nabi.address().getParameter("q") || '').trim();
      this.page = Math.max(Nabi.address().getIntParameter("page"), 1) - 1;
      const pageQuery = `${this.page} ${this.query}`;
      this.autoIndex = -1;
      this.autoOn = false;
      if (this.query != this.autoQuery) {
        this.autoList = [];
      }

      // view
      if (animeNo > 0) {
        AnimeService.getAnime(animeNo, anime => {
          AnimeService.toInfo(anime);
          this.anime = anime;
        });
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
        this.autoOn = true;
        AnimeService.getAnimeAutocorrect(word, list => this.autoList = AnissiaUtil.highlight(word, list))
      }
    },
    keyAutocorrect(event: KeyboardEvent) {
      const key = event.key;
      const len = this.autoList.length;

      switch (key) {
        case 'ArrowUp':
          if (len) {
            event.preventDefault();
            if (this.autoIndex == -1) { this.autoIndex = len -1; } else { this.autoIndex--; }
          }
          return;
        case 'ArrowDown':
          if (len) {
            event.preventDefault();
            if (this.autoIndex >= (len -1)) { this.autoIndex = -1; } else { this.autoIndex++; }
          }
          return;
        case 'Enter':
          if (!this.autoList || this.autoIndex == -1) {
            this.search();
          } else {
            this.$router.push(`/anime?animeNo=${this.autoList[this.autoIndex].key}`)
          }
          return;
      }
    },
    clickAutocorrect(event: MouseEvent) {
      this.autoOn = Nabi.matchesParents(event.target, ['#anime .search']) != '';
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
        this.$router.push('/anime');
      }
    }
  }
})

export default class TranslatorApply extends Vue {
  data() {
    return {
      anime: null as any,
      animeNo: -1,
      query: '',
      autoQuery: '',
      autoList: [],
      autoOn: false,
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
#anime .anime-view-error { font-size:24px; text-align: center; line-height: 2; margin:50px 0 70px; }
#anime .anime-empty { text-align: center; padding: 200px 0; }

#anime table { }
#anime table.list { margin-top:6px;  width:100% }
#anime table.list th { height:40px;  }
#anime table.list td { font-size:13px; padding:10px 4px; border-top-width: 1px; line-height: 1.5 }
#anime table.list td.anime-no { text-align: center; width:60px; }
#anime table.list td div.subject { font-size:15px; padding-top:2px; }
#anime table.list td div.info { padding:4px 0 2px; }
#anime table.list tr.sel td { font-weight: bold }

#anime .view { padding: 8px 8px 40px; }
#anime .view table.view-info { min-width:400px }
#anime .view .title { line-height: 2; font-size:20px; font-weight: bold; padding:8px 2px 12px; }
#anime .view .in-tag:not(:first-child):before { content: ', ' }
#anime .view table.basic-info tr.basic-info-tr > td { border-width: 1px; line-height: 32px; padding:8px 16px }
#anime .view .caption-title { line-height: 2; font-size:18px; font-weight: bold; padding:14px 2px 12px; }
#anime .view .caption table th,
#anime .view .caption table td { border-width: 1px; padding:8px 16px; text-align: center }

#anime .search { padding: 40px 40px; }
#anime .search .search-box { }
#anime .search .search-box input { width:100%; height:40px; padding:0 8px; font-size:16px; }
#anime .search .autocorrect { height:0; font-size:15px; }
#anime .search .autocorrect .autocorrect-box { position: relative; backdrop-filter:blur(3px);border-width: 0 1px 1px;}
#anime .search .autocorrect div.node { padding:8px 12px; }
#anime .search .autocorrect div.node.sel,
#anime .search .autocorrect div.node:hover { font-weight: bold; }

html.light #anime .search .autocorrect .autocorrect-box { background: rgba(255, 255, 255, .7); border:1px solid #eee; }
html.light #anime .search .autocorrect div.node span { color:#2f7cbd }
html.light #anime table.list a { color:#444; text-decoration: none }

html.dark #anime .search .autocorrect .autocorrect-box { background: rgba(0, 0, 0, .7); border:1px solid #333; }
html.dark #anime .search .autocorrect div.node span { color:#2e7bb5 }
html.dark #anime table.list a { color:#aaa; text-decoration: none }

@media (max-width: 800px) {
  #anime .mob-hide { display: none; }
  #anime .search { padding:10px 0 6px; }
  #anime .search .autocorrect div.node { padding:16px; }
  #anime .view table.view-info { width:100% }
}

</style>