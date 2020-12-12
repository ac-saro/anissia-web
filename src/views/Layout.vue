<template>
  <div>
    <!-- temp [start] -->
    <div style="background:#fffcec; border-bottom:1px solid #e4dda7; font-size:13px" v-if="isLogin() && this.getUser().account.indexOf(' ') != -1">
      <div class="doc-area" style="padding:12px 8px">
        <div style="float:left">
          이메일계정(<b style="color:#387ebb">{{this.getUser().account.split(' ')[1]}}</b>)으로 변경해주세요. (2020-10-01 일괄변경)
        </div>
        <div style="text-align:right">
          <div style="display:inline-block;color:#387ebb;font-size:13px;cursor:pointer" @click="doRenewAccount()">지금변경</div>
        </div>
      </div>
    </div>
    <!-- temp [end] -->

    <nav>
      <div class="doc-area">
        <div class="ci">
          <router-link to="/"><img src="@/assets/nav/ci.png" /></router-link>
        </div>
        <div class="mob-nav-toggle">
          <img src="@/assets/nav/mob-nav-toggle.svg" @click="mobNav = !mobNav" />
        </div>
        <div class="control" :class="{ 'mob-nav-on': mobNav }" @click="mobNav = false">
          <div class="sign">
            <span v-if="!isLogin()" class="icon" @click="doLogin()"><i class="fas fa-shield-alt" style="color:#92c3af"></i> 로그인</span>
            <router-link to="/user" class="icon" v-if="isLogin()"><i class="far fa-user" style="color:#ba7eca"></i> 회원정보</router-link>
            <span v-if="isLogin()" class="icon" @click="doLogout()"><i class="fas fa-power-off" style="color:#87b0ce"></i> 로그아웃</span>
          </div>
          <div class="menu">
            <router-link class="icon" to="/introduce"><i class="far fa-map" style="color:#fbc5ac"></i> 소개</router-link>
            <router-link class="icon" to="/news"><i class="fas fa-rss" style="color:#fdc8ec"></i> 새소식</router-link>
            <router-link class="icon" to="/timetable"><i class="far fa-calendar" style="color:#9ee4da"></i> 애니편성표</router-link>
            <router-link class="icon" to="/anime"><i class="far fa-hdd" style="color:#eaa6a6"></i> 애니정보</router-link>
          </div>
        </div>
      </div>
      <div class="layout-border"></div>
    </nav>
    <div :class="{ 'mob-hide': mobNav }">
      <router-view/>
    </div>

    <vue-snotify></vue-snotify>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import UserSession from '@/models/UserSession';
import SessionService from '@/services/SessionService';
import Noti from '@/utils/Noti';
import Snotify from 'vue-snotify';

Snotify.install(Vue, {});

export default Vue.extend({
  // store / components / computed
  store,
  components: {
  },
  computed: { user: { get(): UserSession { return this.$store.state.user; } } },
  data() {
    return {
      mobNav: false,
      keyQueue: [] as any[],
    };
  },
  created() {
    window.addEventListener('keydown', this.keyEvent, true);
    SessionService.syncLoginSession((isLogin) => {
      if (!isLogin) {
        SessionService.doTokenLogin();
      }
    });
    setInterval(() => {
      SessionService.syncLoginSession();
    }, 5 * 60000);
    Noti.bind((this as any).$snotify);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyEvent, true);
  },
  beforeRouteUpdate(to, from, next) {
    this.mobNav = false;
    if (SessionService.amendPathInSession(to.path)) {
      next();
    }
  },
  watch: {
    user(n: UserSession, o: UserSession) {
      SessionService.amendPathInSession();
    },
  },
  methods: {
    isLogin() {
      return this.getUser().isLogin();
    },
    getUser(): UserSession {
      return this.user;
    },
    doLogin() {
      SessionService.goToTheLoginPage();
    },
    doLogout() {
      SessionService.doLogout(() => SessionService.amendPathInSession());
      this.mobNav = false;
    },
    doRenewAccount() { // temp -- remove 2020-02-29
      const t = this.getUser().account.split(' ');
      if (confirm(`계정을 변경하겠습니까?\n변경전: ${t[0]}\n변경후: ${t[1]}`)) {
        fetch('/api/user/renew', {method: 'POST', credentials: 'same-origin'}).then((e) => e.text()).then((e) => {
          if (e === 'OK') {
            SessionService.syncLoginSession();
            alert('변경되었습니다.');
          } else {
            throw new Error('ERROR');
          }
        }).catch(() => {
          alert('변경중 오류가 발생하였습니다.');
        });
      }
    },
    keyEvent(event: KeyboardEvent) {
      if (location.pathname.startsWith('/manage')) {
        return;
      }
      // cache latest 3 key codes
      this.keyQueue.push({key: event.keyCode, ts: new Date().getTime()});
      if (this.keyQueue.length > 3) {
        this.keyQueue.splice(0, this.keyQueue.length - 3);
      }
      // 1 sec : 3 keydown 'a' and have admin role
      if (
        this.keyQueue.filter((e) => e.key === 65).filter((e) => e.ts >= (new Date().getTime() - 1000)).length >= 3
        && this.user.manager) {
        this.$router.push('/manage');
        return;
      }
    },
  },
});
</script>

<style>
nav .ci { float: left; }
nav, nav a { text-decoration: none; color:#777 }
.doc-area { max-width:1200px; margin:0 auto; }
.doc-area > .doc-pad { padding:8px; }
.layout-border { height:1px; background: linear-gradient(to right, #e4e4e4 0%, #9fafbf 50%, #e4e4e4 100%) }

@media (min-width: 601px) {
  nav { padding:8px 0 0; font-family: "Malgun Gothic", "Dotum"; }
  nav .ci { height:64px; }
  nav .layout-border { margin-top: 10px; }
  nav .mob-nav-toggle { display:none }
  nav .control { text-align: right; margin-right: 12px; }
  nav .control > .sign { padding-top:4px; height:24px; }
  nav .control > .menu { margin-top:10px; height:24px; }
  nav .control .icon { height:24px; vertical-align: middle; color:#777; text-decoration: none; font-size:14px; cursor: pointer; }
  nav .control .icon i { margin:0 2px 0 16px; font-size: 16px; }
}

@media (max-width: 600px) { 
  nav .ci, nav .ci img { height: 48px; }
  nav > div.nav-border { margin: 0; }
  nav .mob-nav-toggle { height:48px; text-align: right }
  nav .mob-nav-toggle img { height:32px; margin:8px 10px; }
  nav .control:not(.mob-nav-on) { display:none }
  nav .control { 
    position: absolute; top:49px; left:0; right:0; bottom:0; overflow:scroll; 
    background:#fdfdf6; z-index: 100; display:flex; flex-direction: column; 
  }
  nav .control > .menu { order: 10; }
  nav .control > .sign { order: 20; }
  nav .control .icon { margin:0; display: block; margin-top:30px; text-align: center;  }
  nav .control .icon i { margin-right: 7px; }
  .mob-hide { display:none }
}
</style>
