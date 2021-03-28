<template>
  <div>
    <div class="basic-layout">
      <div id="account" class="basic-layout-mono">
        <div class="base-mat">

          <div class="doc-title">기본정보</div>
          <table>
            <tr><th>계정</th><td>{{account.email}}</td></tr>
            <tr v-if="account.roles">
              <th>권한</th>
              <td>
                <span class="x-tag" v-for="role in account.roles" :key="role">{{role}}</span>
              </td>
            </tr>
          </table>

          <div class="doc-title">닉네임</div>
          <table>
            <tr><th>이름</th><td><input type="text" v-model="nickname" class="std-inp-txt" placeholder="닉네임" /></td></tr>
            <tr><th>암호</th><td><input type="password" class="std-inp-txt" v-model="password" maxlength="64" autocomplete="new-password" placeholder="암호"/></td></tr>
            <tr><td colspan="2"><input type="button" value="이름변경" class="std-inp-btn" @click="updateName()" /></td></tr>
          </table>

          <div class="doc-title">암호</div>
          <table>
            <tr><th>기존 암호</th><td><input type="password" class="std-inp-txt" v-model="oldPassword" maxlength="64" autocomplete="new-password" placeholder="기존 암호"/></td></tr>
            <tr><th>새 암호</th><td><input type="password" class="std-inp-txt" v-model="newPassword" maxlength="64" autocomplete="new-password"  placeholder="새 암호"/></td></tr>
            <tr><th>새 암호 확인</th><td><input type="password" class="std-inp-txt" v-model="newPasswordConfirm" maxlength="64" autocomplete="new-password"  placeholder="새 암호 확인"/></td></tr>
            <tr><td colspan="2"><input type="button" value="암호교체" class="std-inp-btn" @click="updatePassword()" /></td></tr>
          </table>


        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import AccountService from "@/service/AccountService";

@Options({
  components: {
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      AccountService.getUser(e => {
        this.account = e;
        this.nickname = e.name;
      });
    },
    updatePassword() {
      AccountService.updateUserPassword(this.oldPassword, this.newPassword, this.newPasswordConfirm, e => {
        if (e.st == 'OK') {
          alert('암호가 변경되었습니다.');
          this.oldPassword = '';
          this.newPassword = '';
          this.newPasswordConfirm = '';
        } else {
          alert(e.msg);
        }
      });
    },
    updateName() {
      if (!window.confirm('정말로 닉네임을 변경하시겠습니까?')) {
        return;
      }
      AccountService.updateUserName(this.password, this.nickname, e => {
        if (e.st == 'OK') {
          alert('이름이 변경되었습니다.');
          this.password = '';
        } else {
          alert(e.msg);
        }
      });
    }
  }
})
export default class Account extends Vue {
  data() {
    return {
      account: {
        email: '',
        name: '',
        regDt: '',
        roles: []
      },
      password: '',
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      nickname: ''
    };
  }
}
</script>

<style>
#account .base-mat { padding: 8px; }
#account table { width:100%; margin:16px 8px; }
#account table th { width: 30% }
#account table th,
#account table td { border-width: 1px; padding:8px; text-align: center }
#account table td input { width:100%; border:0; height: 32px; }
#account table td input { width:100%; border:0; height: 32px; }
</style>