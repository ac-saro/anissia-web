<template>
  <!-- do not use :key in router-view / :key calls created() to create a component each time. -->
  <router-view />
</template>

<style>
img, a { border: 0; }
table, tr, td, th { border-collapse: collapse; border-spacing: 0; padding:0; }
table, tr, td, th, .basic-border-color { border-width:0; border-style: solid; }
input, textarea { outline: none; }
html { height: 100%; }
body { height: 100%; margin: 0; padding: 0; }
::-webkit-scrollbar { width:6px; height:6px }

</style>

<script lang="ts">
import ColorScheme from "@/utils/ColorScheme";
import {Options, Vue} from "vue-class-component";

@Options({
  created() {
    ColorScheme.init();
  }
})

export default class App extends Vue {
}
</script>