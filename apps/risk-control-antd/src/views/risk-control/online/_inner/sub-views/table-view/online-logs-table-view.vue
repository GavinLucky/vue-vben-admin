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
      component: 'Input',
      defaultValue: '1',
      fieldName: 'category',
      label: 'Category',
    },
    {
      component: 'Input',
      fieldName: 'productName',
      label: 'ProductName',
    },
    {
      component: 'Input',
      fieldName: 'price',
      label: 'Price',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: 'Color1',
            value: '1',
          },
          {
            label: 'Color2',
            value: '2',
          },
        ],
        placeholder: '请选择',
      },
      fieldName: 'color',
      label: 'Color',
    },
    {
      component: 'DatePicker',
      fieldName: 'datePicker',
      label: 'Date',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
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
