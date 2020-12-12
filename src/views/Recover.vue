<template>
  <form id="recover">
    <div v-if="mode === 'request'">
      <div class="recover-box">
        <div class="recover-title">암호찾기</div>  

        <div class="unit">
          <b class="label">계정 (이메일 계정이 아닌경우 가입시 사용한 E-MAIL 주소)</b>
          <div class="input-box">
            <input v-model="requestAccount" type="text" placeholder="example@anissia.net" />
          </div>
        </div>

        <div class="unit">
          <b class="label">생일 (생일값이 없는 계정의 경우 아무값이나 넣어도 무방)</b>
          <div class="input-box">
            <datepicker :language="ko" format="yyyy-MM-dd" v-model="requestBirth"></datepicker>
          </div>
        </div>

        <div class="unit" :class="{'bm-open': requestErrorMessage}">
          <div v-if="requestErrorMessage" class="error" :class="{'bm': requestErrorMessage}">{{requestErrorMessage}}</div>
        </div>

        <div class="unit">
          <input type="button" value="인증이메일 전송" @click="doRequest()" />
        </div>

      </div>
    </div>
    <div v-if="mode === 'requested'">
      <div class="recover-box">
        <div class="recover-title">메일 전송 요청</div>

        <div class="unit">
          <div class="email-icon">
            <img src="@/assets/pages/recover-email.svg"/>
          </div>
        </div>

        <div class="unit">
          <div class="email-title">
            <b>{{requestAccount}}</b><br/>
            인증메일이 요청되었습니다.
          </div>
        </div>

        <div class="unit">  
          <div class="email-desc">
            <ul>
              <li><span>계정과 생일이 맞을 경우만</span> 메일이 발송됩니다.</li>
              <li>미수신시 스팸 메일함을 확인해보세요.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <div v-else-if="mode === 'verify'">
      <div class="recover-box">
        <div class="recover-title">메일 인증</div>

        <div class="unit verify-icon-wrap">
          <div class="email-icon" v-if="verifyState === 'wait'">
            <img src="@/assets/pages/recover-auth-wait.svg"/>
          </div>
          <div class="email-icon" v-else-if="verifyState === 'ok'">
            <img src="@/assets/pages/recover-auth-ok.svg"/>
          </div>
          <div class="email-icon" v-else-if="verifyState === 'fail'">
            <img src="@/assets/pages/recover-auth-fail.svg"/>
          </div>
        </div>

        <div class="unit">
          <div class="verify-icon-wrap">
            <div class="email-title" v-if="verifyState === 'wait'">
              메일 인증을 검증하는 중 입니다.<br/>
              잠시만 기다려주세요.
            </div>
            <div class="email-title" v-else-if="verifyState === 'ok'">
              메일인증이 완료되었습니다.<br/>
              암호를 재설정 해주세요.
            </div>
            <div class="email-title" v-else-if="verifyState === 'fail'">
              유효하지 않은 메일 인증입니다.
            </div>
          </div>
        </div>

        <div v-if="verifyState === 'ok'">
          <div class="unit">
            <b class="label">암호</b>
            <div class="input-box">
              <input v-model="changePassword" type="password" placeholder="암호 8 자리 이상" />
            </div>
          </div>

          <div class="unit">
            <b class="label">암호확인</b>
            <div class="input-box">
              <input v-model="changePasswordConfirm" type="password" placeholder="" />
            </div>
          </div>

          <div class="unit" :class="{'bm-open': changePasswordErrorMessage}">
            <div v-if="changePasswordErrorMessage" class="error" :class="{'bm': changePasswordErrorMessage}">{{changePasswordErrorMessage}}</div>
          </div>

          <div class="unit">
            <input type="button" value="암호변경" @click="doChangePassword()" />
          </div>
        </div>

        <div class="unit" v-if="verifyState === 'fail'">  
          <div class="email-desc">
            <ul>
              <li>유효기간이 만료된 코드일 수 있습니다.</li>
              <li>이미 암호변경을 완료한 코드일 수 있습니다.</li>
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
      ko,
      mode: 'request', // request, requested, verify
      requestAccount: '',
      requestBirth: new Date(),
      requestErrorMessage: '',
      token: '',
      verifyState: 'wait', // wait, ok, fail
      changePassword: '',
      changePasswordConfirm: '',
      changePasswordErrorMessage: '',
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
      AccountService.requestMailAuthForAccountRecover(
          this.requestAccount, this.requestBirth.toISOString().substring(0, 10), (pass, msg) => {
        if (pass) {
          this.mode = 'requested';
        } else {
          this.requestErrorMessage = msg;
        }
      });
    },
    doVerify() {
      this.mode = 'verify';
      AccountService.verifyMailAuthForAccountRecover(this.token, (pass, msg) => {
        this.verifyState = pass ? 'ok' : 'fail';
      });
    },
    doChangePassword() {
      this.changePasswordErrorMessage = '';
      AccountService.changePasswordForAccountRecover(
          this.token, this.changePassword, this.changePasswordConfirm, (pass, msg) => {
        if (pass) {
          alert('암호가 변경되었습니다.');
          this.$router.push('/login');
        } else {
          this.changePasswordErrorMessage = msg;
        }
      });
    },
  },
});
</script>

<style>
#recover { padding:100px 20px; }
#recover .recover-box { max-width:420px; margin:0 auto; background: #fff; padding-bottom:200px; }
#recover .recover-box .recover-title { text-align: center; font-size:30px; font-weight: bold; color:#3468b3; padding-bottom: 24px; }
#recover .recover-box .unit { margin-top: 24px; }
#recover .recover-box .unit input { box-sizing: border-box; border-radius: 4px; width:100%; height:40px; }
#recover .recover-box .unit .label { color:#6475a0; font-size:12px; margin-left:4px; }
#recover .recover-box .unit .input-box { margin-top: 8px; }
#recover .recover-box .unit .input-box input { border: 1px solid #d0d0d0; padding:0 10px; }
#recover .recover-box .unit .token-login { text-align: right; vertical-align: middle }
#recover .recover-box .unit input[type=button] { background: #5878a7; border:0; font-size:16px; font-weight: bold; color:#fff }
#recover .recover-box .unit .error { color:#e03535; font-size:15px; padding: 8px 4px 0 }
#recover .recover-box .unit .pass { color:#e03535; line-height: 2.1; padding:0 10px; word-break: break-all; white-space: pre-wrap; }
#recover .recover-box .unit .email-icon { text-align: center; padding-top: 20px; }
#recover .recover-box .unit .email-icon img { width:200px; }
#recover .recover-box .unit .email-title { text-align: center; line-height: 2; font-weight: bold; font-size:20px; }
#recover .recover-box .unit .email-title b { color:#3468b3 }
#recover .recover-box .unit .email-desc { padding-top:20px; line-height: 2 }
#recover .recover-box .unit .email-desc li span { color:#ea2424 }
#recover .recover-box .unit .verify-icon-wrap { padding:32px 0 0; }

@media (max-width: 600px) {
  #recover { padding:60px 20px; }
}
</style>
