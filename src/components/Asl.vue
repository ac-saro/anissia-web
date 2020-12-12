<template>
  <div class="asl">
    <div v-for="node in list.content" :key="node.aslNo" class="node" :class="{'node-act': node.active}">
      <div v-if="node.cmd === 'apply'">
        <div class="node-date">{{node.actDt}}</div>
        <div class="node-title">
          {{node.status}}: <b>{{node.data1.name}}</b>님이 자막제작자 권한을 신청하였습니다.
        </div>
        <div>
          <a :href="node.data1.site" target="_blank">번역작품</a>: {{node.data1.titles}}
        </div>
        <div v-if="node.data1.note">{{node.data1.note}}</div>
      </div>
      <div v-else-if="node.cmd === 'html'">
        <div class="node-date">{{node.actDt}}</div>
        <div v-html="node.data1"></div>
      </div>
      <div v-else>
        표시할수 없는 유형: {{node}}
      </div>
    </div>

    <div v-if="isManage()">
      <pagination :href="hrefPage" :total="list.totalPages" :index="list.number" :unit="10" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nabi from '@/utils/nabi';
import PageData from '@/models/PageData';
import Pagination from '@/components/Pagination.vue';
import AnissiaUtil from '@/utils/AnissiaUtil';
import UserSession from '@/models/UserSession';
import AslModel from '@/models/AslModel';
import AslService from '@/services/AslService';

export default Vue.extend({
  props: ['mode'], // mode [view|manage]
  components: {
    Pagination,
  },
  watch: {
    $route(to, from) {
      this.load();
    },
  },
  created() {
    this.load();
  },
  data() {
    return {
      list: new PageData<AslModel>(),
    };
  },
  methods: {
    isManage() {
      return this.mode === 'manage';
    },
    hrefPage(index: number): string {
      return Nabi.address().clearParameter().setParameter('page', index + 1).href;
    },
    load() {
      const page: number = Number(Nabi.address().getParameter('page') || '1') - 1;
      this.loadList(page);
    },
    loadList(page: number) {
      AslService.list(page, (e) => this.list = e);
    },
  },
});
</script>

<style>
.asl {  }
.asl a { color:#18a59e; text-decoration: none }
.asl .node { line-height: 1.8; padding:8px; font-size:14px; }
.asl .node-act { background: #f1f8ff; margin-top: 1px; }
.asl .node .node-title { font-weight: bold; font-size:15px; padding-bottom:4px; }
.asl .node .node-date { float:right; color:#777; text-align: right }
.asl .node b { color:#2b6b98 }



@media (min-width: 700px) {
  
}

@media (max-width: 700px) {
  
}
</style>
