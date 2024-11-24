<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import BasePageView from '#/component/pages/base-page.vue';
import TopBottomView from '#/component/pages/top-bottom-view.vue';

import { setUpOnlineCtx } from './_inner/hooks/use-online-ctx';
import ThesaurusActionsComp from './_inner/sub-views/thesaurus-actions.vue';
import UploadThesaurusDrawer from './_inner/sub-views/upload-thesaurus-drawer/upload-thesaurus-drawer.vue';

defineOptions({
  name: 'RCOnlineIndex',
});

const { emitterComputed } = setUpOnlineCtx();

const testList = [];
for (let i = 0; i < 2000; i++) {
  testList.push(`${i}`);
}
const loadingRef = ref(true);
const thesaurusTypeRef = ref('write_list');

// #region 链接上传词库drawer
// =================================================
const [UploadDrawer, uploadDrawerApi] = useVbenDrawer({
  // 连接抽离的组件
  connectedComponent: UploadThesaurusDrawer,
});

// #endregion  -------------------------------------

// #region emit event
// =================================================
const uploadEventFn = () => {
  console.log('uploadEventFn');
  uploadDrawerApi.open();
};
// #endregion  -------------------------------------

onMounted(() => {
  emitterComputed.value.on('emitUpload', uploadEventFn);
  setTimeout(() => {
    loadingRef.value = false;
  }, 500);
});
onUnmounted(() => {
  console.log('RCOnlineIndex unmounted');
  emitterComputed.value.off('emitUpload', uploadEventFn);
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

    <div class="h-0">
      <UploadDrawer />
    </div>
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
