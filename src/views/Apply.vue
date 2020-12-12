<template>
  <form id="apply">
    <div class="apply-box">

      <!-- is not logined -->
      <div v-if="isNotLogin()">
        <div class="apply-title">자막제작자 신청</div>
        <div class="unit">
          <div class="res-icon"><img src="@/assets/pages/apply-res-icon.svg"/></div>
        </div>
        <div class="unit">
          <div class="res-title">
            먼저 로그인을 해주세요.
          </div>
        </div>
        <div class="unit">
          <input type="button" value="로그인 페이지로 이동" @click="$router.push('/login?rp=%2Fapply')" />
        </div>
      </div>

      <!-- already exist translator role -->
      <div v-else-if="alreadyManager()">
        <div class="apply-title">제막제작자 신청</div>
        <div class="unit">
          <div class="res-icon"><img src="@/assets/pages/apply-res-icon.svg"/></div>
        </div>
        <div class="unit">
          <div class="res-title">
            이미 자막제작자 권한을 소유중입니다.
          </div>
        </div>
        <div class="unit">
          <input type="button" value="관리페이지로 이동" @click="$router.push('/manage')" />
        </div>
      </div>

      <!-- already exist translator role -->
      <div v-else-if="mode === 'applied'">
        <div class="apply-title">제막제작자 신청</div>
        <div class="unit">
          <div class="res-icon"><img src="@/assets/pages/apply-res-icon.svg"/></div>
        </div>
        <div class="unit">
          <div class="res-title">
            권한이 신청되었습니다.<br/>
            진행사항은 메인화면에서 볼 수 있습니다.
          </div>
        </div>
        <div class="unit">
          <input type="button" value="메인화면으로 이동" @click="$router.push('/')" />
        </div>
      </div>

      <!-- apply translator role -->
      <div v-else>
        <div class="apply-title">제막제작자 신청</div>
        
        <div class="unit">
          <div class="agree">
            <ul>
              <li>자막제작자로 등록하기 위해서는 4편 4주 이상의 활동이 있어야 합니다.</li>
              <li>자막 도용 발견시 권한이 회수되며, 계정이 삭제될 수 있습니다.</li>
              <li>저작권파일 업로드시 권한이 회수되며, 계정이 삭제될 수 있습니다.</li>
            </ul>  
          </div>
        </div>

        <div class="unit">
          <label class="chk-box">
            주의 사항을 읽었으며, 동의합니다.
            <input v-model="agree" type="checkbox" /><span class="checkmark"></span>
          </label>
        </div>

        <div class="unit">
          <b class="label">자막활동이 있는 홈페이지 혹은 블로그</b>
          <div class="input-box">
            <input v-model="site" type="text" placeholder="ex) https://anissia.net" maxlength="64" />
          </div>
        </div>

        <div class="unit">
          <b class="label">자막 작업물의 작품명</b>
          <div class="input-box">
            <input v-model="titles" type="text" placeholder="여러개일 경우 2~3개의 대표작을 쉼표로 구분하여 입력" maxlength="64" />
          </div>
        </div>

        <div class="unit">
          <b class="label">비고</b>
          <div class="input-box">
            <input v-model="note" type="text" placeholder="기타" maxlength="64" />
          </div>
        </div>

        <div class="unit">
          <input type="button" value="신청하기" @click="doRequest()" />
        </div>

      </div>
    </div>
  </form>
</template>


<script lang="ts">
import Vue from 'vue';
import AccountService from '@/services/AccountService';
import AslService from '@/services/AslService';
import Nabi from '@/utils/nabi';
import Noti from '@/utils/Noti';
import UserSession from '@/models/UserSession';

export default Vue.extend({
  data() {
    return {
      mode: 'apply',
      agree: false,
      site: '',
      titles: '',
      note: '',
    };
  },
  created() {
    this.doRequestExist();
  },
  methods: {
    isNotLogin() {
      return !this.user().isLogin();
    },
    alreadyManager() {
      return this.user().manager;
    },
    user(): UserSession {
      return this.$store.state.user as UserSession;
    },
    doRequestExist() {
      AslService.applyExist((e) => this.mode = (e ? 'applied' : 'apply'));
    },
    doRequest() {
      Noti.async((s, f) => {
        AslService.apply(this.agree, this.site, this.titles, this.note, (pass, msg) => {
          if (pass) {
            this.mode = 'applied';
            s(Noti.asyncBox('권한이 신청되었습니다.'));
          } else {
            f(Noti.asyncBox((msg || '')));
          }
        });
      });
    },
  },
});
</script>

<style>
#apply { padding:100px 20px; }
#apply .apply-box { max-width:430px; margin:0 auto; background: #fff; padding-bottom:200px; }
#apply .apply-box .apply-title { text-align: center; font-size:30px; font-weight: bold; color:#3468b3; padding-bottom: 24px; }
#apply .apply-box .unit { margin-top: 24px; }
#apply .apply-box .unit input { box-sizing: border-box; border-radius: 4px; width:100%; height:40px; }
#apply .apply-box .unit .label { color:#6475a0; font-size:12px; margin-left:4px; }
#apply .apply-box .unit .input-box { margin-top: 8px; }
#apply .apply-box .unit .input-box input { border: 1px solid #d0d0d0; padding:0 10px; }
#apply .apply-box .unit .token-login { text-align: right; vertical-align: middle }
#apply .apply-box .unit input[type=button] { background: #5878a7; border:0; font-size:16px; font-weight: bold; color:#fff }
#apply .apply-box .unit .error { color:#e03535; font-size:15px; padding: 8px 4px 0 }
#apply .apply-box .unit .pass { color:#e03535; line-height: 2.1; padding:0 10px; word-break: break-all; white-space: pre-wrap; }
#apply .apply-box .unit .res-icon { text-align: center; padding-top: 20px; }
#apply .apply-box .unit .res-icon img { width:200px; }
#apply .apply-box .unit .res-title { text-align: center; line-height: 2; font-weight: bold; font-size:20px; margin-top:64px; }
#apply .apply-box .unit .res-title b { color:#3468b3 }
#apply .apply-box .unit .res-desc { padding-top:20px; line-height: 2 }
#apply .apply-box .unit .res-desc li span { color:#ea2424 }
#apply .apply-box .unit .agree { border:1px solid #eee; font-size:12px; padding:6px 6px; }
#apply .apply-box .unit .agree ul { padding:0 0 0 20px; margin:0 }
#apply .apply-box .unit .agree ul li { line-height: 2 }
#apply .apply-box .unit .chk-box { font-size:13px; line-height: 24px; }

@media (max-width: 600px) {
  #apply { padding:60px 20px; }
}
</style>
