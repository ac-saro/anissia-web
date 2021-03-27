<template>
  <div @click="clickAutocorrect">
    <div class="basic-layout">
      <div class="basic-layout-mono" id="tr-apply">
        <div class="base-mat">

          <div class="doc-title fo">
            <div class="fl">자막제작자 신청</div>
            <div v-if="applyNo == -1 && hasPer('apply')" class="fr"><input type="button" class="std-inp-btn" value="신청하기" @click="$router.push('?applyNo=0')"/></div>
            <div v-if="applyNo > 0" class="fr"><input type="button" class="std-inp-btn" value="목록" @click="$router.push($route.path)"/></div>
          </div>

          <!-- apply -->
          <div v-if="applyNo == 0" class="app">
            <div class="agree">
              <div class="subject">자막제작자 신청 동의사항</div>
              <ul>
                <li>권한신청을 위해서 4편이상(동일작품)의 자막 작업물이 있어야 합니다.</li>
                <li>블로그 내에 불법영상이나 불건전한 정보가 있을 경우 거부될 수 있습니다.</li>
                <li>권한 부여 후에도 위와 같은 사항이 발견되면 고지 없이 권한이 회수될 수 있습니다.</li>
                <li>자막 도용시 추후에 적발되더라도 권한이 회수될 수 있습니다.</li>
              </ul>
              <div class="sign">
                <label><input type="checkbox" v-model="neo.agree" /> 위 사항을 읽고 확인하였습니다.</label>
              </div>
            </div>

            <div class="report">
              <div class="subject">블로그주소</div>
              <div class="pad">
                <input type="text" v-model="neo.website" class="std-inp-txt basic-border-color" placeholder="http://example-blog.com - 동일작 기준 4편이상 자막 확인을 위한 블로그 주소 입력" />
              </div>

            </div>

            <div class="submit">
              <input class="std-inp-btn" type="button" @click="createApply()" value="신청하기"/>
            </div>
          </div>
          <!-- view -->
          <div v-if="view != null">
            <div v-if="view.applyNo > 0" class="view">
              <div class="subject">자막제작자 신청 진행사항</div>
              <div>
                <table class="report">
                  <tr><th>신청일자</th><td>{{ view.regDtText }}</td></tr>
                  <tr><th>심사번호</th><td>{{ view.applyNo }}</td></tr>
                  <tr><th>상태</th><td>{{ view.resultText }}</td></tr>
                  <tr><th>신청자</th><td>{{ view.name }}</td></tr>
                  <tr><th>블로그주소</th><td><a :href="view.website" target="_blank">{{ view.website }}</a></td></tr>
                </table>
              </div>

              <div>
                <table class="poll-table">
                  <tr v-for="node in view.polls" :key="node.no">
                    <td class="main">
                      <div v-if="node.name != ''"><b>{{node.name}}</b> <b v-if="node.voteText">[{{node.voteText}}]</b> : {{node.comment}}</div>
                      <div v-else>{{node.comment}}</div>
                    </td>
                    <td class="date">{{node.regDyText}}</td>
                  </tr>
                </table>
              </div>

              <div v-if="view.status == 'ACT'">
                <div v-if="user.isAdmin" class="poll basic-border-color">
                  <div class="poll-point">
                    <input type="radio" name="poll" id="pool-p" v-model="poll.point" value="1" /><label for="pool-p" class="fas fa-thumbs-up" title="수리"></label>
                    <input type="radio" name="poll" id="pool-m" v-model="poll.point" value="-1" /><label for="pool-m" class="fas fa-thumbs-down" title="반려"></label>
                    <input type="radio" name="poll" id="pool-o" v-model="poll.point" value="0" /><label for="pool-o" class="fas fa-comment-dots" title="의견"></label>
                  </div>
                  <div class="poll-comment">
                    <input type="text" class="std-inp-txt" @keyup.enter="createPoll(poll.point)" v-model="poll.comment" placeholder="수리/반려/의견 아이콘 선택 후 글을 쓴 후 엔터" maxlength="64"/>
                  </div>
                </div>
                <div v-else-if="view.name == user.name" class="poll basic-border-color">
                  <div><input type="text" class="std-inp-txt" @keyup.enter="createPoll('0')" v-model="poll.comment" placeholder="의견 작성 후 엔터 (의견제출)" maxlength="64"/></div>
                </div>
              </div>

            </div>
            <div v-else>
              <div class="empty-content">존재하지 않거나 삭제된 신청내역입니다.</div>
            </div>
          </div>


          <!-- list -->
          <div>
            <table class="list">
              <tr>
                <th>번호</th>
                <th>상태</th>
                <th>제목</th>
                <th>등록일</th>
              </tr>
              <tr v-for="node in list.content" :key="node.applyNo" :class="({sel: node.applyNo == applyNo})">
                <td class="no">{{node.applyNo}}</td>
                <td class="st">{{node.resultText}}</td>
                <td class="app"><router-link :to="hrefList(node.applyNo)"><b>{{node.name}}</b>님의 자막제작자 권한 신청서</router-link></td>
                <td class="date">{{node.regDyText}}</td>
              </tr>
            </table>
          </div>

          <!-- page -->
          <div>
            <pagination :total="list.totalPages" :index="page" :unit="10" :href="hrefPage" :key="$route.fullPath"/>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>



<script lang="ts">
import AnimeRank from "@/components/AnimeRank.vue"
import {Options, Vue} from "vue-class-component"
import Nabi from "@/utils/nabi"
import PageData from "@/models/PageData"
import Pagination from "@/components/Pagination.vue"
import AnimeService from "@/service/AnimeService"
import AnissiaUtil from "@/utils/AnissiaUtil"
import TranslatorService from "@/service/TranslatorService"

