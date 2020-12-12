<template>
  <form id="login">
    <div class="login-box">

      <div class="login-title">로그인</div>  

      <div class="unit">
        <b class="label">계정 (현재 이메일 계정과 일반계정이 혼용되고 있습니다.)</b>
        <div class="input-box">
          <input v-model="account" name="account" type="text" placeholder="example@anissia.net" />
        </div>
      </div>

      <div class="unit">
        <b class="label">암호</b>
        <div class="input-box">
          <input v-model="password" name="password" type="password" placeholder="8자리 이상" @keyup.enter="doLogin()" />
        </div>
      </div>

      <div class="unit">
        <div class="token-login">
          <toggle-button v-model="tokenLogin" :value="true" :font-size="12" :width="120" :height="26" 
            :color="{checked: '#2d66ad', unchecked: '#777', disabled: '#fff'}"
            :labels="{checked: '자동접속 ON', unchecked: '자동접속 OFF'}"/>
        </div>
      </div>

      <div class="unit" :class="{'bm-open': errorMessage}">
        <div v-if="errorMessage" class="error" :class="{'bm': errorMessage}">{{errorMessage}}</div>
      </div>

      <div class="unit">
        <input type="button" value="접속" @click="doLogin()" />
      </div>
      
      <div class="lost">
        <div><router-link to="/recover">&gt; 암호가 기억나지 않습니다.</router-link></div>
        <div><router-link to="/register">&gt; 신규 계정을 발급합니다.</router-link></div>
      </div>

    </div>
    
  </form>
</template>


<script lang="ts">
import Vue from 'vue';
import { ToggleButton } from 'vue-js-toggle-button';
import SessionService from '@/services/SessionService';

export default Vue.extend({
  components: {
    ToggleButton,
  },
  data() {
    return {
      errorMessage: '',
      account: '',
      password: '',
      tokenLogin: false,
    };
  },
  methods: {
    doLogin() {
      this.errorMessage = '';
      SessionService.doLogin(this.account, this.password, this.tokenLogin ? 1 : 0, (success, message) => {
        if (!success) {
          if (message) {
            this.errorMessage = message;
          }
        }
      });
    },
  },
});
</script>

<style>
#login { padding:100px 20px; }
#login .login-box { max-width:400px; margin:0 auto; background: #fff; }
#login .login-box .login-title { text-align: center; font-size:30px; font-weight: bold; color:#3468b3; padding-bottom: 24px; }
#login .login-box .unit { margin-top: 24px; }
#login .login-box .unit input { box-sizing: border-box; border-radius: 4px; width:100%; height:40px; }
#login .login-box .unit .label { color:#6475a0; font-size:12px; margin-left:4px; }
#login .login-box .unit .input-box { margin-top: 8px; }
#login .login-box .unit .input-box input { border: 1px solid #d0d0d0; padding:0 10px; }
#login .login-box .unit .token-login { text-align: right; vertical-align: middle }
#login .login-box .unit input[type=button] { background: #5878a7; border:0; font-size:16px; font-weight: bold; color:#fff }
#login .login-box .unit .error { color:#e03535; font-size:15px; padding: 8px 4px 0 }
#login .login-box .lost { padding: 12px 1px; }
#login .login-box .lost a { font-size:14px; line-height: 2; color:#555; text-decoration: none }
#login .login-box .lost a:hover { text-decoration: underline }

@media (max-width: 600px) {
  #login { padding:60px 20px; }
}
</style>
