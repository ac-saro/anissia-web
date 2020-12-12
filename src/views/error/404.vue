<template>
  <div id="error-404">
    <div class="text-center">


      <div class="error-img">
        <img src="@/assets/pages/error-404.svg"/>
      </div>

      <div class="error-text">
        페이지를 찾을 수 없습니다.
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend();
</script>


<style>
#error-404 .text-center { text-align: center }
#error-404 .error-img { margin:100px 0 40px; }
#error-404 .error-img img { height:400px; }
#error-404 .error-text { font-size:25px; margin:0 0 140px; color:#aaa }

#error-404 .error-img > div { width:400px; height:400px; line-height: 400px; background: #ccc }

@media (min-height: 801px) {
  #error-404 { position: absolute; left:50%; top:50%; transform: translate(-50%, -50%) }
}

@media (max-height: 800px) { 
  #error-404 .error-img img { height:300px; }
  #error-404 .error-img { margin:100px 0 20px; }
  #error-404 .error-text { margin:0 0 0; font-size:20px; }
}

@media (max-height: 520px) {
  #error-404 .error-img img { height:200px; }
  #error-404 .error-img { margin:40px 0 20px; }
  #error-404 .error-text { margin:0 0 0px; font-size:15px; } 
}
</style>