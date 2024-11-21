<script setup lang="ts">
import { onMounted, ref } from 'vue';

import BasePageView from '#/component/pages/base-page.vue';

defineOptions({
  name: 'RCOnlineIndex',
});

const loadingRef = ref(true);
onMounted(() => {
  setTimeout(() => {
    loadingRef.value = false;
  }, 1500);
});
</script>

<template>
  <BasePageView :view-loading="loadingRef" class="h-full w-full">
    index
  </BasePageView>
</template>

<style scoped></style>
