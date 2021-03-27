<template>
  <div id="admin-caption">

    <table class="tab">
      <tr>
        <td><router-link to="/admin/caption" :class="({'select': status == 1})"><div>방영중</div></router-link></td>
        <td><router-link to="/admin/caption?status=0" :class="({'select': status == 0})"><div>종료</div></router-link></td>
      </tr>
    </table>

    <table class="caption">
      <tr v-for="(node, i) in captions.content" :key="node.animeNo">
        <td class="episode">
          <input type="button" value="▲" @click="moveEpisode(i, true)"/>
          <input type="number" v-model="node.episode" maxlength="10"/>
          <input type="button" value="▼" @click="moveEpisode(i, false)"/>
        </td>
        <td class="middle">
          <div class="subject">{{node.subject}} [<span @click="deleteCaption(i)">X</span>]</div>
          <div>
            <input class="date" type="datetime-local" v-model="node.updDt" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" />
            <input class="now" type="button" value="현재" @click="setNow(i)"/>
          </div>
          <div>
            <input class="website" type="text" v-model="node.website" placeholder="https://example.com (미 입력 시 [준비중]으로 표시)"/>
          </div>
        </td>
        <td class="save"><input type="button" value="저장" @click="updateCaption(i)"/></td>
      </tr>
    </table>
    <div class="caption-empty" v-if="captions.content.length == 0">
      해당하는 자막이 존재하지 않습니다.
    </div>

    <div>
      <pagination :total="captions.totalPages" :index="page" :unit="10" :href="hrefPage" :key="$route.fullPath"/>
    </div>

  </div>
</template>

<style>
#admin-caption {  }
#admin-caption input { border:0; }
#admin-caption table { width:100%; }

#admin-caption .caption-empty { text-align: center; padding: 200px 0; }

#admin-caption table.tab td { text-align: center; width:50%; border-bottom-width: 1px; line-height: 48px; }

#admin-caption table.caption td { border-bottom-width: 1px; padding:4px; }
#admin-caption table.caption td input { vertical-align: top; background: transparent; }
#admin-caption table.caption .episode,
#admin-caption table.caption .save { width:50px; }
#admin-caption table.caption .episode input,
#admin-caption table.caption .save input { width:100%; text-align: center }
#admin-caption table.caption .save input { height:68px; }
#admin-caption table.caption .episode input[type=button] { height:24px; }
#admin-caption table.caption .episode input[type=number] { height:24px; }
#admin-caption table.caption .subject span { color: #943e3e; cursor:pointer }
#admin-caption table.caption .middle div { line-height: 28px; }
#admin-caption table.caption .middle input { height:24px; }
#admin-caption table.caption .date { width:190px; }
#admin-caption table.caption .now { width:40px; }
#admin-caption table.caption .website { width:100%; }

html.light #admin-caption input { color:#444 }
html.light #admin-caption table.tab .select div { background: #f7f7f7 }

html.dark #admin-caption input { color:#999 }
html.dark #admin-caption table.tab .select div { background: #222 }

</style>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import Pagination from "@/components/Pagination.vue"
import PageData from "@/models/PageData"
import AdminService from "@/service/AdminService"
import Nabi from "@/utils/nabi"

@Options({
  components: {
    Pagination
  },
  computed: {
    list() {
      return this.captions.content;
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
    moveEpisode(index: number, isUp: boolean) {
      const episode = Number(this.list[index].episode);
      if (isUp) {
        this.list[index].episode = ((isNaN(episode) ? 0 : Math.floor(episode)) + 1).toString();
      } else {
        this.list[index].episode = Math.max(0, (isNaN(episode) ? 1 : Math.ceil(episode)) - 1).toString();
      }
    },
    setNow(index: number) {
      this.list[index].updDt = Nabi.dateFormat(new Date()).format("yyyy-MM-ddTHH:mm");
    },
    deleteCaption(index: number) {
      if (confirm("정말로 삭제하시겠습니까?")) {
        AdminService.deleteCaption(this.list[index].animeNo, result => {
          result.st == "OK" ? this.load() : alert(result.msg);
        });
      }
    },
    updateCaption(index: number) {
      AdminService.updateCaption(this.list[index], result => alert(result.msg));
    },
    hrefPage(index: number) {
      return Nabi.address().setParameter('page', index + 1).href;
    },
    load() {
      this.page = Math.max(Nabi.address().getIntParameter("page"), 1) - 1;
      this.status = Nabi.address().getIntParameter("status", 1);
      AdminService.getCaptionList(this.status, this.page, captions => this.captions = captions);
    }
  }
})

export default class AdminCaption extends Vue {
  data() {
    return {
      captions: new PageData(),
      status: 1,
      page: 0
    };
  }
}
</script>
