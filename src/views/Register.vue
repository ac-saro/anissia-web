<template>
  <div id="register" class="mono-area">
    <div>

      <div class="join-title">
        회원가입
      </div>

      <div class="base-mat" v-if="mode == 'none'">
        <div class="input-unit"><input type="text" v-model="email" placeholder="이메일" autocomplete="new-password" /></div>
        <div class="input-unit"><input type="password" v-model="password" placeholder="암호" autocomplete="new-password" /></div>
        <div class="input-unit"><input type="password" v-model="passwordConfirm" placeholder="암호확인" autocomplete="new-password" /></div>
        <div class="input-unit"><input type="text" v-model="this.name" placeholder="닉네임" autocomplete="new-password" /></div>
        <div class="input-unit"><input type="button" @click="register()" value="회원가입 인증문자 발송" /></div>
      </div>

      <div class="base-mat join-result" v-if="mode == 'needMailAuth'">
        <div class="icon"><img src="@/assets/page/account-pass.svg" /></div>
        <div class="title">이메일 인증</div>
        <div class="desc-title">이메일 인증을 완료해주세요.</div>
      </div>

      <div class="base-mat join-result" v-if="mode == 'pass'">
        <div class="icon"><img src="@/assets/page/account-pass.svg" /></div>
        <div class="title">축하합니다!</div>
        <div class="desc-title">회원가입이 완료되었습니다.</div>
        <div class="desc">
          <router-link to="/login">로그인</router-link> 페이지로 이동하여 로그인해주세요.
        </div>
      </div>

      <div class="base-mat join-result" v-if="mode == 'fail'">
        <div class="icon"><img src="@/assets/page/account-fail.svg" /></div>
        <div class="title">회원가입에 실패하였습니다</div>
        <div v-if="message">
          <div class="desc">{{message}}</div>
        </div>
        <div v-else>
          <div class="desc">이메일 인증이 만료되었습니다.</div>
        </div>
      </div>

      <div class="base-mat join-result" v-if="mode == 'wait'">
        <div class="icon"><img src="@/assets/page/account-wait.svg" /></div>
        <div class="title">이메일 인증확인중</div>
        <div class="desc">
          이메일 인증을 확인하는 중입니다...
        </div>
      </div>

    </div>
  </div>
</template>

<style>
#register .base-mat { padding:8px 0 10px }
#register .join-title { text-align: center; font-size: 30px; color:#777; padding: 24px 0 48px; font-weight: bold }
#register .join-result .icon { padding:24px 0; text-align:center }
#register .join-result .icon img { max-width:32%; }
#register .join-result .title { text-align: center; font-size:22px; font-weight: bold; padding-bottom: 18px; }
#register .join-result .desc-title { text-align: center; padding-bottom: 12px; }
#register .join-result .desc { line-height: 1.6; font-size:14px; text-align: center; padding-bottom: 32px }

html.light #register a { color:#3f52ad; }
html.dark #register a { color:#a0a0a0; }

@media (max-width: 640px) {
  #register .join-title { padding:12px 0 40px }
}
</style>

<script lang="ts">
import AccountService from "@/service/AccountService";
import {Options, Vue} from "vue-class-component";

@Options({
  created() {
    const token: string = this.$route.params.token || '';
    if (token !== '') {
      this.mode = 'wait';
      this.registerValidation(token);
    }
  },
  methods: {
    register() {
      AccountService.register(this.email, this.password, this.passwordConfirm, this.name, res => {
        if (res.st == 'OK') {
          this.mode = 'needMailAuth';
        } else if (res.msg) {
          alert(res.msg);
        }
      });
    },
    registerValidation(token: string) {
      AccountService.registerValidation(token, res => {
        if (res.st == 'OK') {
          this.mode = 'pass';
        } else {
          this.mode = 'fail';
          if (res.msg) {
            this.message = res.msg;
          }
        }
      });
    }
  }
})

export default class Register extends Vue {
  data() {
    return {
      mode: 'none', // none wait fail pass
      message: '',
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
    };
  }
}

</script>
