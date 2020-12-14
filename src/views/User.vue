<template>
  <div>
    <h1>유저</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
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
export default class User extends Vue {
}
</script>
