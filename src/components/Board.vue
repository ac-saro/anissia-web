<template>
  <div class="board">

    <div class="doc-title fo">
      <div class="fl">{{ info.name }}</div>
      <div v-if="topicNo == -1 && hasPer('wt')" class="fr"><input type="button" class="std-inp-btn" value="글쓰기" @click="$router.push('?topicNo=0')"/></div>
      <div v-if="topicNo > 0" class="fr"><input type="button" class="std-inp-btn" value="목록" @click="$router.push($route.path)"/></div>
    </div>

    <div class="board-view" v-if="view != null">

      <div v-for="node in view.posts" :key="`${node.topicNo}/${node.postNo}`" class="node basic-border-color">
        <div v-if="!node.isNew || user.isLogin">

          <!-- view -->
          <div v-if="node.isViewMode && node.root" class="topic basic-border-color">
            <div>{{node.topic}}</div>
          </div>
          <!-- common -->
          <div class="post-info basic-border-color">
            <div class="post-info-left">{{node.isNew ? user.name : node.name}}</div>
            <div class="post-info-right">
              <span v-if="node.regDtText">{{node.regDtText}}</span>
              <span v-if="node.isViewMode && node.name == user.name" class="info-btn" @click="node.isViewMode = false">수정</span>
              <span v-if="node.isViewMode && (node.name == user.name || user.isRoot)" class="info-btn" @click="node.root ? deleteTopic(node) : deletePost(node)">삭제</span>
              <span v-if="!node.isViewMode && node.postNo != 0" class="info-btn" @click="node.root ? updateTopic(node) : updatePost(node)">수정완료</span>
              <span v-if="!node.isViewMode && node.postNo == 0" class="info-btn" @click="node.root ? createTopic(node) : createPost(node)">작성완료</span>
            </div>
          </div>
          <!-- view -->
          <div v-if="node.isViewMode" v-html="render(node.content)" class="node-content"></div>
          <!-- edit -->
          <div v-else>
            <div v-if="node.root" class="topic basic-border-color">
              <input type="text" v-model="node.editTopic" class="std-inp-txt" placeholder="제목을 입력해주세요." />
            </div>
            <md v-model="node.editContent" :height="node.editHeight" placeholder="내용을 입력해주세요." />
          </div>

        </div>
      </div>

      <div v-if="view.posts.length == 0">
        <div class="empty-content">존재하지 않거나 삭제된 게시물 입니다.</div>
      </div>
    </div>


    <table class="list a-text-style">
      <tr class="mob-hide">
        <th class="seq">번호</th>
        <th class="post">댓글</th>
        <th class="subject">제목</th>
        <th class="name">작성자</th>
        <th class="date">날짜</th>
      </tr>
      <tr v-for="node in list.content" :key="node.topicNo" :class="({sel: node.topicNo == topicNo})">
        <td class="seq mob-hide">{{node.topicNo}}</td>
        <td class="post mob-hide">{{node.postCount}}</td>
        <td class="subject">
          <router-link :to="hrefList(node)">{{node.topic}}</router-link>
          <div class="mob-show">댓글: {{node.postCount}} / {{node.name}} / {{node.regDt}}</div>
        </td>
        <td class="name mob-hide">{{node.name}}</td>
        <td class="date mob-hide">{{node.regDt}}</td>
      </tr>
    </table>

    <pagination :href="hrefPage" :total="list.totalPages" :index="list.number" :unit="10" :key="$route.fullPath"/>

  </div>
</template>

<script lang="ts">
import PageData from '@/models/PageData'
import Pagination from '@/components/Pagination.vue'
import Md from '@/components/MarkdownEditor.vue'
import {Options, Vue} from "vue-class-component"
import BoardService from "@/service/BoardService"
import Nabi from "@/utils/nabi"
import AnimeService from "@/service/AnimeService"
import MarkdownUtil from "@/utils/MarkdownUtil"
import AnissiaUtil from "@/utils/AnissiaUtil"

