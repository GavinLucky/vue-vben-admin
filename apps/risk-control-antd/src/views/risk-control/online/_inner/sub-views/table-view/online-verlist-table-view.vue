<script setup lang="ts">
import type { VbenFormProps } from '#/adapter/form';

import { ArcticonsMgrOnline, HugeiconFileExport } from '@vben/icons';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';
import { useOnlineCtx } from '#/views/risk-control/online/_inner/hooks/use-online-ctx';
import { useOnlineRequest } from '#/views/risk-control/online/_inner/hooks/use-online-request';

defineOptions({
  name: 'OnlineVerListTableViewComp',
});
interface IProps {
  columns: Record<any, any>[];
  title: string;
}
// eslint-disable-next-line vue/define-macros-order
const { columns = [], title = '' } = defineProps<IProps>();

const { emitterComputed, choosedWordTypeIndexComputed } = useOnlineCtx();

const { getUploadedOnlineWordsListApiFn } = useOnlineRequest();
const uploadBtnClickFn = () => {
  emitterComputed.value.emit('emitUpload');
};
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
  pagerConfig: {
    // total: 100,
    // currentPage: 2,
    pageSize: 10,
  },
  proxyConfig: {
    autoLoad: true,
    ajax: {
      query: async ({ page }, formValues = {}) => {
        // 部门树选择处理
        // debugger;
        console.log('formValue', page, formValues);
        const list = [];
        for (let i = 0; i < page.pageSize; i++) {
          list.push({ id: i, name: i, user: i });
        }
        const [err, resp] = await getUploadedOnlineWordsListApiFn(
          choosedWordTypeIndexComputed.value,
          page.currentPage,
          page.pageSize,
        );
        if (err) {
          message.error(err.msg || '获取失败，请稍后重试');
          return {
            total: 0,
            items: [],
          };
        } else {
          const { total, rows } = resp;
          return {
            total,
            items: rows,
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

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'ARangePicker',
      fieldName: 'time',
      label: '上传时间',
    },
    {
      component: 'AInput',
      fieldName: 'update_user',
      label: '上传人',
    },
    {
      component: 'AInput',
      fieldName: 'file_name',
      label: '文件名称',
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
    'sm:max-md:max-w-[520px]  sm:max-md:m-auto md:w-full grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4',
};

const [BasicTable, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    // checkboxChange: tableCheckboxEvent(checked),
    // checkboxAll: tableCheckboxEvent(checked),
  },
});
defineExpose({
  refeshListFn: () => {
    gridApi.reload();
  },
});
</script>

<template>
  <div class="flex h-full flex-col">
    <BasicTable
      :table-title="`${title}--上传列表`"
      class="flex-1 overflow-hidden"
    >
      <template #form-category>form</template>
      <template #toolbar-tools>
        <a-button size="small" type="primary" @click="uploadBtnClickFn">
          上传词表
        </a-button>
      </template>

      <template #rawFilename="{ row, column }">
        <div class="flex w-full flex-row">
          <div>{{ row[column.field] }}</div>
          <div class="pl-1">
            <a-tag v-if="row.releaseStatus === 2" color="success">
              当前线上版本
            </a-tag>
            <a-tag v-if="row[column.field] === 1" color="processing">
              正在发布版本
            </a-tag>
          </div>
        </div>
      </template>
      <template #action="">
        <div class="flex w-full flex-row items-center justify-evenly">
          <a-tooltip>
            <template #title>上线</template>
            <a-button shape="circle" size="small">
              <template #icon>
                <ArcticonsMgrOnline class="h-full w-full p-1" />
              </template>
            </a-button>
          </a-tooltip>
          <a-tooltip>
            <template #title>导出</template>
            <a-button shape="circle" size="small">
              <template #icon>
                <HugeiconFileExport class="h-full w-full p-1" />
              </template>
            </a-button>
          </a-tooltip>
        </div>
      </template>
    </BasicTable>
  </div>
</template>

<style scoped></style>
