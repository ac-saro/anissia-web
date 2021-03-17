<template>
  <div id="admin-anime" @click="clickAutocorrect">

    <table class="tab">
      <tr>
        <td><router-link to="/admin/anime" :class="({'select': status == 'list'})"><div>전체</div></router-link></td>
        <td><router-link to="/admin/anime?status=delist" :class="({'select': status == 'delist'})"><div>삭제대기</div></router-link></td>
      </tr>
    </table>

    <!-- view -->
    <form v-if="anime" class="view basic-border-color">

      <div v-if="anime.animeNo || anime.isNew">

        <div class="title">{{anime.isNew ? '애니메이션 신규등록' : '애니메이션 수정'}}</div>

        <table>
          <tr>
            <th>제목</th>
            <td><input type="text" v-model="anime.subject" placeholder="애니메이션 제목" /></td>
          </tr>
          <tr>
            <th>장르</th>
            <td>
              <div @click="genresOn = !genresOn" class="x-tag-box">
                <span class="x-tag" v-for="tag in anime.genreList" :key="tag">{{tag}}</span>
                <span class="x-tag" v-if="!anime.genreList.length">장르선택</span>
              </div>
              <div v-if="genresOn" class="input-label genre-box">
                  <span v-for="(g, i) in genres" :key="g">
                    <input name="anime-genre" :id="`anime-genre-${i}`" type="checkbox" @change="changeGenres()" :value="g" v-model="anime.genreList"/>
                    <label :for="`anime-genre-${i}`">{{g}}</label>
                  </span>
              </div>
            </td>
          </tr>
          <tr>
            <th>상태</th>
            <td class="input-label">
              <input name="anime-status" id="anime-status-on" type="radio" value="ON" v-model="anime.status"/>
              <label for="anime-status-on">편성표</label>
              <input name="anime-status" id="anime-status-off" type="radio" value="OFF" v-model="anime.status"/>
              <label for="anime-status-off">편성표-결방</label>
              <input name="anime-status" id="anime-status-end" type="radio" value="END" v-model="anime.status"/>
              <label for="anime-status-end">완결</label>
            </td>
          </tr>
          <tr>
            <th>요일</th>
            <td>
              <div class="input-label">
                <span v-for="(w, i) in week" :key="w">
                  <input name="anime-week" :id="`anime-week-${i}`" type="radio" :value="(i+'')" v-model="anime.week"/>
                  <label :for="`anime-week-${i}`">{{w}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="anime.week != '7'">
            <th>시간</th>
            <td>
              <input type="time" v-model="anime.time"/>
            </td>
          </tr>
          <tr>
            <th>시작일</th>
            <td>
              <div class="input-label">
                <input name="anime-sds" id="anime-sds-ymd" type="radio" value="YMD" v-model="anime.sds"/>
                <label for="anime-sds-ymd">YMD</label>
                <input name="anime-sds" id="anime-sds-ym" type="radio" value="YM" v-model="anime.sds"/>
                <label for="anime-sds-ym">YM</label>
                <input name="anime-sds" id="anime-sds-y" type="radio" value="Y" v-model="anime.sds"/>
                <label for="anime-sds-y">Y</label>
                <input name="anime-sds" id="anime-sds-na" type="radio" value="N" v-model="anime.sds"/>
                <label for="anime-sds-na">N/A</label>
              </div>
              <div v-if="anime.sds != 'N'" class="anime-date">
                <span><input type="text" inputmode="numeric" v-model="anime.sd1" maxlength="4"/> 년 </span>
                <span v-if="anime.sds.startsWith('YM')"><input type="text" inputmode="numeric" v-model="anime.sd2" maxlength="2"/> 월 </span>
                <span v-if="anime.sds == 'YMD'"><input type="text" inputmode="numeric" v-model="anime.sd3" maxlength="2"/> 일</span>
              </div>
            </td>
          </tr>
          <tr>
            <th>종료일</th>
            <td>
              <div class="input-label">
                <input name="anime-eds" id="anime-eds-ymd" type="radio" value="YMD" v-model="anime.eds"/>
                <label for="anime-eds-ymd">YMD</label>
                <input name="anime-eds" id="anime-eds-ym" type="radio" value="YM" v-model="anime.eds"/>
                <label for="anime-eds-ym">YM</label>
                <input name="anime-eds" id="anime-eds-y" type="radio" value="Y" v-model="anime.eds"/>
                <label for="anime-eds-y">Y</label>
                <input name="anime-eds" id="anime-eds-na" type="radio" value="N" v-model="anime.eds"/>
                <label for="anime-eds-na">N/A</label>
              </div>
              <div v-if="anime.eds != 'N'" class="anime-date">
                <span><input type="text" inputmode="numeric" v-model="anime.ed1" maxlength="4"/> 년 </span>
                <span v-if="anime.eds.startsWith('YM')"><input type="text" inputmode="numeric" v-model="anime.ed2" maxlength="2"/> 월 </span>
                <span v-if="anime.eds == 'YMD'"><input type="text" inputmode="numeric" v-model="anime.ed3" maxlength="2"/> 일</span>
              </div>
            </td>
          </tr>
          <tr>
            <th>웹사이트</th>
            <td><input type="text" v-model="anime.website" placeholder="웹사이트" /></td>
          </tr>
          <tr v-if="!anime.isNew">
            <th>자막참여자</th>
            <td class="captions">
              <span v-for="cp in anime.captions" :key="cp.name">{{cp.name}}</span>
              <input type="button" value="자막참여" @click="addCaption()" />
            </td>
          </tr>
        </table>
        <div class="edit-btn">
          <div v-if="!anime.isNew" class="edit-btn-delete"><input type="button" value="삭제" @click="deleteAnime()"/></div>
          <div class="edit-btn-save"><input type="button" :value="anime.isNew ? '추가' : '수정'" @click="saveAnime()"/></div>
        </div>

      </div>
      <div v-else>
        <div class="anime-view-error">존재하지 않거나<br/>삭제된 애니메이션 입니다.</div>
      </div>

    </form>

    <div v-if="status == 'list'" class="search a-text-style">
      <div class="search-box">
        <input type="button" @click="createAnime()" value="신규작성">
        <input type="text" class="std-inp-txt" v-model="query" @keydown="keyAutocorrect" @keyup="autocorrect" placeholder="애니메이션 검색 : 검색어 #장르 @제작자 /완결"/>
      </div>
      <div class="autocorrect" v-if="autoOn && autoList.length">
        <div class="autocorrect-box">
          <div v-for="(node, i) in autoList" :key="node.key">
            <router-link :to="`/admin/anime?animeNo=${node.key}`">
              <div v-html="node.hl" class="node" :class="({'sel': autoIndex == i})"></div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="list.content.length > 0" class="anime-del-wait">
      삭제 대기 애니메이션은 90일 후 완전 삭제됩니다. (현재 구현되지않음)
    </div>

    <!-- list -->
    <div>
      <table class="list">
        <tr v-for="node in list.content" :key="node.animeNo">
          <td class="anime-no">{{node.animeNo}}</td>
          <td class="main">
            <div v-if="status == 'list'" class="subject"><router-link :to="hrefList(node.animeNo)">{{node.subject}}</router-link></div>
            <div v-if="status == 'delist'" class="subject">{{node.subject}} (<span @click="recoverAnime(node)">복원하기</span>)</div>
            <div class="info a-text-style">
              <span class="x-tag" v-for="tag in node.info" :key="tag">{{tag}}</span>
              <span class="x-tag" v-for="tag in node.genres.split(/,/g)" :key="tag"><router-link :to="`/admin/anime?q=%23${encodeURIComponent(tag)}`">{{tag}}</router-link></span>
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

    <div>
      <pagination :total="list.totalPages" :index="page" :unit="10" :href="hrefPage" :key="$route.fullPath"/>
    </div>

  </div>
</template>

<style>
#admin-anime {  }
#admin-anime .anime-empty { text-align: center; padding: 200px 0; }
#admin-anime .anime-view-error { font-size:24px; text-align: center; line-height: 2; margin:50px 0 70px; }
#admin-anime table.tab { width:100%; }
#admin-anime table.tab td { text-align: center; width:50%; border-bottom-width: 1px; line-height: 48px; }
#admin-anime table.tab td div { cursor: pointer }

#admin-anime table { }
#admin-anime table.list { margin-top:6px;  width:100% }
#admin-anime table.list th { height:40px;  }
#admin-anime table.list td { font-size:13px; padding:10px 4px; border-top-width: 1px; line-height: 1.5 }
#admin-anime table.list td.anime-no { text-align: center; width:60px; }
#admin-anime table.list td div.subject { font-size:15px; padding-top:2px; }
#admin-anime table.list td div.subject span { color:#7d2424; font-weight: bold; cursor: pointer }
#admin-anime table.list td div.info { padding:4px 0 2px; }

#admin-anime .view { padding:8px; border-bottom-width: 1px }
#admin-anime .view .title { line-height: 2; font-size:20px; font-weight: bold; padding:8px; }
#admin-anime .view input { border:0; height:40px; }
#admin-anime .view input[type=button] { height: 28px; }
#admin-anime .view input[type=text] { width:100%; }
#admin-anime .view input[type=text],
#admin-anime .view input[type=time] { padding:0 8px; }
#admin-anime .view .input-label {}
#admin-anime .view .input-label label {
  padding:8px; margin:4px 8px 4px 0; display: inline-block; opacity: .6;
  font-size:14px; border: 1px solid transparent;
}
#admin-anime .view .input-label input { position: absolute; visibility: hidden; width:0 !important; height: 0 !important; }
#admin-anime .view .input-label input:checked + label { font-weight: bold; opacity:1 }
#admin-anime .view table { width:100%; }
#admin-anime .view table td,
#admin-anime .view table th { border-width: 1px; padding:4px 8px; }
#admin-anime .view table th { line-height: 1.5; padding:10px 8px; }
#admin-anime .view table td .genre-box { max-width:480px; }
#admin-anime .view table td .x-tag-box { padding:4px 0; display: inline-block; cursor: pointer }
#admin-anime .view table td .x-tag { font-size:14px !important; padding: 6px 8px; margin: 0 8px 0 0; }
#admin-anime .view td.captions span { font-size:15px; line-height: 40px; margin-right: 20px; }
#admin-anime .view .edit-btn { overflow: auto; padding:8px 0; }
#admin-anime .view .edit-btn input { padding: 0px 12px; }
#admin-anime .view .edit-btn .edit-btn-delete { float:left; }
#admin-anime .view .edit-btn .edit-btn-save { text-align: right }
#admin-anime .view .anime-date { padding:4px 0 }
#admin-anime .view .anime-date input { height: 28px; text-align: center }
#admin-anime .view .anime-date > span:first-child input { width:56px; }
#admin-anime .view .anime-date > span:not(:first-child) input { width:34px; }

