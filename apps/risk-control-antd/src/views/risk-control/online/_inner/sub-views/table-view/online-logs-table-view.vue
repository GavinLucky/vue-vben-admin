<script setup lang="ts">
import type { VbenFormProps } from '#/adapter/form';

import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';

defineOptions({
  name: 'OnlineLogsTableViewComp',
});
interface IProps {
  columns: Record<any, any>[];
  title: string;
}
// eslint-disable-next-line vue/define-macros-order
const { columns = [], title = '' } = defineProps<IProps>();

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
        const list = [];
        for (let i = 0; i < page.pageSize; i++) {
          list.push({ id: i, name: i, user: i });
        }
        return {
          total: 50,
          items: list,
        };
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
      label: '上线时间',
    },
    {
      component: 'AInput',
      fieldName: 'action_user',
      label: '上线人',
    },
    {
      component: 'ASelect',
      fieldName: 'online_status',
      label: '上线状态',
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

const [BasicTable] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    // checkboxChange: tableCheckboxEvent(checked),
    // checkboxAll: tableCheckboxEvent(checked),
  },
});
</script>

<template>
  <div class="flex h-full flex-col">
    <BasicTable :table-title="title" class="flex-1 overflow-hidden">
      <template #form-category>form</template>
      <template #toolbar-tools>
        <a-button size="small" type="primary">上传策略</a-button>
      </template>

      <template #avatar=""> </template>
      <template #status=""> </template>
      <template #action=""> </template>
    </BasicTable>
  </div>
</template>

<style scoped></style>
