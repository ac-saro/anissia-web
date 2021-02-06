<template>
  <div class="active-panel">
    <div v-if="admin" class="active-panel-write">
      <input class="std-inp-txt basic-border-color" placeholder="공지 (!로 시작시 사이트 전체공개) - 개발 피드백을 위해 임시오픈하였습니다." v-model="noticeText" @keyup.enter="saveNotice"/>
    </div>
    <div>
      <table class="active-panel-table">
        <tr v-for="node in list.content" :key="node.apNo" :class="({'closed': !node.published})">
          <td class="node-text">
            <span v-if="node.code == 'TEXT'" v-html="node.html"></span>
            <span v-else>{{code}}는 지원하지 않는 활동 패널 코드입니다.</span>
          </td>
          <td class="node-date">{{node.regDtText}}</td>
        </tr>
      </table>
    </div>
    <div v-if="admin">
      <pagination :total="list.totalPages" :index="page" :unit="10" :href="hrefPage" :key="$route.fullPath"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PageData from "@/models/PageData";
import ActivePanelService from "@/service/ActivePanelService";
import Pagination from "@/components/Pagination.vue";
import Nabi from "@/utils/nabi";

@Options({
  props: {
    admin: Boolean
  },
  components: {
    Pagination
  },
  watch: {
    $route(to, from) {
      this.load();
    }
  },
  methods: {
    load() {
      ActivePanelService.getList(this.page, list => this.list = list);
    },
    hrefPage(index: number) {
      return Nabi.address().deleteParameter('animeNo').setParameter('page', index + 1).href;
    },
    saveNotice() {
      ActivePanelService.addNotice(this.noticeText, result => {
        if (result.st == 'OK') {
          this.load();
        } else {
          alert(result.msg);
        }
      });
      this.noticeText = '';
    }
  },
  created() {
    this.load();
  },
})
export default class ActivePanel extends Vue {
  data() {
    return {
      noticeText: '',
      list: new PageData(),
      page: 0,
    };
  }
}
</script>

<style>
.active-panel {}
.active-panel table.active-panel-table { width:100%; font-size:15px; }
.active-panel td { height:40px; padding:0 6px; border-bottom-width: 1px }
.active-panel td.node-date { width:120px; text-align: right }
.active-panel tr.closed td { opacity: .6 }
.active-panel .active-panel-write input { width:100%; line-height: 40px; border-bottom-width: 1px; padding:0 8px }

@media (max-width: 500px) {
  .active-panel table.active-panel-table td.node-date { display: none }
}

</style>
