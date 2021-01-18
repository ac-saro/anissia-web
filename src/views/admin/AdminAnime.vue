<template>
  <div id="admin-anime">

    <table class="tab">
      <tr>
        <td><router-link to="/admin/anime" :class="({'select': status == 'list'})"><div>전체</div></router-link></td>
        <td><router-link to="/admin/anime?status=delist" :class="({'select': status == 'delist'})"><div>삭제대기</div></router-link></td>
      </tr>
    </table>

    <table class="anime">
      <tr v-for="(node, i) in animeList.content" :key="node.animeNo">
        <td>{{i}} {{node}}</td>
      </tr>
    </table>

    <div class="anime-empty" v-if="animeList.content.length == 0">
      해당하는 애니메이션이 존재하지 않습니다.
    </div>

    <div>
      <pagination :total="animeList.totalPages" :index="page" :unit="10" :href="hrefPage" :key="$route.fullPath"/>
    </div>

  </div>
</template>

<style>
#admin-anime {  }

#admin-anime .anime-empty { text-align: center; padding: 200px 0; }

#admin-anime table { width:100%; }
#admin-anime table.tab td { text-align: center; width:50%; border-bottom-width: 1px; line-height: 48px; }


html.light #admin-anime table.tab .select div { background: #f7f7f7 }


html.dark #admin-anime table.tab .select div { background: #111 }

</style>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Nabi from "@/utils/nabi";
import AdminService from "@/service/AdminService";
import PageData from "@/models/PageData";
import Pagination from "@/components/Pagination.vue";
import AnimeService from "@/service/AnimeService";

@Options({
  components: {
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
    hrefPage(index: number) {
      return Nabi.address().setParameter('page', index + 1).href;
    },
    load() {
      const animeNo = Nabi.address().getIntParameter("animeNo");
      this.page = Math.max(Nabi.address().getIntParameter("page"), 1) - 1;
      this.status = Nabi.address().getParameter("status") == 'delist' ? 'delist' : 'list';
      const pageQueryStatus = `${this.status} ${this.page} ${this.query}`;

      // // view
      // if (animeNo > 0) {
      //   AnimeService.getAnime(animeNo, anime => this.anime = anime);
      // } else {
      //   this.anime = null;
      // }

      // list
      if (this.pageQueryStatus != pageQueryStatus) {
        this.pageQueryStatus = pageQueryStatus;
        AdminService.getAnimeList(this.status, this.query, this.page, animeList => this.animeList = animeList);
      }
    }
  }
})

export default class AdminAnime extends Vue {
  data() {
    return {
      status: 'list',
      anime: null as any,
      query: '',
      page: 0,
      pageQueryStatus: '',
      animeList: new PageData(),
    };
  }
}
</script>
