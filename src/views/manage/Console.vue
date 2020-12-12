<template>
  <div class="doc-area">
    <div class="doc-pad">
      <Asl mode="manage"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Asl from '@/components/Asl.vue';

export default Vue.extend({
  components: {
    Asl,
  },
});
</script>
