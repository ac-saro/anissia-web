<template>
  <form id="register">
    <div v-if="mode === 'request'">
      <div class="register-box">
        <div class="register-title">회원가입</div>  


        <div class="unit">
          <div class="agree">
            <ul>
              <li>작성한 모든 컨텐츠의 법적책임은 작성자에게 있습니다.</li>
              <li>부적절한 컨텐츠 업로드시 통보없이 삭제될 수 있습니다.</li>
              <li>가입시 계정/생일을 잃어버릴경우 암호 초기화가 불가합니다.</li>
            </ul>  
          </div>
        </div>

        <div class="unit">
          <b class="label">계정</b>
          <div class="input-box">
            <input v-model="account" type="text" placeholder="example@anissia.net" maxlength="64" />
          </div>
        </div>

        <div class="unit">
          <b class="label">암호</b>
          <div class="input-box">
            <input v-model="password" autocomplete="new-password" type="password" placeholder="암호 8 자리 이상" maxlength="128" />
          </div>
        </div>

        <div class="unit">
          <b class="label">암호확인</b>
          <div class="input-box">
            <input v-model="passwordConfirm" autocomplete="new-password" type="password" placeholder="" maxlength="128" />
          </div>
        </div>

        <div class="unit">
          <b class="label">생일 (중요: 암호를 찾는 용도로만 사용)</b>
          <div class="input-box">
            <datepicker :language="ko" format="yyyy-MM-dd" v-model="birth"></datepicker>
          </div>
        </div>

        <div class="unit">
          <b class="label">닉네임</b>
          <div class="input-box">
            <input v-model="name" type="text" placeholder="2~16자 중복 불가 차후 수정 가능" maxlength="16" />
          </div>
        </div>

        <div class="unit" :class="{'bm-open': requestErrorMessage}">
          <div v-if="requestErrorMessage" class="error" :class="{'bm': requestErrorMessage}">{{requestErrorMessage}}</div>
        </div>

        <div class="unit">
          <input type="button" value="가입요청 (인증 이메일 전송)" @click="doRequest()" />
        </div>

      </div>
    </div>
    <div v-if="mode === 'requested'">
      <div class="register-box">
        <div class="register-title">이메일 소유 인증 요청</div>

        <div class="unit">
          <div class="email-icon">
            <img src="@/assets/pages/register-email.svg"/>
          </div>
        </div>

        <div class="unit">
          <div class="email-title">
            <b>{{account}}</b><br/>
            이메일 소유 인증메일이 전송되었습니다.
          </div>
        </div>

        <div class="unit">  
          <div class="email-desc">
            <ul>
              <li><span>이메일인증</span> 완료시 가입이 완료됩니다.</li>
              <li>미수신시 스팸 메일함을 확인해주세요.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <div v-else-if="mode === 'verify'">
      <div class="register-box">
        <div class="register-title">메일 인증</div>

        <div class="unit verify-icon-wrap">
          <div class="email-icon" v-if="verifyState === 'wait'">
            <img src="@/assets/pages/register-auth-wait.svg"/>
          </div>
          <div class="email-icon" v-else-if="verifyState === 'ok'">
            <img src="@/assets/pages/register-auth-ok.svg"/>
          </div>
          <div class="email-icon" v-else-if="verifyState === 'fail'">
            <img src="@/assets/pages/register-auth-fail.svg"/>
          </div>
        </div>

        <div class="unit">
          <div class="verify-icon-wrap">
            <div class="email-title" v-if="verifyState === 'wait'">
              메일 인증을 검증하는 중 입니다.<br/>
              잠시만 기다려주세요.
            </div>
            <div class="email-title" v-else-if="verifyState === 'ok'">
              축하합니다.<br/>
              가입이 완료되었습니다.
            </div>
            <div class="email-title" v-else-if="verifyState === 'fail'">
              {{verifyErrorMessage}}
            </div>
          </div>
        </div>

        <div class="unit" v-if="verifyState === 'ok'">
          <input type="button" value="로그인 페이지로 이동" @click="$router.push('/login')" />
        </div>

        <div class="unit" v-if="verifyState === 'fail'">  
          <div class="email-desc">
            <ul>
              <li>유효기간이 만료된 코드일 수 있습니다.</li>
              <li>이미 인증되었을 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </form>
