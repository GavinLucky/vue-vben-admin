<script setup lang="ts">
import { onMounted, ref } from 'vue';

import BasePageView from '#/component/pages/base-page.vue';
import TopBottomView from '#/component/pages/top-bottom-view.vue';
import ThesaurusActionsComp from '#/views/risk-control/online/_inner/sub-views/thesaurus-actions.vue';

defineOptions({
  name: 'RCOnlineIndex',
});
const testList = [];
for (let i = 0; i < 2000; i++) {
  testList.push(`${i}`);
}
const loadingRef = ref(true);
const thesaurusTypeRef = ref('write_list');
onMounted(() => {
  setTimeout(() => {
    loadingRef.value = false;
  }, 1500);
});
</script>

<template>
  <BasePageView
    :auto-content-height="true"
    :view-loading="loadingRef"
    class="h-full w-full"
    content-class="p-0 bg-background-deep"
  >
    <TopBottomView class="">
      <template #viewTopSlot>
        <a-segmented
          v-model:value="thesaurusTypeRef"
          :options="[
            {
              value: 'write_list',
              label: '白名单',
            },
            {
              value: 'black_list',
              label: '黑名单',
            },
          ]"
          block
        />
      </template>

      <template #viewBottomSlot>
        <ThesaurusActionsComp />
      </template>
    </TopBottomView>

    <div class="h-0">123</div>
  </BasePageView>
</template>

<style scoped lang="scss">
:deep(.ant-segmented) {
  .ant-segmented-item-selected {
    color: hsl(var(--primary));
    background-color: hsl(var(--primary) / 15%);
  }
}
</style>
