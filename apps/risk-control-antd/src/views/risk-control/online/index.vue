<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import BasePageView from '#/component/pages/base-page.vue';
import TopBottomView from '#/component/pages/top-bottom-view.vue';
import { useOnlineRequest } from '#/views/risk-control/online/_inner/hooks/use-online-request';

import { setUpOnlineCtx } from './_inner/hooks/use-online-ctx';
import ThesaurusActionsComp from './_inner/sub-views/thesaurus-actions.vue';
import UploadThesaurusDrawer from './_inner/sub-views/upload-thesaurus-drawer/upload-thesaurus-drawer.vue';

defineOptions({
  name: 'RCOnlineIndex',
});

const {
  emitterComputed,
  setWordTypeOptionsList,
  wordTypeOptionsListComputed,
  choosedWordTypeIndexComputed,
  setChoosedWordTypeIndex,
} = setUpOnlineCtx();

const { getOnlineWordTypeOptionsApiFn } = useOnlineRequest();
const testList = [];
for (let i = 0; i < 2000; i++) {
  testList.push(`${i}`);
}
const loadingRef = ref(true);

/** */
const segmentedChangedFn = (chooseValue) => {
  // console.log('segmentedChangedFn', parmas);
  setChoosedWordTypeIndex(chooseValue);
};

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

onMounted(async () => {
  emitterComputed.value.on('emitUpload', uploadEventFn);
  const [err, resp] = await getOnlineWordTypeOptionsApiFn();
  if (err) {
    console.error(err.msg || '拉去词库类型失败，请稍后刷新页面重试');
  } else {
    setWordTypeOptionsList(resp?.slice());
  }
  console.log('getOnlineWordTypeOptionsApiFn', err, resp);
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
          :options="wordTypeOptionsListComputed"
          :value="choosedWordTypeIndexComputed"
          block
          @change="segmentedChangedFn"
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
