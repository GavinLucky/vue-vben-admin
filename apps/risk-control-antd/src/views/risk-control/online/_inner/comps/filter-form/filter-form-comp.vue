<script setup lang="ts">
import { h, ref } from 'vue';

import { Input } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'FilterFormComp',
});

const thesaurusTypeRef = ref('write_list');

const onSubmit = () => {};

const [FilterForm] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
    labelClass: 'w-2/6',
  },
  // 提交函数
  handleSubmit: onSubmit,
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      fieldName: 'field',
      label: '自定义后缀',
      formItemClass: 'col-span-1 items-baseline',
      suffix: () => h('span', { class: 'text-red-600' }, '元'),
    },
    {
      component: 'Input',
      fieldName: 'field1',
      label: '自定义组件slot',
      formItemClass: 'col-span-1 items-baseline',
      renderComponentContent: () => ({
        prefix: () => 'prefix',
        suffix: () => 'suffix',
      }),
    },
    {
      component: h(Input, { placeholder: '请输入' }),
      fieldName: 'field2',
      label: '自定义组件',
      rules: 'required',
      formItemClass: 'col-span-1 items-baseline',
    },
  ],
  // 中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:gird-cols-4',
  // 是否可展开
  showCollapseButton: true,
  submitButtonOptions: {
    content: '查询',
  },
});
</script>

<template>
  <FilterForm>
    <template #thesaurus_type>
      <div class="w-full">
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
      </div>
    </template>
    <template #field3="slotProps">
      <Input placeholder="请输入" v-bind="slotProps" />
    </template>
  </FilterForm>
</template>