@Options({
  components: {
    AnimeRank,
    Pagination
  },
  computed: {
    user() {
      return this.$store.state.user;
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
    loadClear() {
      this.page = -1;
    },
    load() {
      const applyNo = this.applyNo = Nabi.address().getIntParameter("applyNo", -1);
      const page = Nabi.address().getIntParameter("page", 1) - 1;

      // view
      if (applyNo > 0) {
        TranslatorService.getApply(applyNo, view => {
          this.view = view;
        });
      } else {
        this.view = null;
      }

      // list
      if (this.page != page) {
        this.page = page;
        TranslatorService.getApplyList(page, list => this.list = list);
      }
    },
    hasPer(action: string, node: (any | null) = null) {
      const user = this.user;
      if (!user.isLogin) { return false; }
      return true;
      // switch (action) {
      //   case 'apply': return !user.isAdmin;
      //
      // }
    },
    createApply() {
      if (!this.neo.agree) {
        alert('자막제작자 신청 동의사항을 읽고 동의해주세요.');
        return;
      }
      TranslatorService.createApply(this.neo.website, res => {
        if (res.st == 'OK') {
          this.loadClear();
          this.$router.push(`?applyNo=${res.data}`)
        } else {
          alert(res.msg);
        }
      });
    },
    createPoll(point: string) {
      const comment = this.poll.comment;
      this.poll.comment = '';
      TranslatorService.createApplyPoll(this.applyNo, { point, comment }, res => {
        if (res.st == 'OK') {
          this.loadClear();
          this.load();
        } else {
          alert(res.msg);
        }
      });
    },
    hrefList(applyNo: number) {
      return Nabi.address().setParameter('applyNo', applyNo).href;
    },
    hrefPage(index: number) {
      return Nabi.address().deleteParameter('applyNo').setParameter('page', index + 1).href;
    },
  }
})

export default class TranslatorApply extends Vue {
  data() {
    return {
      neo: {
        agree: false,
        website: '',
      },
      poll: {
        point: '0',
        comment: ''
      },
      applyNo: -1,
      view: null as any,
      page: -1,
      list: new PageData(),
    };
  }
}
</script>

<style>

#tr-apply .base-mat { padding: 8px; }
#tr-apply .fo { overflow: auto; }
#tr-apply .fl { float:left; }
#tr-apply .fr { float:right; text-align: right }
#tr-apply .doc-title { padding:0 !important; overflow: auto }
#tr-apply .doc-title .fl { padding: 6px 8px 10px; }
#tr-apply .doc-title .fr { padding:5px 4px 0 0; }
#tr-apply .doc-title input { border-width:0; height:32px; }
#tr-apply .app .subject { font-size:18px; font-weight: bold; padding:18px 4px 10px; }
#tr-apply .app input[type=text],
#tr-apply .app input[type=button]{ height: 40px; }
#tr-apply .app .agree ul { padding: 0 0 0 28px; margin:0; }
#tr-apply .app .agree ul li { font-size:14px; line-height:1.8 }
#tr-apply .app .agree .sign { padding:16px 4px; font-size:14px; }
#tr-apply .app .report .pad { padding:0 4px; }
#tr-apply .app .report input { width:100%; padding:0 8px; border-width:1px; }
#tr-apply .app .report .info { font-size:14px; opacity: .8 }
#tr-apply .app .submit { padding:36px 4px 48px; }
#tr-apply .app .submit input { padding:0 24px; border:0; }
#tr-apply .empty-content { text-align: center; padding:140px 0; }

#tr-apply .view { padding:0 0 80px; }
#tr-apply .view .subject { font-size:18px; font-weight: bold; padding:18px 4px 10px; }
#tr-apply .view table { font-size:15px; }
#tr-apply .view table.report { min-width:40%; margin: 12px 0 20px; }
#tr-apply .view table.report th { width:100px; text-align: left }
#tr-apply .view table.report th,
#tr-apply .view table.report td{ border-width: 1px; padding: 8px 12px }
#tr-apply .view .poll { border-width: 1px }
#tr-apply .view .poll input[type=text] { width:100%; height:32px; padding:0 4px; border-width: 0 }
#tr-apply .view .poll .poll-point input { position: absolute; visibility: hidden; width:0 !important; height: 0 !important; }
#tr-apply .view .poll .poll-point label {
  opacity: .3; display: inline-block; width:32px; height:32px; line-height: 32px; text-align:center; cursor: pointer;
}
#tr-apply .view .poll .poll-point { float:left; width:96px; }
#tr-apply .view .poll .poll-comment { margin-left:96px; }
#tr-apply .view .poll .poll-point input:checked + label { opacity:1; }
#tr-apply .view table.poll-table { width:100%; margin:20px 0; }
#tr-apply .view table.poll-table td { line-height: 40px; border-width:0 0 1px; padding:0 8px; font-size:14px; }
#tr-apply .view table.poll-table td.date { text-align: right }

#tr-apply table { }
#tr-apply table.list { margin:16px 0 20px;  width:100% }
#tr-apply table.list th { border-bottom-width: 1px; padding: 8px 0; font-size: 12px; }
#tr-apply table.list td { font-size:13px; padding:12px 0; border-top-width: 1px; line-height: 2 }
#tr-apply table.list td { text-align: center;  }
#tr-apply table.list td.no { width:60px; }
#tr-apply table.list td.st { width:60px; }
#tr-apply table.list td.app { padding:0 20px; }
#tr-apply table.list td.date { width:130px  }
#tr-apply table.list tr.sel td { font-weight: bold }

html.light #tr-apply table.list a { color:#444; text-decoration: none }

html.dark #tr-apply table.list a { color:#aaa; text-decoration: none }


</style>