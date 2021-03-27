<template>
  <div id="recover" class="mono-area">
    <div>

      <div class="recover-title">
        계정 분실 복구
      </div>

      <div class="base-mat" v-if="mode == 'none'">
          <div class="input-unit"><input type="text" v-model="account.email" placeholder="이메일" autocomplete="off" /></div>
          <div class="input-unit"><input type="text" v-model="account.name" placeholder="닉네임" autocomplete="off" /></div>
          <div class="input-unit"><input type="button" @click="recover()" value="암호변경 인증문자 발송" /></div>
      </div>

      <div class="base-mat recover-result" v-if="mode == 'needMailAuth'">
        <div class="icon"><img src="@/assets/page/account-pass.svg" /></div>
        <div class="title">이메일 인증</div>
        <div class="desc">
          인증메일이 전송되었습니다.<br/>
          (이메일과 닉네임이 일치한경우)<br/>
          이메일 인증을 완료해주세요.
        </div>
      </div>

      <div class="base-mat recover-result" v-if="mode == 'wait'">
        <div class="icon"><img src="@/assets/page/account-wait.svg" /></div>
        <div class="title">이메일 인증확인중</div>
        <div class="desc">
          이메일 인증을 확인하는 중입니다...
        </div>
      </div>

      <div class="base-mat recover-result" v-if="mode == 'fail'">
        <div class="icon"><img src="@/assets/page/account-fail.svg" /></div>
        <div class="title">이메일 인증에 실패하였습니다</div>
        <div v-if="message">
          <div class="desc">{{message}}</div>
        </div>
        <div v-else>
          <div class="desc">이메일 인증이 만료되었습니다.</div>
        </div>
      </div>

      <div class="base-mat recover-result" v-if="mode == 'needPassword'">
        <div class="input-unit"><input type="password" v-model="account.password" placeholder="새 암호" autocomplete="off" /></div>
        <div class="input-unit"><input type="password" v-model="account.passwordConfirm" placeholder="새 암호확인" autocomplete="off" @keyup.enter="recoverPassword()" /></div>
        <div class="input-unit"><input type="button" @click="recoverPassword()" value="암호변경" /></div>
      </div>

      <div class="base-mat recover-result" v-if="mode == 'pass'">
        <div class="icon"><img src="@/assets/page/account-pass.svg" /></div>
          <div class="title">암호가 변경되었습니다.</div>
          <div class="desc">
            <router-link to="/login">로그인</router-link> 페이지로 이동하여 로그인해주세요.
          </div>
      </div>

      <div class="base-mat recover-result" v-if="mode == 'email'">
        <div style="font-size:12px; padding:8px 0; text-align: center; line-height: 2">
          리뉴얼 이전 구 아이디를 찾기위한 방법으로<br/>
          2021. 02. 09. 이후 접속한 계정은 찾을 수 없습니다.
        </div>
        <div class="input-unit"><input type="text" v-model="account.name" placeholder="닉네임" autocomplete="off" @keyup.enter="recoverEmail()" /></div>
        <div class="input-unit"><input type="button" @click="recoverEmail()" value="이메일 / 아이디(구 애니시아) 확인" /></div>
      </div>

    </div>
  </div>
</template>

<style>
#recover .base-mat { padding:8px 0 10px }
#recover .recover-title { text-align: center; font-size: 30px; color:#777; padding: 24px 0 48px; font-weight: bold }
#recover .recover-result .icon { padding:24px 0; text-align:center }
#recover .recover-result .icon img { max-width:32%; }
#recover .recover-result .title { text-align: center; font-size:22px; font-weight: bold; padding-bottom: 18px; }
#recover .recover-result .desc-title { text-align: center; padding-bottom: 12px; }
#recover .recover-result .desc { line-height: 2; font-size:14px; text-align: center; padding-bottom: 16px }

html.light #recover a { color:#3f52ad; }
html.dark #recover a { color:#a0a0a0; }

@media (max-width: 640px) {
  #recover .recover-title { padding:12px 0 40px }
}
</style>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import AccountService from "@/service/AccountService"
import Result from "@/models/Result"

@Options({
  created() {
    const token = this.token = this.$route.params.token || '';
    if (token == 'email') {
      this.mode = 'email';
    } else if (token !== '') {
      this.recoverValidation(token);
    }
  },
  methods: {
    recover() {
      const ac = this.account;
      AccountService.recover(ac.email, ac.name, result => {
        if (result.st == 'OK') {
          this.mode = 'needMailAuth';
        } else {
          alert(result.msg);
        }
      });
    },
    recoverValidation(token: string) {
      this.mode = 'wait';
      AccountService.recoverValidation(token, res => {
        if (res.st == 'OK') {
          this.mode = 'needPassword';
        } else {
          this.mode = 'fail';
          if (res.msg) {
            this.message = res.msg;
          }
        }
      });
    },
    recoverPassword() {
      const ac = this.account;
      this.mode = 'wait';
      AccountService.recoverPassword(this.token, ac.password, ac.passwordConfirm, res => {
        if (res.st == 'OK') {
          this.mode = 'pass';
        } else {
          this.mode = 'needPassword';
          alert(res.msg);
        }
      });
    },
    recoverEmail() {
      AccountService.recoverEmail(this.account.name, result => {
        if (result.st == 'OK') {
          const data = result.data;
          alert(`이메일:\n - ${data.email}\n\n(구) 아이디:\n - ${data.account}`);
        } else {
          alert(result.msg);
        }
      });
    }
  }
})

export default class Recover extends Vue {
  data() {
    return {
      mode: 'none', // none wait fail pass
      message: '',
      token: '',
      account: {
        email: '',
        name: '',
        password: '',
        passwordConfirm: '',
      },
    };
  }
}
</script>
