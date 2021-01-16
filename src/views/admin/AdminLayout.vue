<template>
  <div>
    <div v-if="this.user.isAdmin">
      <div id="admin-layout" class="basic-layout">
        <div class="basic-layout-mono">
          <div class="base-mat">

            <div class="admin-menu">
              <table>
                <tr>
                  <td :class="({'menu-on': menu == 'panel'})">
                    <router-link to="/admin">
                      <div><img src="@/assets/layout/nav/admin-panel.svg"/></div>
                      <span>관리패널</span>
                    </router-link>
                  </td>
                  <td :class="({'menu-on': menu == 'anime'})">
                    <router-link to="/admin/anime">
                      <div><img src="@/assets/layout/nav/admin-anime.svg"/></div>
                      <span>애니메이션</span>
                    </router-link>
                  </td>
                  <td :class="({'menu-on': menu == 'schedule'})">
                    <router-link to="/admin/schedule">
                      <div><img src="@/assets/layout/nav/admin-schedule.svg"/></div>
                      <span>편성표</span>
                    </router-link>
                  </td>
                  <td :class="({'menu-on': menu == 'caption'})">
                    <router-link to="/admin/caption">
                      <div><img src="@/assets/layout/nav/admin-caption.svg"/></div>
                      <span>자막</span>
                    </router-link>
                  </td>
                </tr>
              </table>
            </div>

            <div>
              <router-view />
            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p404/>
    </div>
  </div>
</template>


<script lang="ts">
import {Options, Vue} from "vue-class-component";
import P404 from "@/views/404.vue";

@Options({
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    $route(to, from) {
      this.bindMenu();
    }
  },
  components: {
    P404
  },
  created() {
    this.bindMenu();
  },
  methods: {
    bindMenu() {
      this.menu = location.pathname.replace(/\/admin\/?/, '') || 'panel';
    }
  }
})

export default class AdminLayout extends Vue {
  data() {
    return {
      menu: ''
    };
  }
}
</script>

<style>
#admin-layout .admin-menu { -webkit-tap-highlight-color: rgba(0,0,0,0); }
#admin-layout .admin-menu table { width:100%; }
#admin-layout .admin-menu table td { width:25%; text-align: center; border-bottom-width: 1px }
#admin-layout .admin-menu table td img { width:20%; max-width:60px; filter:grayscale(1); opacity: .5; transition: all .2s }
#admin-layout .admin-menu table td a { display:block; padding:24px 0; text-decoration: none !important; }
#admin-layout .admin-menu table td a span { margin-top: 8px; font-size:15px; display: inline-block }
#admin-layout .admin-menu table td.menu-on img,
#admin-layout .admin-menu table td:hover img { filter:grayscale(.4); opacity: .8 }


#admin-layout .admin-menu table td:not(.menu-on) {  }
#admin-layout .admin-menu table td:not(.menu-on) img { }


@media (max-width: 1023px) {
  #admin-layout .admin-menu table td a span { display: none }
}

@media (max-width: 800px) {
  #admin-layout .admin-menu table td img { width:36%; }
}

html.light #admin-layout .admin-menu table td a { color:#333; }

html.dark #admin-layout .admin-menu table td a { color:#999; }



</style>