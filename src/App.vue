<template>
    <router-view :key="$route.fullPath"/>
</template>


<style>
img, a { border: 0; }
table, tr, td, th { border-collapse: collapse; border-spacing: 0; padding:0; border-width:0; border-style: solid; }
input, textarea { outline: none; }
html { height: 100%; }
body { height: 100%; margin: 0; padding: 0; }
::-webkit-scrollbar { width:6px; height:6px }

a { color:#48659a }
a:hover { text-decoration: underline }
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