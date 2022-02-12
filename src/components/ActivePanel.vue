<template>
  <div class="active-panel">
    <div v-if="admin" class="active-panel-write">
      <input class="std-inp-txt basic-border-color" :placeholder="`운영기록작성 ${user.isRoot ? '/도움말' : ''}`" v-model="noticeText" @keyup.enter="saveNotice"/>
    </div>
    <div>
      <table class="active-panel-table">
        <tr v-if="help">
          <td class="node-text" colspan="2">
            명령어 도움말<br/>
            <b>/권한반납 닉네임</b> - 자막제작자 권한을 반납합니다.
          </td>
        </tr>
        <tr v-if="translatorApplyCount > 0">
          <td class="node-text" colspan="2">
            현재 <b>{{translatorApplyCount}}</b> 건의 자막제작자 권한요청이 있습니다.
            - <router-link to="/translator/apply"><b>바로가기</b></router-link>
          </td>
        </tr>
        <tr v-for="node in list.content" :key="node.apNo" :class="({'closed': !node.published})">
          <td class="node-text">
            <span v-if="node.code == 'TEXT'" v-html="node.html"></span>
            <span v-else-if="node.code == 'ANIME'">
              <div>
                <span v-html="node.html"></span>
                <span v-if="node.more == 0" @click="node.more = 1">&nbsp;-&nbsp;<span class="node-more-btn">변경점</span></span>
              </div>
              <div v-if="node.more == 1" class="node-more-info">
                <table>
                  <tr v-for="info in node.moreInfo" :key="info.o"><td>{{info.t}}</td><td>{{info.o}}</td><td>{{info.n}}</td></tr>
                </table>
              </div>
            </span>
            <span v-else>{{node.code}}는 지원하지 않는 활동 패널 코드입니다.</span>
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
import AdminService from "@/service/AdminService";

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
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    load() {
      this.page = Math.max(Nabi.address().getIntParameter("page"), 1) - 1;
      ActivePanelService.getList(this.page, this.admin ? 'admin' : 'public', list => this.list = list);
      if (this.$route.path.startsWith("/admin")) {
        AdminService.getTranslatorApplyCount(count => this.translatorApplyCount = count);
      }
    },
    hrefPage(index: number) {
      return Nabi.address().deleteParameter('animeNo').setParameter('page', index + 1).href;
    },
    saveNotice() {
      const text = this.noticeText.trim();

      if (text == '/도움말') {
        this.noticeText = '';
        this.help = true;
        return;
      }

      ActivePanelService.addNotice(text, result => {
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
      translatorApplyCount: 0,
      help: false,
    };
  }
}
</script>

<style>
.active-panel {}
.active-panel table.active-panel-table { width:100%; font-size:14px; }
.active-panel td { padding:10px 6px; border-top-width: 1px }
.active-panel td.node-text { line-height: 2 }
.active-panel td.node-date { width:120px; text-align: right }
.active-panel tr.closed td { opacity: .7 }
.active-panel .active-panel-write input { width:100%; line-height: 40px; border-width: 1px 0 0; padding:0 8px }
.active-panel .node-more-btn { font-weight: bold; cursor: pointer }
.active-panel .node-more-info table { margin-top:4px; }
.active-panel .node-more-info td { border-width: 1px; text-align: center; padding:6px 8px; }
.active-panel .node-more-info td:first-child,
.active-panel .node-more-info td:last-child { font-weight: bold }


@media (max-width: 500px) {
  .active-panel table.active-panel-table td.node-date { display: none }
}

</style>
