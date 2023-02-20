<template>
  <router-view :key="$route.fullPath" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
console.log(process.env["NODE_TLS_REJECT_UNAUTHORIZED"]);
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

export default defineComponent({
  name: "App",
});
</script>
