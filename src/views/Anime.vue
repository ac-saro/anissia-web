<template>
  <div id="anime" class="doc-area">
    
    <div class="anime-view" v-if="view != null">
      <div v-if="view.exist">
        <div class="anime-title">
          {{view.subject}}
          <div class="ongoing-bc" v-if="listIsOngogin(view)">
            {{ listOngoing(view) }}
          </div>
        </div>

        <div class="main">
          <table>
            <tr v-if="view.genres">
              <th>장르</th>
              <td>{{ view.genres.split(',').join(', ') }}</td>
            </tr>
            <tr v-if="view.period">
              <th>기간</th>
              <td>
                {{view.period}}
              </td>
            </tr>
            <tr v-if="view.website">
              <th>웹사이트</th>
              <td><a :href="view.website" target="_blank">바로가기</a></td>
            </tr>
          </table>
        </div>
        
        <div class="captions">
          <div class="title">자막정보</div>
          <div v-if="view.captions.length > 0">
            <table v-for="node in view.captions" :key="node.name">
              <tr>
                <td class="episode">{{node.episode || 'ETC'}}</td>
                <td class="name">{{node.name}}</td>
                <td class="date mob-hide">{{viewCaptionDate(node.isoUpdDt)}}</td>
                <td class="website">
                  <a :href="node.website" target="blank" v-if="node.website.trim()">링크</a>
                  <span v-else>준비중</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="not-exist-cpations" v-else>
            자막이 없습니다.
          </div>
          
        </div>

      </div>
      <div class="not-exist-content" v-else>
        존재하지 않거나 삭제된 애니메이션 입니다.
      </div>
    </div>

    <table class="anime-list-table">
      <tr class="mob-hide">
        <th class="seq">번호</th>
        <th class="info">정보</th>
        <th class="date">기간</th>
      </tr>
      <tr v-for="node in list.content" :key="node.an">
        <td class="mob-hide seq">{{node.an}}</td>
        <td class="info">
          <div class="subject">
            <router-link :to="listViewHref(node)">{{node.subject}}</router-link>
          </div>
          <div class="ongoing-bc" v-if="listIsOngogin(node)">
            {{ listOngoing(node) }}
          </div>
          <div v-if="node.genres" class="genre">
            <span v-for="genre in node.genres.split(',')" :key="genre">#{{genre}}</span>
          </div>
        </td>
        <td class="mob-hide date" v-html="node.period.replace(' ~ ', '<br/>') || '-'">
        </td>
      </tr>
    </table>

    <pagination :href="href" :total="list.totalPages" :index="list.number" :unit="10" />

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Nabi from '@/utils/nabi';
import PageData from '@/models/PageData';
import AnimeSummary from '@/models/AnimeSummary';
import AnimeContent from '@/models/AnimeContent';
import AnimeService from '@/services/AnimeService';
import Pagination from '@/components/Pagination.vue';
import AnissiaUtil from '@/utils/AnissiaUtil';

// import VueSlider from 'vue-slider-component';
// import 'vue-slider-component/theme/default.css';
// <vue-slider v-model="years" :min="yearsMin" :max="yearsMax"></vue-slider>
// this.years = [(this.yearsMin = 1990), (this.yearsMax = new Date().getFullYear())];

export default Vue.extend({
  components: {
    Pagination,
  },
  created() {
    this.load();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.load();
  },
  data() {
    return {
      list: new PageData<AnimeSummary>(),
      listH: '',
      view: null as AnimeContent|null,
    };
  },
  methods: {
    listViewHref(node: AnimeSummary) {
      return Nabi.address().setParameter('view', node.an).href;
    },
    listIsOngogin(node: AnimeSummary) {
      return node.status === 0 && node.day && !AnissiaUtil.animeIsEnded(node.endDate);
    },
    listOngoing(node: AnimeSummary) {
      const t = Number(node.bcType);
      if (t < 7) {
        let prefix = node.prefix ? `[${node.prefix}] ` : '';
        prefix = prefix ? prefix : `${['일', '월', '화', '수', '목', '금', '토'][t]}요일 `;
        const timeh = Number(node.bcTime.substr(0, 2));
        const timem = Number(node.bcTime.substr(-2));
        return `${prefix} ${timeh >= 12 ? '오후' : '오전'} ${timeh > 12 ? (timeh - 12) : (timeh !== 0 ? timeh : 12)}시 ${timem !== 0 ? `${timem}분` : ''}`;
      }
      return '';
    },
    listStartEndDate(node: AnimeSummary) {
      let sd = node.startDate.replace('0000-00-00', '');
      sd = sd.match(/0000|99/g) == null ? sd : '';
      let ed = node.endDate.replace('0000-00-00', '');
      ed = ed.match(/0000|99/g) == null && sd !== ed ? ed : '';
      if (sd && ed) {
        return `${sd}<br/>${ed}`;
      } else {
        return `${sd}${ed}`;
      }
    },
    viewCaptionDate(isoDate): string {
      return AnissiaUtil.formatOrDynamicAgo(isoDate, 'yyyy년 MM월 dd일');
    },
    href(index: number): string {
      if (index === 0) {
        return Nabi.address().deleteParameter(['view', 'page']).href;
      } else {
        return Nabi.address().deleteParameter('view').setParameter('page', index + 1).href;
      }
    },
    load() {
      const page: number = Number(Nabi.address().getParameter('page') || '1') - 1;
      const view: number = Number(Nabi.address().getParameter('view'));
      this.loadList(isNaN(page) ? 0 : page);
      this.loadView(view);
    },
    loadList(page: number) {
      const h = JSON.stringify({page});
      if (h === this.listH) {
        return;
      }
      this.listH = h;
      AnimeService.list(page, (list) => this.list = list);
    },
    loadView(an: number) {
      if (isNaN(an) || an <= 0) {
        this.view = null;
        return;
      }
      AnimeService.view(an, (view) => this.view = view);
    },
  },
});
</script>


