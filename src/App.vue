<template>
    <router-view :key="$route.fullPath"/>
</template>


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