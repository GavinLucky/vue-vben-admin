<script setup lang="ts">
import { ref } from 'vue';

import { useTableHooks } from '#/views/risk-control/online/_inner/sub-views/_inner/table-hooks';

import OnlineLogsTableViewComp from './table-view/online-logs-table-view.vue';
import OnlineVerListTableViewComp from './table-view/online-verlist-table-view.vue';

defineOptions({
  name: 'ThesaurusActionsComp',
});
const { onLineColumns, onlineLogsColumns } = useTableHooks();
const activeKey = ref('1');
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
        :columns="onLineColumns"
        title="白名单"
      />
      <OnlineLogsTableViewComp
        v-show="activeKey === '2'"
        :columns="onlineLogsColumns"
        title="上线记录"
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
