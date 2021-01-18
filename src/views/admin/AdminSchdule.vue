<template>
  <div id="admin-schedule">

    <table class="tab">
      <tr>
        <td v-for="(node, i) in weekList" :key="node" :class="({'select': i == weekNow})">
          <div @click="selectAnimeList(i)">{{node}}</div>
        </td>
      </tr>
    </table>

    <table class="list">
      <tr v-for="(node, i) in animeList" :key="node">
        <td class="time">
          {{node.time}}
        </td>
        <td class="subject">
          <router-link :to="`/admin/anime?animeNo=${node.animeNo}`">
            <span class="prefix" v-if="node.subjectPrefix">[<b>{{node.subjectPrefix}}</b>] </span> {{node.subject}}
          </router-link>
        </td>
        <td class="genres">
          {{node.genres.replace(',', ' / ')}}
        </td>
        <td class="tool">
          <div v-if="node.status == 'ON'" class="turn-off" @click="updateStatus(i, 'OFF')">결방</div>
          <div v-else class="turn-on" @click="updateStatus(i, 'ON')">방영</div>
        </td>
      </tr>
    </table>

  </div>
</template>

<style>
#admin-schedule {  }
#admin-schedule table { width:100%; }

#admin-schedule table.tab td { line-height: 48px; text-align: center; border-bottom-width: 1px; cursor: pointer }

#admin-schedule table.list td { line-height: 1.8; border-bottom-width: 1px; font-size:15px; padding:8px; }
#admin-schedule table.list td.time {  width: 100px; text-align: center }
#admin-schedule table.list td.genres { width: 150px; }
#admin-schedule table.list td.tool { width: 50px; text-align: center }
#admin-schedule table.list td.tool > div { cursor:pointer }
#admin-schedule table.list td.tool > div.turn-on { color:#7589c1 }
#admin-schedule table.list td.tool > div.turn-off { color:#b55f5f }

@media (max-width: 800px) {
  #admin-schedule table.list td.genres { display: none }
}

html.light #admin-schedule input { color:#333 }
html.light #admin-schedule table.tab .select div { background: #f7f7f7 }

html.dark #admin-schedule input { color:#999 }
html.dark #admin-schedule table.tab .select div { background: #111 }

</style>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import AnissiaUtil from "@/utils/AnissiaUtil";
import AnimeService from "@/service/AnimeService";

@Options({
  mounted() {
    this.selectAnimeList(new Date().getDay());
  },
  methods: {
    updateStatus(index: number, status: string) {
      const node = this.animeList[index];
      switch(status) {
        case 'ON' : if (confirm(`${node.subject} 를\n[방영]으로 변경하시겠습니까?`)) { break; } else { return; }
        case 'OFF' : if (confirm(`${node.subject} 를\n[결방]으로 변경하시겠습니까?`)) { break; } else { return; }
        default : return;
      }
    },
    selectAnimeList(week: number): void {
      AnimeService.getSchedule(week.toString(), (e) => {
        this.animeList = e;
        this.weekNow = week;
      });
    },
  }
})

export default class AdminSchdule extends Vue {
  data() {
    return {
      weekList: ['日', '月', '火', '水', '木', '金', '土', '外', '新'],
      weekNow: -1,
      animeList: [] as any[],
    }
  }
}
</script>
