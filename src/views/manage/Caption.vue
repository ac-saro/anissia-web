<template>
  <div class="doc-area">
    <div class="doc-pad">
      
      <div id="manage-caption">
        <table>
          <tr v-for="node in list.content" :key="node.an">
            <td>
              <div class="subject"><b>{{node.subject}}</b></div>
              <div>
                <input class="ep-bt" type="button" value="▼" @click="addEpisode(node, -1)"
                /><input class="ep-tx" type="text" v-model="node.episode" placeholder="에피소드"
                /><input class="ep-bt" type="button" value="▲" @click="addEpisode(node, 1)"
                /><input class="udt-ymd-tx" type="text" v-model="node.adYmd" placeholder="연월일"
                /><input class="udt-hms-tx" type="text" v-model="node.adHms" placeholder="시분초"
                /><input class="udt-now-bt" type="button" value="현재시간" @click="setNow(node)"
                /><input class="site-tx" type="text" v-model="node.website" placeholder="사이트 링크"
                /><input class="save-bt" type="button" value="저장" @click="save(node)" />
                
              </div>
            </td>
          </tr>
        </table>
      </div>

    </div>

    <pagination :href="hrefPage" :total="list.totalPages" :index="list.number" :unit="10" />

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ManageService from '@/services/ManageService';
import Pagination from '@/components/Pagination.vue';
import PageData from '@/models/PageData';
import ManageAnimeCaption from '@/models/ManageAnimeCaption';
import Nabi from '@/utils/nabi';
import Noti from '@/utils/Noti';


export default Vue.extend({
  components: {
    Pagination,
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.load();
  },
  data() {
    return {
      list: new PageData<ManageAnimeCaption>(),
    };
  },
  created() {
    this.load();
  },
  methods: {
    hrefPage(index: number): string {
      return Nabi.address().clearParameter().setParameter('page', index + 1).href;
    },
    addEpisode(node: any, count: number) {
      const ep = Number(node.episode);
      if (isNaN(ep)) {
        node.episode = '0';
      } else if ((ep.toString()).indexOf('.') !== -1) {
        node.episode = (count > 0 ? Math.ceil(ep) : Math.floor(ep)).toString();
      } else {
        node.episode = Math.max((ep + count), 0).toString();
      }
    },
    setNow(node: any) {
      const dt = Nabi.dateFormat(new Date()).format('yyyyMMdd HHmmss').split(/ /);
      node.adYmd = dt[0];
      node.adHms = dt[1];
    },
    save(node: any) {
      ManageService.updateCaption(
          node.an, node.episode, node.adYmd + node.adHms, node.website, (pass: boolean, msg: string|null) => {
        alert('test');
      });

      const date = (node.adYmd + node.adHms)
          + (node.adYmd.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + 'T' + node.adHms.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3') + Nabi.nowTimezone());
      Noti.info('제작중' + date);
    },
    load() {
      const page: number = Number(Nabi.address().getParameter('page') || '1') - 1;
      this.loadList(page);
    },
    loadList(page: number) {
      ManageService.listCaption(page, (list: PageData<ManageAnimeCaption>) => this.list = list);
    },
  },
});
</script>

<style scoped>
#manage-caption table { width:100% }
#manage-caption table .subject { font-size:18px; line-height: 1.8; padding:20px 0 4px; }
#manage-caption table input { height:40px; line-height: 40px; padding:0; border:1px solid #eee; box-sizing: border-box; vertical-align: top  }
#manage-caption table input.ep-bt { width:40px; }
#manage-caption table input.ep-tx { width:60px; text-align: center }
#manage-caption table input.udt-ymd-tx { width:90px; text-align: center }
#manage-caption table input.udt-hms-tx { width:70px; text-align: center }
#manage-caption table input.udt-now-bt { width:80px; }
#manage-caption table input.site-tx { width:calc(100% - 430px); padding-left:12px; }
#manage-caption table input.save-bt { width:50px; }


@media (max-width: 800px) {
  #manage-caption table input.site-tx { width:calc(100% - 50px); }
}
</style>