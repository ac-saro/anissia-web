<template>
  <div id="lost" class="mono-area">
    <div>

      <div class="lost-title">
        암호찾기
      </div>

      <div class="base-mat" v-if="mode == 'none'">
        <div class="base-mat">
          <div class="input-unit"><input type="text" v-model="email" placeholder="이메일" autocomplete="off" /></div>
          <div class="input-unit"><input type="text" v-model="name" placeholder="닉네임" autocomplete="off" /></div>
          <div class="input-unit"><input type="password" v-model="password" placeholder="새 암호" autocomplete="off" /></div>
          <div class="input-unit"><input type="password" v-model="passwordConfirm" placeholder="새 암호확인" autocomplete="off" /></div>
          <div class="input-unit"><input type="button" @click="sendMailAuth()" value="암호변경 인증문자 발송" /></div>
        </div>
      </div>

      <div class="base-mat lost-result" v-if="mode == 'pass'">
        <div class="icon"><img src="@/assets/layout/page/ac-pass.svg" /></div>
          <div class="title">암호가 변경되었습니다.</div>
          <div class="desc">
            <router-link to="/login">로그인</router-link> 페이지로 이동하여 로그인해주세요.
          </div>
      </div>

      <div class="base-mat lost-result" v-if="mode == 'fail'">
        <div class="icon"><img src="@/assets/layout/page/ac-fail.svg" /></div>
        <div class="title">회원가입에 실패하였습니다</div>
        <div v-if="failMessage">
          <div class="desc">{{failMessage}}</div>
        </div>
        <div v-else>
          <div class="desc">이메일 인증이 만료되었습니다.</div>
        </div>
      </div>

      <div class="base-mat lost-result" v-if="mode == 'wait'">
        <div class="icon"><img src="@/assets/layout/page/ac-wait.svg" /></div>
        <div class="title">이메일 인증확인중</div>
        <div class="desc">
          이메일 인증을 확인하는 중입니다...
        </div>
      </div>

    </div>
  </div>
</template>

<style>
#lost .lost-title { text-align: center; font-size: 30px; color:#777; padding: 24px 0 48px; font-weight: bold }
#lost .lost-result .icon { padding:24px 0; text-align:center }
#lost .lost-result .icon img { max-width:32%; }
#lost .lost-result .title { text-align: center; font-size:22px; font-weight: bold; padding-bottom: 18px; }
#lost .lost-result .desc { line-height: 1.6; font-size:14px; text-align: center; padding-bottom: 32px }

html.light #lost a { color:#3f52ad; }
html.dark #lost a { color:#a0a0a0; }

@media (max-width: 640px) {
  #lost .lost-title { padding:12px 0 40px }
}
</style>

<script lang="ts">
import nabi from "@/utils/nabi";
import {Options, Vue} from "vue-class-component";

@Options({
  created() {
    const ac = nabi.address().getParameter("ac");
  },
  methods: {
    sendMailAuth() {
      alert(1);
    }
  }
})

export default class Lost extends Vue {
  data() {
    return {
      mode: 'none', // none wait fail pass
      failMessage: '',
      email: '',
      password: '',
      passwordConfirm: '',
      name: false,
    };
  }
}
</script>