@Options({
  props: {
    ticker: String
  },
  components: {
    Pagination,
    Md,
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      this.load();
    }
  },
  methods: {
    hrefList(node: any) {
      return Nabi.address().deleteParameter('write').setParameter('topicNo', node.topicNo).href;
    },
    hrefPage(index: number) {
      return Nabi.address().deleteParameter(['topicNo', 'write']).setParameter('page', index + 1).href;
    },
    render(text: string): string {
      return MarkdownUtil.render(text);
    },
    init() {
      if (this.info.ticker != '') {
        this.load();
      } else {
        BoardService.getTicker(this.ticker, (info) => { this.info = info; this.load(); });
      }
    },
    hasPer(action: string, node: (any | null) = null) {
      const user = this.user;
      if (!user.isLogin) { return false; }
      switch (action) {
        case 'wt': return user.hasRole(...this.info.writeTopicRoles);
        case 'wp': return user.hasRole(...this.info.writePostRoles);
      }
    },
    createTopic(node: any) {
      BoardService.createTopic(this.ticker, node, res => { if (res.st == 'OK') { this.pageQuery = 'N/A'; this.$router.push(`?topicNo=${res.data}`); } else { alert(res.msg || '일시적인 오류입니다.'); } });
    },
    updateTopic(node: any) {
      BoardService.updateTopic(node.topicNo, node, res => { if (res.st == 'OK') { this.loadForce(); } else { alert(res.msg || '일시적인 오류입니다.'); } });
    },
    deleteTopic(node: any) {
      if (!confirm('정말로 삭제하시겠습니까?')) { return; }
      BoardService.deleteTopic(node.topicNo, res => { if (res.st == 'OK') { this.loadForce(true); } else { alert(res.msg || '일시적인 오류입니다.'); } });
    },
    createPost(node: any) {
      BoardService.createPost(node.topicNo, node, res => { if (res.st == 'OK') { this.loadForce(); } else { alert(res.msg || '일시적인 오류입니다.'); } });
    },
    updatePost(node: any) {
      BoardService.updatePost(node.postNo, node, res => { if (res.st == 'OK') { this.loadForce(); } else { alert(res.msg || '일시적인 오류입니다.'); } });
    },
    deletePost(node: any) {
      if (!confirm('정말로 삭제하시겠습니까?')) { return; }
      BoardService.deletePost(node.postNo, res => { if (res.st == 'OK') { this.loadForce(); } else { alert(res.msg || '일시적인 오류입니다.'); } });
    },
    loadForce(clearPath = false) {
      this.pageQuery = 'N/A';
      if (clearPath) {
        this.$router.push(this.$route.path);
      } else {
        this.load();
      }
    },
    load() {
      const topicNo = this.topicNo = Nabi.address().getIntParameter("topicNo", -1);
      this.page = Math.max(Nabi.address().getIntParameter("page"), 1) - 1;
      const pageQuery = `${this.page} ${this.query}`;

      // view
      if (topicNo > 0) {
        BoardService.getTopic(this.ticker, topicNo, view => {
          const user = this.user;
          view.posts.forEach((node: any) => {

            node.isNew = false;
            node.isViewMode = true;
            node.editContent = node.content;
            node.regDtText = AnissiaUtil.ymdOrDynamicAgo(node.regDt);
            node.topicNo = view.topicNo;
            node.editHeight = '480px';

            if (node.root) {
              node.topic = node.editTopic = view.topic;
            }
          });

          if (view.posts.length > 0) {
            view.posts.push({
              isNew: true,
              isViewMode: false,
              name: '',
              root: false,
              topicNo: view.topicNo,
              postNo: 0,
              editTopic: '',
              editContent: '',
              editHeight: '240px'
            });
          }

          this.view = view;
        });
      } else if (topicNo == 0) {
        const user = this.user;
        this.view = ({
          posts: [{
            isNew: true,
            isViewMode: false,
            root: true,
            name: '',
            topicNo: 0,
            postNo: 0,
            topic: '',
            content: '',
            regDtText: '',
            editTopic: '',
            editContent: '',
            editHeight: '480px'
          }]
        });
      } else {
        this.view = null;
      }

      // list
      if (this.pageQuery != pageQuery) {
        this.pageQuery = pageQuery;
        BoardService.getList(this.ticker, this.query, this.page, (list) => this.list = list);
      }
    },
  },
})

export default class Board extends Vue {
  data() {
    return {
      // basic
      info: {'ticker':'', 'name':'', 'writeTopicRoles':[], 'writePostRoles':[]},
      // param
      query: '',
      page: 0,
      pageQuery: '',
      topicNo: -1,
      // data
      list: new PageData(),
      view: null as any|null,
      // meta
      meta: {
        isNewMode: false,
        newSubject: '',
        newContent: '',
        newPostContent: '',
      },
    };
  }
}

</script>

<style>
.board {  }
.board input { border:0; }
.board input[type=button] { height:32px; }
.board .fo { overflow: auto; }
.board .fl { float:left; }
.board .fr { float:right; text-align: right }
.board .doc-title { padding:0 !important; overflow: auto }
.board .doc-title .fl { padding: 6px 8px 10px; }
.board .doc-title .fr { padding:5px 4px 0 0; }
.board table.list { width:100%; margin:16px 0 20px; }
.board table.list th { border-bottom-width: 1px; padding: 8px 0; font-size: 12px; }
.board table.list td { border-bottom-width: 1px; line-height: 2; padding:12px 0; font-size:13px; }
.board table.list td:not(.subject) { text-align: center }
.board table.list td.subject {  }
.board table.list td.seq { width:60px; }
.board table.list td.post { width:60px; }
.board table.list td.subject { padding-left:8px; }
.board table.list td.name { width:130px; }
.board table.list td.date { width:130px }
.board table.list tr.sel td { font-weight: bold }

.board .board-view { margin-bottom: 120px; }
.board .board-view .empty-content { text-align: center; padding:140px 0 80px; }
.board .board-view .node { border-bottom-width: 1px }
.board .board-view .topic { border-bottom-width: 1px }
.board .board-view .topic div { font-size:18px; font-weight: bold; line-height: 2; padding: 4px 8px; }
.board .board-view .topic input { height: 40px; width:100%; padding:0 8px; }
.board .board-view .post-info { overflow: auto; border-bottom-width: 1px; font-size:15px; line-height: 40px; }
.board .board-view .post-info .post-info-left { float:left; height:40px; padding: 0 8px; }
.board .board-view .post-info .post-info-right { float:right; text-align: right }
.board .board-view .post-info .post-info-right > span { margin-right: 8px; vertical-align: top; font-size:14px; }
.board .board-view .post-info .info-btn { cursor: pointer }
.board .board-view .post-info .info-btn:hover { text-decoration: underline }
.board .board-view .node-content { font-size:14px; line-height: 1.8; padding: 0px 6px 20px; }
.board .board-view .node-content hr { border-width: 1px 0 0 0; }
.board .board-view table th,
.board .board-view table td { border-width: 1px; padding:8px; }


@media (min-width: 701px) {
  .board .mob-show { display: none }
}

@media (max-width: 700px) {
  .board .mob-hide { display: none }
  .board table.list td.subject { padding:8px 12px; }
  .board table.list td.subject a { font-size:14px; }
}

</style>
