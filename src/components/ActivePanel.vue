<template>
  <div class="active-panel">
    <div v-if="admin">
      <input placeholder="공지사항 !시작하면 전회원 공개 - 사적인대화는 삼가해주세요." v-model="noticeText" @keyup.enter="saveNotice"/>
    </div>
    <div>
      <table class="active-panel-table">
        <tr v-for="node in list.content" :key="node.apNo">
          <td class="node-text">
            <span v-if="node.code == 'TEXT'">{{node.data1}}</span>
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

@media (max-width: 500px) {
  .active-panel table.active-panel-table td.node-date { display: none }
}

</style>
