<script setup lang="ts">
import type { VbenFormProps } from '#/adapter/form';

import { EllipsisText } from '@vben/common-ui';
import { Copy, NotebookTabs } from '@vben/icons';

import { useClipboard } from '@vueuse/core';
import { message } from 'ant-design-vue';

import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';
import { useOnlineCtx } from '#/views/risk-control/online/_inner/hooks/use-online-ctx';
import { useOnlineRequest } from '#/views/risk-control/online/_inner/hooks/use-online-request';

defineOptions({
  name: 'OnlineLogsTableViewComp',
});
interface IProps {
  columns: Record<any, any>[];
  title: string;
}
const { choosedWordTypeIndexComputed } = useOnlineCtx();
const { getOnlineReleaseLogsApiFn } = useOnlineRequest();
// eslint-disable-next-line vue/define-macros-order
const { columns = [], title = '' } = defineProps<IProps>();
const { copy, copied, isSupported } = useClipboard();
const gridOptions: VxeGridProps = {
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    // 点击行选中
    trigger: 'default',
    checkMethod: ({ row }) => row?.userId !== 1,
  },
  columns,
  minHeight: 150,
  maxHeight: '100%',
  // height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    autoLoad: true,
    ajax: {
      query: async ({ page }, formValues = {}) => {
        // 部门树选择处理
        // debugger;
        console.log('formValue', formValues);
        const [err, resp] = await getOnlineReleaseLogsApiFn(
          choosedWordTypeIndexComputed.value,
          page.currentPage,
          page.pageSize,
        );
        console.log('getOnlineReleaseLogsApiFn', err, resp);
        if (err) {
          message.error(err.msg || '获取日志失败');
          return {
            total: 0,
            items: [],
          };
        } else {
          return {
            total: resp.total || 0,
            items: resp.rows || [],
          };
        }
      },
    },
  },
  rowConfig: {
    isHover: true,
    // keyField: 'userId',
    // height: 48,
  },
};

const copyBtnClickFn = async (row: Record<any, any>) => {
  // console.log('row', row, copied.value);
  await copy(row.remark);
  if (copied.value) {
    message.success('已成功复制剪贴板');
  } else {
    message.error('复制失败');
  }
};
const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'ARangePicker',
      fieldName: 'time',
      label: '上线时间',
    },
    {
      component: 'AInput',
      fieldName: 'action_user',
      label: '上线人',
    },
  ],
  resetButtonOptions: {
    size: 'small',
  },
  submitButtonOptions: {
    size: 'small',
  },
  // 控制表单是否显示折叠按钮
  showCollapseButton: false,
  // 按下回车时是否提交表单
  submitOnEnter: false,
  // 中屏一行显示2个，小屏一行显示1个
  wrapperClass:
    'sm:max-md:max-w-[520px]  sm:max-md:m-auto md:w-full grid-cols-1 md:grid-cols-2  lg:grid-cols-3 ',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    // checkboxChange: tableCheckboxEvent(checked),
    // checkboxAll: tableCheckboxEvent(checked),
  },
});
defineExpose({
  refeshListFn: () => {
    tableApi.reload();
  },
});
</script>

<template>
  <div class="flex h-full flex-col">
    <BasicTable
      :table-title="`${title}--上线记录列表`"
      class="flex-1 overflow-hidden"
    >
      <template #form-category>form</template>
      <template #toolbar-tools> </template>

      <template #avatar=""> </template>
      <template #status=""> </template>
      <template #default_slot_remark="{ row, column }">
        <div class="w-full max-w-full overflow-x-hidden">
          <div class="flex flex-row items-center justify-between">
            <div class="flex-1 overflow-x-hidden">
              <EllipsisText :line="1" :tooltip-max-width="800" class="w-full">
                {{ row[column.field] }}
              </EllipsisText>
            </div>
            <div class="flex flex-none flex-row items-center justify-center">
              <a-button
                v-if="isSupported"
                shape="circle"
                size="small"
                type="link"
                @click="copyBtnClickFn(row)"
              >
                <template #icon>
                  <Copy class="h-full w-full p-1" />
                </template>
              </a-button>
            </div>
          </div>
        </div>
      </template>
      <template #action="">
        <a-tooltip>
          <template #title>查看详情</template>
          <a-button shape="circle" size="small">
            <template #icon>
              <NotebookTabs class="h-full w-full p-1" />
            </template>
          </a-button>
        </a-tooltip>
      </template>
    </BasicTable>
  </div>
</template>

<style scoped></style>
