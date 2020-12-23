<template>
  <div class="feed">

    <form class="base-mat article-write">
      <div class="on-focus-unit article-writer">
        <div class="article-writer-submit">
          <input type="button" value="작성완료" title="Ctrl + Enter" @click="this.addArticle()"/>
        </div>
        <div v-if="this.isLogin" class="article-writer-info">
          <b>{{$store.state.user.name}}</b>
        </div>
        <div v-else class="article-writer-info">
          <input v-model="this.nickname" maxlength="16" type="text" placeholder="이름"
          /><input v-model="this.password" maxlength="64" type="password" placeholder="암호" autocomplete="new-password"/>
        </div>
      </div>
      <div>
        <textarea v-model="this.content" placeholder="타임라인 글쓰기" maxlength="1024" @keyup.ctrl.enter="this.addArticle()"></textarea>
      </div>
    </form>

    <div v-for="(node, index) in this.articles" :key="node.id">
      <div class="base-mat article">
        <div class="article-writer">
          <div class="article-writer-tool">
            <span class="date-info">{{node.regDtAgo}}</span>
            <span @click="this.deleteArticle(index)"><span class="bar"> | </span>삭제</span>
          </div>
          <div class="article-writer-info">
            <b>{{node.name}}</b>
            <span v-if="!node.member">&nbsp;({{node.ip}})</span>
          </div>
        </div>
        <div class="content">
          {{node.content}}
        </div>
        <div class="article-info">
          <div v-if="node.tags" class="article-tags">
            <a :href="'/stock/'+tag.id+'/feed'" v-for="tag in node.tags" :key="tag.id">{{tag.name}}</a>
            <!--<a :href="'/stock/'+tag.id+'/feed'" v-for="tag in node.tags" :key="tag.id"><div class="x-tag">{{tag.name}}</div></a>-->
          </div>
          <div class="article-opinion">
            <span :class="(node.voteUp > 0 ? 'vote-up' : 'vote-none')" class="vote-count" @click="this.voteArticle(index, 'voteUp')">
              ▲ {{node.voteUp}}
            </span>
            <span :class="(node.voteDown > 0 ? 'vote-down' : 'vote-none')" class="vote-count" @click="this.voteArticle(index, 'voteDown')">
              ▼ {{node.voteDown}}
            </span>
            <span class="add-reply">
              댓글
            </span>
          </div>
        </div>
      </div>
    </div>


    <div v-for="node in this.articles" :key="node.id" class="base-mat node">
      {{node}}
    </div>
    autocomplete


    <div class="popup-background" v-if="this.popupDelete != null" @click="(e) => this.popupDelete = e.target.className == 'popup-background' ? null : this.popupDelete">
      <div class="popup-box">
        <div class="center title">비밀번호를 입력해주세요.</div>
        <div class="center">
          <input type="password" autocomplete="new-password"
                 v-model="this.password"
                 @keyup.esc="this.popupDelete = null"
                 @keyup.enter="this.deleteWithPassword(...this.popupDelete.split('-').map((e) => Number(e)))"
                 ref="popupDeletePasswordRef" />
        </div>
        <div class="center button-wrap">
          <input type="button" value="삭제" @click="this.deleteWithPassword(...this.popupDelete.split('-').map((e) => Number(e)))"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FeedService from "@/service/FeedService";
import AnissiaUtil from "@/utils/AnissiaUtil";

@Options({
  props: {
    targetStockId: String
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin();
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    norDate(date: string) {
      return AnissiaUtil.ymdOrDynamicAgo(date);
    },
    isEdit(node: any) {
      return this.user.name === node.name;
    },
    isDelete(node: any) {
      return this.user.roles.indexOf('ADMIN') != -1 || this.user.name === node.name;
    },
    enablePassword(enable: boolean) {
      document.querySelectorAll("input[type=password]").forEach(e => (e as any).readOnly = !enable)
    },
    addArticle() {
      FeedService.addArticle(this.nickname, this.password, this.content, this.targetStockId || null, (res) => {
        if (res.st == 'OK') {
          this.content = '';
          this.getArticles();
          if (document.activeElement) {
            (document.activeElement as any).blur();
          }
        } else if (res.msg) {
          alert(res.msg);
        }
      });
    },
    deleteWithPassword(feedIndex: number, replyIndex: number) {
      this.enablePassword(false);
      if (replyIndex) {
        this.deleteArticle();
      } else {
        this.deleteArticle(feedIndex, this.password);
      }
    },
    deleteArticle(index: number, password: string) {
      const node = this.articles[index];
      if (!node.member && !password) {
        this.popupDelete = `${index}`;
        return;
      }
      FeedService.deleteArticle(node.id, password ? password : '-', result => {
        this.enablePassword(true);
        if (result.st == 'OK') {
          this.popupDelete = null;
          this.articles.splice(index, index + 1);
        } else if (result.msg) {
          alert(result.msg);
        }
      })
    },
    getArticles() {
      FeedService.getArticles(this.targetStockId || '', this.query, this.lessThenFeedNo, res => {

        this.articles = res;

        // an: 0
        // blocked: false
        // content: "타임라인테스트글"
        // id: 33
        // ip: "127.0.0.1"
        // name: "aa"
        // password: "dfwef"
        // regDt: "2020-10-22T12:06:28.926732"
        // replies: []
        // tagCodes: ""
        // tagNames: ""
        // voteDown: 0
        // voteUp: 0
      });
    },
    voteArticle(index: number, vote: string) {
      FeedService.voteArticle(this.articles[index].id, vote, (res) => {
        if (res.st == 'OK') {
          this.articles[index] = res.data;
        } else if(res.msg) {
          alert(res.msg);
        }
      });
    }
  },
  mounted() {
    this.lessThenFeedNo = 0;
    this.query = '';
    this.getArticles();
  },
  created() {
    this.nickname = localStorage.getItem('feedNickname') || '';
    this.password = localStorage.getItem('feedPassword') || '';
  },
  watch: {
    nickname(n: string, o: string) {
      localStorage.setItem('feedNickname', n);
    },
    password(n: string, o: string) {
      localStorage.setItem('feedPassword', n);
    },
    popupDelete(n: string | null, o: string | null) {
      if (n != null) {
        this.$nextTick(() => {
          this.$refs.popupDeletePasswordRef.focus();
        });
      }
    }
  }
})
export default class Feed extends Vue {
  targetStockId?: string;
  data() {
    return {
      popupDelete: null as string | null,
      lessThenFeedNo: 0,
      query: '',
      nickname: '',
      password: '',
      content: '',
      articles: [] as any[]
    };
  }
}
</script>

