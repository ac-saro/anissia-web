<template>
  <div @click="clickAutocorrect">
    <div class="basic-layout">
      <div class="basic-layout-mono" id="tr-apply">
        <div class="base-mat">

          <div class="doc-title fo">
            <div class="fl">자막제작자 신청</div>
            <div v-if="applyNo == -1 && hasPer('apply')" class="fr"><input type="button" class="std-inp-btn" value="글쓰기" @click="$router.push('?applyNo=0')"/></div>
            <div v-if="applyNo > 0" class="fr"><input type="button" class="std-inp-btn" value="목록" @click="$router.push($route.path)"/></div>
          </div>

          <!-- apply -->
          <div v-if="applyNo == 0" class="app">
            <div class="agree">
              <div class="subject">자막제작자 신청 동의사항</div>
              <ul>
                <li>권한신청을 위해서 4편이상(동일작품)의 자막 작업물이 있어야 합니다.</li>
                <li>블로그 내에 불법영상이나 불건전한 정보가 있을 경우 거부될 수 있습니다.</li>
                <li>권한 부여 후에도 위와 같은 사항이 발견되면 고지 없이 권한이 회수될 수 있습니다.</li>
                <li>자막 도용시 추후에 적발되더라도 권한이 회수될 수 있습니다.</li>
              </ul>
              <div class="sign">
                <label><input type="checkbox" /> 위 사항을 읽고 확인하였습니다.</label>
              </div>
            </div>

            <div class="report">
              <div class="subject">블로그주소</div>
              <div class="pad">
                <input type="text" class="std-inp-txt basic-border-color" placeholder="http://example-blog.com - 동일작 기준 4편이상 자막 확인을 위한 블로그 주소 입력" />
              </div>

            </div>

            <div class="submit">
              <input class="std-inp-btn" type="button" value="신청하기"/>
            </div>
          </div>
          <!-- view -->
          <div v-if="applyNo != 0" class="view">
            <div class="subject">자막제작자 신청 진행사항</div>
            <div>
              <table class="report">
                <tr><th>심사번호</th><td>11</td></tr>
                <tr><th>상태</th><td>11</td></tr>
                <tr><th>신청자</th><td>11</td></tr>
                <tr><th>블로그주소</th><td>11</td></tr>
              </table>

            </div>

            <div>
              <table>
                <tr>
                  <td>의견</td>
                  <td>박용서: 가나다라마바바사</td>
                </tr>
              </table>
            </div>
          </div>

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
  computed: {
    user() {
      return this.$store.state.user;
    }
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
      const applyNo = this.applyNo = Nabi.address().getIntParameter("applyNo");
      this.query = (Nabi.address().getParameter("q") || '').trim();
      this.page = Math.max(Nabi.address().getIntParameter("page"), 1) - 1;
      const pageQuery = `${this.page} ${this.query}`;
      this.autoIndex = -1;
      this.autoOn = false;
      if (this.query != this.autoQuery) {
        this.autoList = [];
      }

      // view
      if (applyNo > 0) {
        AnimeService.getAnime(applyNo, anime => {
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
    hasPer(action: string, node: (any | null) = null) {
      const user = this.user;
      if (!user.isLogin) { return false; }
      return true;
      // switch (action) {
      //   case 'apply': return !user.isAdmin;
      //
      // }
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
      this.autoOn = Nabi.matchesParents(event.target, ['#tr-apply .search']) != '';
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
      view: null as any,
      applyNo: -1,
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

#tr-apply .base-mat { padding: 8px; }
#tr-apply .fo { overflow: auto; }
#tr-apply .fl { float:left; }
#tr-apply .fr { float:right; text-align: right }
#tr-apply .doc-title { padding:0 !important; overflow: auto }
#tr-apply .doc-title .fl { padding: 6px 8px 10px; }
#tr-apply .doc-title .fr { padding:5px 4px 0 0; }
#tr-apply .doc-title input { border-width:0; height:32px; }
#tr-apply .app .subject { font-size:18px; font-weight: bold; padding:18px 4px 10px; }
#tr-apply .app input[type=text],
#tr-apply .app input[type=button]{ height: 40px; }
#tr-apply .app .agree ul { padding: 0 0 0 28px; margin:0; }
#tr-apply .app .agree ul li { font-size:14px; line-height:1.8 }
#tr-apply .app .agree .sign { padding:16px 4px; font-size:14px; }
#tr-apply .app .report .pad { padding:0 4px; }
#tr-apply .app .report input { width:100%; padding:0 8px; border-width:1px; }
#tr-apply .app .report .info { font-size:14px; opacity: .8 }
#tr-apply .app .submit { padding:36px 4px 48px; }
#tr-apply .app .submit input { padding:0 24px; border:0; }

#tr-apply .view .subject { font-size:18px; font-weight: bold; padding:18px 4px 10px; }
#tr-apply .view table.report { min-width:40%; margin: 12px 0 20px; }
#tr-apply .view table.report th { width:100px; text-align: left }
#tr-apply .view table.report th,
#tr-apply .view table.report td{ border-width: 1px; padding: 8px 12px }



#tr-apply table { }
#tr-apply table.list { margin-top:6px;  width:100% }
#tr-apply table.list th { height:40px;  }
#tr-apply table.list td { font-size:13px; padding:10px 4px; border-top-width: 1px; line-height: 1.5 }
#tr-apply table.list td.anime-no { text-align: center; width:60px; }
#tr-apply table.list td div.subject { font-size:15px; padding-top:2px; }
#tr-apply table.list td div.info { padding:4px 0 2px; }
#tr-apply table.list tr.sel td { font-weight: bold }

#tr-apply .view { padding: 8px 8px 40px; }
#tr-apply .view table.view-info { min-width:400px }
#tr-apply .view .title { line-height: 2; font-size:20px; font-weight: bold; padding:8px 2px 12px; }
#tr-apply .view .in-tag:not(:first-child):before { content: ', ' }
#tr-apply .view table.basic-info tr.basic-info-tr > td { border-width: 1px; line-height: 32px; padding:8px 16px }
#tr-apply .view .caption-title { line-height: 2; font-size:18px; font-weight: bold; padding:14px 2px 12px; }
#tr-apply .view .caption table th,
#tr-apply .view .caption table td { border-width: 1px; padding:8px 16px; text-align: center }

#tr-apply .search { padding: 40px 40px; }
#tr-apply .search .search-box { }
#tr-apply .search .search-box input { width:100%; height:40px; padding:0 8px; font-size:16px; }
#tr-apply .search .autocorrect { height:0; font-size:15px; }
#tr-apply .search .autocorrect .autocorrect-box { position: relative; backdrop-filter:blur(3px);border-width: 0 1px 1px;}
#tr-apply .search .autocorrect div.node { padding:8px 12px; }
#tr-apply .search .autocorrect div.node.sel,
#tr-apply .search .autocorrect div.node:hover { font-weight: bold; }

html.light #tr-apply .search .autocorrect .autocorrect-box { background: rgba(255, 255, 255, .7); border:1px solid #eee; }
html.light #tr-apply .search .autocorrect div.node span { color:#2f7cbd }
html.light #tr-apply table.list a { color:#444; text-decoration: none }

html.dark #tr-apply .search .autocorrect .autocorrect-box { background: rgba(0, 0, 0, .7); border:1px solid #333; }
html.dark #tr-apply .search .autocorrect div.node span { color:#2e7bb5 }
html.dark #tr-apply table.list a { color:#aaa; text-decoration: none }

@media (max-width: 800px) {
  #tr-apply .mob-hide { display: none; }
  #tr-apply .search { padding:10px 0 6px; }
  #tr-apply .search .autocorrect div.node { padding:16px; }
  #tr-apply .view table.view-info { width:100% }
}

</style>