<style>
#anime { margin-top:10px; }
#anime .anime-view { padding-bottom: 50px; }
#anime .anime-view .not-exist-content { padding:160px 0 100px; text-align: center; line-height: 2; font-size: 20px; color:#555 }
#anime .anime-view .anime-title { font-size:20px; margin:8px 0 0; border-bottom: 1px solid #aaa; padding:8px 6px 10px; font-weight: bold }
#anime .anime-view .anime-title .ongoing-bc { font-size:15px; color:#34a797; font-weight: bold; padding-top:4px }

#anime .anime-view .main { padding:12px 8px 4px }
#anime .anime-view .main a { text-decoration: none; color:#3758a0; }
#anime .anime-view .main table,
#anime .anime-view .main table td,
#anime .anime-view .main table th { border:1px solid #ddd; }
#anime .anime-view .main table td,
#anime .anime-view .main table th { line-height: 48px; padding:0 12px }
#anime .anime-view .main table th { text-align: left; color:#555; background:#f3f3f3  }

#anime .anime-view .captions .title { font-size:18px; margin:8px 0 0; border-bottom: 1px solid #ccc; padding:8px 6px 9px; }
#anime .anime-view .captions .not-exist-cpations { text-align: center; padding:40px 0 44px; color:#777; background:#fafafa }
#anime .anime-view .captions table { width:100% }
#anime .anime-view .captions table td { line-height: 48px; border-bottom: 1px solid #eee; padding:0 8px; font-size:15px; }
#anime .anime-view .captions table tr:hover td { background: #fafafa }
#anime .anime-view .captions table td.episode { width:80px; }
#anime .anime-view .captions table td.name { color:#555; font-weight: bold; letter-spacing: 0.4px }
#anime .anime-view .captions table td.date { width:160px; text-align: right; color:#555 }
#anime .anime-view .captions table td.website { width:60px; text-align: right }
#anime .anime-view .captions table td.website span { color:#bf4545 }
#anime .anime-view .captions table td.website a { text-decoration: none; color:#3758a0; }

#anime .anime-list-table { width:100%; }
#anime .anime-list-table tr:hover td { background: #fffffa }
#anime .anime-list-table th { line-height: 48px; font-size:12px; color:#505050  }
#anime .anime-list-table td { padding:12px 10px; border-bottom: 1px solid #fff }
#anime .anime-list-table td .subject { font-size:16px; padding: 0 0 3px }
#anime .anime-list-table td .subject a { text-decoration: none; color:#4b5771 }
#anime .anime-list-table tr:hover td .subject a { color:#376298 }
#anime .anime-list-table td .subject a:hover { color:#2c5cc3 !important }
#anime .anime-list-table td .genre > span { margin-right: 8px; color: #7a8088; cursor: default; font-size:12px }
#anime .anime-list-table td .ongoing-bc { color:#55ada5; font-size:13px; font-weight: bold; padding:2px 0 3px }
#anime .anime-list-table td.date { font-size:14px; line-height: 2; text-align:center; width:130px; color:#5b6a7f; background:#fafafa; }
#anime .anime-list-table td.seq { text-align: center; font-weight: normal; color:#5b6a7f; background:#fafafa; width:60px; }

@media (max-width: 880px) {
  .mob-hide { display: none }
}
</style>