#admin-anime .search { padding: 40px 40px; }
#admin-anime .search .search-box { }
#admin-anime .search .search-box input { height:40px; vertical-align: top; }
#admin-anime .search .search-box input[type=button] { width:80px; cursor:pointer; }
#admin-anime .search .search-box input[type=text] { width:calc(100% - 80px); height:40px; padding:0 8px; font-size:16px; }
#admin-anime .search .autocorrect { height:0; font-size:15px; margin-left:81px; }
#admin-anime .search .autocorrect .autocorrect-box { position: relative; backdrop-filter:blur(3px);border-width: 0 1px 1px;}
#admin-anime .search .autocorrect div.node { padding:8px 12px; }
#admin-anime .search .autocorrect div.node.sel,
#admin-anime .search .autocorrect div.node:hover { font-weight: bold; }

#admin-anime .anime-del-wait { text-align: center; padding: 32px 0 28px; font-size: 14px; }

html.light #admin-anime .search .autocorrect .autocorrect-box { background: rgba(255, 255, 255, .7); border:1px solid #eee; }
html.light #admin-anime .search .autocorrect div.node span { color:#2f7cbd }
html.dark #admin-anime .search .autocorrect .autocorrect-box { background: rgba(0, 0, 0, .7); border:1px solid #333; }
html.dark #admin-anime .search .autocorrect div.node span { color:#2e7bb5 }

