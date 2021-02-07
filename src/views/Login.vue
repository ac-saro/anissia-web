<template>
  <div id="login" class="mono-area">
    <div>

      <div class="anissia">
        애니시아 로그인
      </div>

      <div class="base-mat login-box">
        <div>
          <div class="input-unit"><input type="text" v-model="email" placeholder="이메일"/></div>
          <div class="input-unit"><input type="password" v-model="password" placeholder="암호" @keyup.enter="login()" /></div>
          <div class="input-unit auto-auth">
            <label>자동로그인<input v-model="auto" type="checkbox"/><span class="sw-view"></span></label>
          </div>
          <div class="input-unit"><input type="button" value="로그인" @click="login()" /></div>
          <div class="account">
            <div><router-link to="/lost">&gt; 암호를 분실하였습니다.</router-link></div>
            <div><router-link to="/register">&gt; 계정을 생성합니다.</router-link></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
#login {  }
#login .login-box { padding: 8px 0 10px; }
#login .account { padding:12px 24px 0; }
#login .account > div { padding:6px 0 4px; }
#login .account > div a { font-size:14px; }
#login .anissia { padding:48px 0; text-align:center; font-size:30px; cursor: default; color:#555 }

#login .auto-auth { text-align: right; font-size:15px; color:#777 }
#login .auto-auth label { cursor: pointer }
#login .auto-auth input { display:none  }
#login .auto-auth .sw-view { min-width: 34px; margin: 0 8px 0 0; display: inline-block;  }
#login .auto-auth input:checked ~ .sw-view:after { content: 'ON'; color:#cf3232; }
#login .auto-auth input:not(:checked) ~ .sw-view:after { content: 'OFF'; color:#3f52ad }

html.light #login .account a { color:#3f52ad; }
html.dark #login .account a { color:#a0a0a0; }

@media (max-width: 640px) {
  #login .anissia { padding:32px 0 46px }
}

</style>

<script lang="ts">
import SessionService from "@/service/SessionService";
import {Options, Vue} from "vue-class-component";

@Options({
  methods: {
    login() {
      const t = this as any;
      SessionService.login(t.email, t.password, t.auto ? 1 : 0, (success, message) => {
        !success && message && alert(message);
      });
    }
  }
})

export default class Login extends Vue {
  data() {
    return {
      email: '',
      password: '',
      auto: false,
    };
  }
}
</script>