</template>


<script lang="ts">
import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';
import { ko } from 'vuejs-datepicker/dist/locale';
import AccountService from '@/services/AccountService';
import Nabi from '@/utils/nabi';

export default Vue.extend({
  components: {
    Datepicker,
  },
  data() {
    return {
      // baisc
      ko,
      mode: 'request', // request, requested, verify
      // request
      account: '',
      name: '',
      password: '',
      passwordConfirm: '',
      birth: Nabi.dateFormat().addYear(-20).toDate(),
      requestErrorMessage: '',
      // verify
      token: '',
      verifyState: 'wait', // wait, ok, fail
      verifyErrorMessage: '',
    };
  },
  created() {
    const token = Nabi.address().getParameter('token');
    if (token && typeof token === 'string') {
      this.token = token;
      this.doVerify();
    }
  },
  methods: {
    doRequest() {
      this.requestErrorMessage = '';
      AccountService.requestAccountRegistration(
        this.account, this.password, this.passwordConfirm, this.birth.toISOString().substring(0, 10), this.name,
        (pass, msg) => {
          if (pass) {
            this.mode = 'requested';
          } else {
            this.requestErrorMessage = msg;
          }
        });
    },
    doVerify() {
      this.mode = 'verify';
      AccountService.verifyMailAuthAccountRegistration(this.token, (pass, msg) => {
        if (pass) {
          this.verifyState = 'ok';
        } else {
          this.verifyState = 'fail';
          this.verifyErrorMessage = msg || '인증이 만료되었습니다.';
        }
      });
    },
  },
});
</script>

<style>
#register { padding:100px 20px; }
#register .register-box { max-width:430px; margin:0 auto; background: #fff; padding-bottom:200px; }
#register .register-box .register-title { text-align: center; font-size:30px; font-weight: bold; color:#3468b3; padding-bottom: 24px; }
#register .register-box .unit { margin-top: 24px; }
#register .register-box .unit input { box-sizing: border-box; border-radius: 4px; width:100%; height:40px; }
#register .register-box .unit .label { color:#6475a0; font-size:12px; margin-left:4px; }
#register .register-box .unit .input-box { margin-top: 8px; }
#register .register-box .unit .input-box input { border: 1px solid #d0d0d0; padding:0 10px; }
#register .register-box .unit .token-login { text-align: right; vertical-align: middle }
#register .register-box .unit input[type=button] { background: #5878a7; border:0; font-size:16px; font-weight: bold; color:#fff }
#register .register-box .unit .error { color:#e03535; font-size:15px; padding: 8px 4px 0 }
#register .register-box .unit .pass { color:#e03535; line-height: 2.1; padding:0 10px; word-break: break-all; white-space: pre-wrap; }
#register .register-box .unit .email-icon { text-align: center; padding-top: 20px; }
#register .register-box .unit .email-icon img { width:200px; }
#register .register-box .unit .email-title { text-align: center; line-height: 2; font-weight: bold; font-size:20px; }
#register .register-box .unit .email-title b { color:#3468b3 }
#register .register-box .unit .email-desc { padding-top:20px; line-height: 2 }
#register .register-box .unit .email-desc li span { color:#ea2424 }
#register .register-box .unit .verify-icon-wrap { padding:32px 0 0; }
#register .register-box .unit .agree { border:1px solid #c5acac; color:#b55858; font-size:12px; padding:7px 8px; border-radius: 4px; }
#register .register-box .unit .agree ul { padding:0 0 0 20px; margin:0 }
#register .register-box .unit .agree ul li { line-height: 2 }

@media (max-width: 600px) {
  #register { padding:60px 20px; }
}
</style>
