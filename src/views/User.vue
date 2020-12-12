<template>
  <form id="user">

  <div v-if="mode === 'basic'">
    <div class="user-box">
      <div class="user-title">회원정보</div>  

      <div class="unit">
        <b class="label">계정</b>
        <div>
          <div class="info-box">{{account}}</div>
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

      <div class="unit">
        <b class="label">가입일</b>
        <div>
          <div class="info-box">{{joinDt}}</div>
        </div>
      </div>

      <div class="unit" v-if="roles.length > 0">
        <b class="label">권한</b>
        <div class="role-box">
          <span v-for="role in roles" :key="role">
            {{role}}
          </span>
        </div>
      </div>

      <div class="unit" :class="{'bm-open': errorMessage}">
        <div v-if="errorMessage" class="error" :class="{'bm': errorMessage}">{{errorMessage}}</div>
      </div>

      <div class="unit">
        <input type="button" value="정보수정" @click="updateInfo()" />
      </div>

    </div>
  </div>

  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';
import { ko } from 'vuejs-datepicker/dist/locale';
import UserService from '@/services/UserService';
import Nabi from '@/utils/nabi';

export default Vue.extend({
  components: {
    Datepicker,
  },
  data() {
    return {
      // baisc
      ko,
      mode: 'basic', // request, requested, verify

      // request
      account: '',
      password: '',
      passwordConfirm: '',
      birth: null as Date|null,
      birthInit: '',
      name: '',
      joinDt: '',
      roles: [] as string[],
      errorMessage: '',
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      UserService.info((e) => {
        this.account = e.account;
        this.birth = e.birth !== '0000-00-00' ? Nabi.dateFormat().parseIsoDate(e.birth).toDate() : null;
        this.name = e.name;
        this.joinDt = Nabi.isoDateFormat(e.joinDt, 'yyyy년 MM월 dd일 HH시 mm분 ss초');
        this.roles = e.roles;
      });
    },
    updateInfo() {
      this.errorMessage = '';
      UserService.updateInfo(
          this.password, this.passwordConfirm,
          this.birth != null
            ? Nabi.dateFormat(this.birth as Date).format('yyyy-MM-dd') : '', this.name, (pass, msg) => {
              if (pass) {
                this.info();
                alert('수정되었습니다.');
              } else {
                this.errorMessage = msg;
              }
            });
    },
  },
});
</script>

<style>
#user { padding:100px 20px; }
#user .user-box { max-width:430px; margin:0 auto; background: #fff; padding-bottom:200px; }
#user .user-box .user-title { text-align: center; font-size:30px; font-weight: bold; color:#3468b3; padding-bottom: 24px; }
#user .user-box .unit { margin-top: 24px; }
#user .user-box .unit input { box-sizing: border-box; border-radius: 4px; width:100%; height:40px; }
#user .user-box .unit .label { color:#6475a0; font-size:12px; margin-left:4px; }
#user .user-box .unit .input-box { margin-top: 8px; }
#user .user-box .unit .input-box input { border: 1px solid #d0d0d0; padding:0 10px; }
#user .user-box .unit .token-login { text-align: right; vertical-align: middle }
#user .user-box .unit input[type=button] { background: #5878a7; border:0; font-size:16px; font-weight: bold; color:#fff }
#user .user-box .unit .error { color:#e03535; font-size:15px; padding: 8px 4px 0 }
#user .user-box .unit .pass { color:#e03535; line-height: 2.1; padding:0 10px; word-break: break-all; white-space: pre-wrap; }
#user .user-box .unit .email-icon { text-align: center; padding-top: 20px; }
#user .user-box .unit .email-icon img { width:200px; }
#user .user-box .unit .email-title { text-align: center; line-height: 2; font-weight: bold; font-size:20px; }
#user .user-box .unit .email-title b { color:#3468b3 }
#user .user-box .unit .email-desc { padding-top:20px; line-height: 2 }
#user .user-box .unit .email-desc li span { color:#ea2424 }
#user .user-box .unit .verify-icon-wrap { padding:32px 0 0; }
#user .user-box .unit .agree { border:1px solid #eee; font-size:12px; padding:6px 6px; }
#user .user-box .unit .agree ul { padding:0 0 0 20px; margin:0 }
#user .user-box .unit .agree ul li { line-height: 2 }
#user .user-box .unit .info-box { 
  margin:10px 0; padding: 8px 10px; font-size:15px; font-weight: bold; color:#66688a; 
  background:#fafafa; border:1px solid #c9ccd8; border-radius: 4px;
}
#user .user-box .unit .role-box span {
  display: inline-block; color:#ddd; background:#464465; border-radius: 4px;
  margin:10px 6px 0 0; padding: 6px 8px; font-size:12px; font-weight: bold
}


@media (max-width: 600px) {
  #user { padding:60px 20px; }
}
</style>
