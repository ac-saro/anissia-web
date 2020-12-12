<template>

  <div class="manage-body">
    <div class="manage-menu">
      <div class="doc-area">
        <table>
          <tr>
            <td>
              <router-link to="/manage">
                <div><img src="@/assets/manage/nav-console.svg"/></div>
                <div>관리 콘솔</div>
              </router-link>
            </td>
            <td>
              <router-link to="/manage/anime">
                <div><img src="@/assets/manage/nav-anime.svg" /></div>
                <div>애니<span class="full">메이션</span> 정보</div>
              </router-link>
            </td>
            <td>
              <router-link to="/manage/timetable">
                <div><img src="@/assets/manage/nav-timetable.svg" /></div>
                <div><span class="full">애니메이션</span> 편성표</div>
              </router-link>
            </td>
            <td>
              <router-link to="/manage/caption">
                <div><img src="@/assets/manage/nav-caption.svg" /></div>
                <div><span class="full">애니메이션</span> 자막</div>
              </router-link>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="layout-border"></div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  components: {
  },
});
</script>

<style>
.manage-body .manage-menu { background: #f9f9f9; font-family: "Noto Sans KR", "Malgun Gothic", "Dotum"; }
.manage-body .manage-menu a { color:#555; text-decoration: none; font-size:16px; transition: grayscale .3s }
.manage-body .manage-menu a div img { opacity: 0.3; filter: grayscale(1); transition: filter .3s, opacity .3s }
.manage-body .manage-menu a.router-link-exact-active,
.manage-body .manage-menu a:hover { color:#476a8a; }
.manage-body .manage-menu a:hover img,
.manage-body .manage-menu a.router-link-exact-active img { opacity: 0.8; filter: grayscale(.3); }
.manage-body .manage-menu table { width:100%; }
.manage-body .manage-menu td { width:25%; text-align: center; padding:22px 0 16px; }
.manage-body .manage-menu td img { max-width: 52px; max-height: 52px; margin:0 0 10px; }

@media (max-width: 600px) { 
  .manage-body .manage-menu td { width:25%; text-align: center; padding:22px 0 16px; }
  .manage-body .manage-menu td .full { display:none }
  .manage-body .manage-menu td img { max-width: 32px; max-height: 32px; margin:0 0 10px; }
}
</style>