@media (max-width: 800px) {
  #admin-anime .mob-hide { display: none; }
  #admin-anime .search { padding:6px 0 0; }
  #admin-anime .search .autocorrect div.node { padding:16px; }
}


html.light #admin-anime table.tab .select div { background: #f7f7f7 }
html.light #admin-anime .view .input-label input:checked + label { border-color: #eee }
html.light #admin-anime .view input { background: #eee; color:#444 }

html.dark #admin-anime table.tab .select div { background: #222 }
html.dark #admin-anime .view .input-label input:checked + label { border-color: #333 }
html.dark #admin-anime .view input { background: #222; color:#aaa }

</style>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Nabi from "@/utils/nabi";
import AdminService from "@/service/AdminService";
import PageData from "@/models/PageData";
import Pagination from "@/components/Pagination.vue";
import AnimeService from "@/service/AnimeService";
import AnissiaUtil from "@/utils/AnissiaUtil";

@Options({
  components: {
    Pagination
  },
  created() {
    this.init();
    this.load();
  },
  watch: {
    $route(to, from) {
      this.load();
    }
  },
  methods: {
    hrefPage(index: number) {
      return Nabi.address().deleteParameter(['animeNo']).setParameter('page', index + 1).href;
    },
    hrefList(animeNo: number) {
      return Nabi.address().setParameter('animeNo', animeNo).href;
    },
    init() {
      AnimeService.getGenres(genres => this.genres = genres)
    },
    loadForce() {
      this.pageQueryStatus = 'reload';
      this.load();
    },
    load() {
      const animeNo = Nabi.address().getIntParameter("animeNo", -1);
      this.query = (Nabi.address().getParameter("q") || '').trim();
      this.page = Math.max(Nabi.address().getIntParameter("page"), 1) - 1;
      this.status = Nabi.address().getParameter("status") == 'delist' ? 'delist' : 'list';
      const pageQueryStatus = `${this.status} ${this.page} ${this.query}`;
      this.autoIndex = -1;
      this.autoOn = false;
      this.genresOn = false;
      if (this.query != this.autoQuery) {
        this.autoList = [];
      }

      // view
      if (animeNo > 0) {
        AnimeService.getAnime(animeNo, anime => {
          AnimeService.toInfo(anime);
          this.bindAnimeEditDate(anime, 'sd', 'startDate');
          this.bindAnimeEditDate(anime, 'ed', 'endDate');
          this.anime = anime;
        });
      } else if (animeNo == 0) {
        const anime = {
          animeNo:0,
          isNew:true,
          status:'ON',
          week:'0',
          time:'00:00',
          subject:'',
          genres:'',
          startDate:'',
          endDate:'',
          website:'',
          sds:'N',
          eds:'N',
          captions:[]
        };
        AnimeService.toInfo(anime);
        this.anime = anime;
      } else {
        this.anime = null;
      }

      // list
      if (this.pageQueryStatus != pageQueryStatus) {
        this.pageQueryStatus = pageQueryStatus;
        if (this.status == 'list') {
          AdminService.getAnimeList(this.query, this.page, list => {
            list.content.forEach(e => e.info = AnimeService.toInfo(e));
            this.list = list;
          });
        } else if (this.status == 'delist') {
          AdminService.getAnimeDelist(list => {
            list.content.forEach(e => e.info = AnimeService.toInfo(e));
            this.list = list;
          });
        }
      }
    },
    // before edit
    bindAnimeEditDate(anime: any, cd: string, name: string) {
      const dt = anime[name];
      const dateType = `${cd}s`;
      const date1 = `${cd}1`;
      const date2 = `${cd}2`;
      const date3 = `${cd}3`;
      if ((/[\d]{4}-[\d]{2}-[\d]{2}/).test(dt)) {
        if (dt.endsWith('-99-99')) {
          anime[dateType] = 'Y';
        } else if (dt.endsWith('-99')) {
          anime[dateType] = 'YM';
        } else {
          anime[dateType] = 'YMD';
        }
        switch (anime[dateType]) {
          case 'YMD' : anime[date3] = dt.substring(8, 10); /* falls through */
          case 'YM' : anime[date2] = dt.substring(5, 7); /* falls through */
          case 'Y' : anime[date1] = dt.substring(0, 4);
        }
      } else {
        anime[dateType] = 'N';
        anime[date1] = anime[date2] = anime[date3] = '';
      }
      return anime;
    },
    // before submit
    bindAnimeSubmitDate(anime: any, cd: string, name: string) {
      let date = '';
      const dateType = anime[`${cd}s`];
      const y = anime[`${cd}1`];
      let m = anime[`${cd}2`];
      let d = anime[`${cd}3`];
      if ((/^[1-9]$/).test(m)) { m = '0' + m; }
      if ((/^[1-9]$/).test(d)) { d = '0' + d; }
      switch (dateType) {
        case 'YMD': anime[name] = `${y}-${m}-${d}`; break;
        case 'YM': anime[name] = `${y}-${m}-99`; break;
        case 'Y': anime[name] = `${y}-99-99`; break;
        default: anime[name] = '';
      }
      return anime;
    },
    addCaption() {
      AdminService.addCaption(this.anime.animeNo, result => {
        if (result.st == 'OK') {
          this.loadForce();
          alert("자막제작자로 참여하셨습니다.");
        } else if (result.msg) {
          alert(result.msg);
        }
      });
    },
    saveAnime() {
      const anime = this.anime;
      this.bindAnimeSubmitDate(anime, 'sd', 'startDate');
      this.bindAnimeSubmitDate(anime, 'ed', 'endDate');
      if (confirm(`${anime.subject}을(를) ${anime.animeNo != 0 ? '수정' : '추가'} 하시겠습니까?\n임의조작시 권한박탈의 사유가됩니다.`)) {
        if (anime.week == '7') {
          anime.time = '00:00';
        }
        anime.subject = anime.subject.trim();
        anime.genres = anime.genreList.join(',');
        if (anime.animeNo != 0) {
          AdminService.updateAnime(anime, result => {
            if (result.st == 'OK') {
              this.loadForce();
              alert("애니메이션이 수정되었습니다.");
            } else if (result.msg) {
              alert(result.msg);
            }
          });
        } else {
          AdminService.addAnime(anime, result => {
            if (result.st == 'OK') {
              this.loadForce();
              alert("애니메이션이 추가되었습니다.");
            } else if (result.msg) {
              alert(result.msg);
            }
          });
        }
      }
    },
    deleteAnime() {
      if (confirm(`${this.anime.subject}을(를) 삭제하시겠습니까?\n임의삭제시 권한박탈의 사유가됩니다.`)) {
        AdminService.deleteAnime(this.anime.animeNo, result => {
          if (result.st == 'OK') {
            this.$router.push('/admin/anime');
          } else if (result.msg) {
            alert(result.msg);
          }
        });
      }
    },
    recoverAnime(anime: any) {
      if (confirm(`${anime.subject}을(를) 복원하시겠습니까?\n임의조작시 권한박탈의 사유가됩니다.`)) {
        AdminService.recoverAnime(anime.agendaNo, result => {
          if (result.st == 'OK') {
            this.$router.push(`/admin/anime?animeNo=${result.data}`);
          } else if (result.msg) {
            alert(result.msg);
          }
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
            this.$router.push(`/admin/anime?animeNo=${this.autoList[this.autoIndex].key}`)
          }
          return;
      }
    },
    clickAutocorrect(event: MouseEvent) {
      this.autoOn = Nabi.matchesParents(event.target, ['#admin-anime .search']) != '';
    },
    changeGenres() {
      this.$nextTick(() => {
        if (this.anime.genreList.length > 3) {
          this.anime.genreList = this.anime.genreList.slice(this.anime.genreList.length - 3);
        }
      });
    },
    search() {
      const q = this.query.trim();
      if (q) {
        this.$router.push(Nabi.address().deleteParameter(['page', 'animeNo']).setParameter('q', q).href);
      } else {
        this.$router.push('/admin/anime');
      }
    },
    createAnime() {
      this.$router.push('/admin/anime?animeNo=0');
    },
  },
})

export default class AdminAnime extends Vue {
  data() {
    return {
      week: ['日', '月', '火', '水', '木', '金', '土', '外', '新'],
      status: 'list',
      genres: [],
      genresOn: false,
      anime: null as any,
      query: '',
      autoQuery: '',
      autoList: [],
      autoOn: false,
      autoIndex: -1,
      page: 0,
      pageQueryStatus: '',
      list: new PageData(),
    };
  }
}
</script>
