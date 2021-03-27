<template>
  <div id="admin-panel">
    <active-panel :admin="true"/>
  </div>
</template>

<style>
#admin-panel {  }
</style>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import ActivePanel from "@/components/ActivePanel.vue"

@Options({
  components: {
    ActivePanel
  }
})

export default class AdminPanel extends Vue {}
</script>
