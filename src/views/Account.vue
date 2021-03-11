<template>
  <div>
    <div class="basic-layout">
      <div id="account" class="basic-layout-mono">
        <div class="base-mat">

          계정

<pre style="font-size:16px; line-height: 2">
제작중 (아래 기능 추가예정)
------
회원정보 / 수정
------
이메일 바꾸기 (계정)



</pre>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
  components: {
  },
  methods: {
  }
})
export default class Account extends Vue {
}
</script>

<style>
#account .base-mat { padding: 8px; }
</style>