<style>

.feed textarea,
.feed input[type=text],
.feed input[type=password] { outline: none; padding:0; box-sizing: border-box; border:0; }
.feed img.member-icon { height: 12px; margin:0 6px 0 4px; vertical-align: baseline }
.feed .content { padding:2px 0; font-size:14px; word-break: break-all; white-space: pre-wrap; line-height: 1.5 }

.feed .base-mat { margin:0 0 12px; padding:8px 10px }

.feed .article-writer { overflow: auto; padding-bottom:4px; margin-bottom:2px; }
.feed .article-writer-info {  float:left; }
.feed .article-writer-submit { float:right }
.feed .article-writer-tool { float:right; }

.feed .article-write {  }
.feed .article-write textarea { width:100%; line-height: 1.8; transition: height .05s; padding:4px; resize: none; }
.feed .article-write:not(:focus-within) textarea { height:20px;  padding:0 4px; overflow: hidden }
.feed .article-write:not(:focus-within) .on-focus-unit { display: none }
.feed .article-write:focus-within textarea { height:120px; }
.feed .article-write .article-writer-info { line-height: 40px; }
.feed .article-write .article-writer-info input { height:40px; border:0; }
.feed .article-write .article-writer-submit input { height: 40px; border: 0; }

.feed .article .article-writer {  }
.feed .article .article-writer-info,
.feed .article .article-writer-tool { line-height: 24px; }
.feed .article .article-writer-info { font-size:14px;  }
.feed .article .article-writer-tool { float:right; font-size:12px; line-height: 20px; }
.feed .article .article-writer-tool .bar { color:#777 }
.feed .article textarea { width:100%; height:120px; line-height: 1.8; padding:4px; resize: none; }

.feed .article .article-info { padding:6px 0 3px; overflow:auto; font-size:13px; }
.feed .article .article-info .article-tags { float:left; }
.feed .article .article-info .article-tags a { margin-right: 7px;  font-weight: bold }
.feed .article .article-info .article-opinion { float:right; }


html.light .feed textarea,
html.light .feed input { color:#000; }
html.light .feed input[type=button] { background: #276998; color:#fff }
html.light .feed .article-write .article-writer { border-bottom: 1px solid #ddd }
html.light .feed .article textarea { border: 1px solid #ddd }
html.light .feed .vote-up { color:#af3232; }
html.light .feed .vote-down { color:#3f52ad; }
html.light .feed .article .article-info .article-tags a { color:#3b988b }

html.dark .feed textarea,
html.dark .feed input { background: transparent; color:#bbb; }
html.dark .feed input[type=button] { background: #111; color:#276998 }
html.dark .feed .article-write .article-writer { border-bottom: 1px solid #333 }
html.dark .feed .article textarea { border: 1px solid #333 }
html.dark .feed img.member-icon { opacity: .5 }
html.dark .feed .vote-up { color:#a04040; }
html.dark .feed .vote-down { color:#4a5491; }
html.dark .feed .article .article-info .article-tags a { color:#659891 }

/*

.feed .feed-info { margin-bottom:8px; padding-bottom: 6px; }
.feed .feed-info .feed-info-right { float: right }
.feed .feed-info input { max-width: 100px; vertical-align: top }

.feed .node .node-bottom { overflow:auto; padding:0 0 2px }
.feed .node .node-bottom .node-tags { float:left }
.feed .node .node-bottom .node-tool { float:right; margin-top:12px; font-size:12px; }

.feed .node .vote-none { color:#777; }
.feed .node .vote-count { cursor:pointer; margin-right: 18px; font-weight: bold }
.feed .node .date-info { margin:0 4px; }


*/
</style>
