<template>
    <router-view :key="$route.fullPath"/>
</template>


<style>
img, a { border: 0; }
table, tr, td { border-collapse: collapse; border-spacing: 0; padding:0 }
input, textarea { outline: none; }
html { height: 100%; }
body { height: 100%; margin: 0; padding: 0; }
::-webkit-scrollbar{width:4px;height:4px }

a { color:#31af98 }
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