<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';

import { getRefCompFn } from '#/utils/components-utils';
import { OnlineConstSp } from '#/views/risk-control/online/_inner/defs/online-defs';
import { useOnlineCtx } from '#/views/risk-control/online/_inner/hooks/use-online-ctx';

import { useTableHooks } from './table-view/_inner/table-hooks';
import OnlineLogsTableViewComp from './table-view/online-logs-table-view.vue';
import OnlineVerListTableViewComp from './table-view/online-verlist-table-view.vue';

defineOptions({
  name: 'ThesaurusActionsComp',
});
const { onLineColumns, onlineLogsColumns } = useTableHooks();
const { choosedWordTypeIndexComputed, emitterComputed } = useOnlineCtx();
const titlePerfixRef = ref('');
const uploadedTableRef = ref<typeof OnlineVerListTableViewComp>();
const onlineReleasedLogsTableRef = ref<typeof OnlineLogsTableViewComp>();
watch(
  () => choosedWordTypeIndexComputed.value,
  (nV) => {
    if (nV) {
      const cnTitle = OnlineConstSp.wordsTypeLabelMap[nV];
      titlePerfixRef.value = `${nV}【${cnTitle}】`;
    }
  },
  {
    immediate: true,
  },
);
const activeKey = ref('1');

// #region emit func
// =================================================
const onEmitUploadFinishedFn = () => {
  console.log('onEmitUploadFinished');
  getRefCompFn(uploadedTableRef)?.refeshListFn();
};
const onEmitWordsTypeChanged = () => {
  activeKey.value = '1';
  getRefCompFn(uploadedTableRef)?.refeshListFn(true);
};
// #endregion  -------------------------------------

onMounted(() => {
  emitterComputed.value.on('onUploadFinshed', onEmitUploadFinishedFn);
  emitterComputed.value.on('onWordsTypeChanged', onEmitWordsTypeChanged);
  //   onWordsTypeChanged
});
onUnmounted(() => {
  emitterComputed.value.off('onUploadFinshed', onEmitUploadFinishedFn);
  emitterComputed.value.off('onWordsTypeChanged', onEmitWordsTypeChanged);
});
watch(
  () => activeKey.value,
  (nV) => {
    if (nV === '2') {
      getRefCompFn(onlineReleasedLogsTableRef)?.refeshListFn(true);
    }
  },
);
</script>

<template>
  <div class="flex h-full flex-col">
    <a-tabs
      v-model:active-key="activeKey"
      :tab-bar-gutter="5"
      class="h-auto flex-none"
      type="card"
    >
      <a-tab-pane key="1" tab="上线">
        <div class="overflow-y-hidden"></div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="上线记录" />
    </a-tabs>
    <div
      class="bg-background-deep z-100 h-[6px] w-full overflow-hidden md:bottom-2 md:h-[8px]"
    ></div>
    <div class="flex-1 overflow-y-hidden">
      <OnlineVerListTableViewComp
        v-show="activeKey === '1'"
        ref="uploadedTableRef"
        :columns="onLineColumns"
        :title="titlePerfixRef"
      />
      <OnlineLogsTableViewComp
        v-show="activeKey === '2'"
        ref="onlineReleasedLogsTableRef"
        :columns="onlineLogsColumns"
        :title="titlePerfixRef"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.ant-tabs) {
  .ant-tabs-nav {
    margin-bottom: 0;

    .ant-tabs-tab {
      &.ant-tabs-tab-active {
        color: hsl(var(--primary));
        background-color: hsl(var(--primary) / 15%);
      }
    }
  }
}
</style>
