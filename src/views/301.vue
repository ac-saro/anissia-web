<template>
  <div id="error-301">
    <div>
      <img src="@/assets/page/301-moved.svg" />
    </div>
    <div class="title-sub">주소이전</div>
    <div class="desc">
      애니편성표의 주소가 변경되었습니다.
    </div>
    <div><a href="/schedule" target="_blank">이동하기</a></div>
  </div>
</template>

<style>
#error-301 { text-align: center; padding-top:100px; }
#error-301 img { width:200px; max-width:80% }
#error-301 .title-sub { font-size:32px; margin: 40px 0 32px }
#error-301 .desc { margin:32px 0 }

html.dark #error-301 img { opacity: .8 }
</style>