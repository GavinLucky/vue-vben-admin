<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'UploadThesaurusDrawer',
});

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    message.info('onConfirm');
    // drawerApi.close();
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      // handleUpdate(10);
    }
  },
});

const [UploadForm] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
    labelClass: 'w-2/6',
  },
  // 提交函数
  handleSubmit: () => {},
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      fieldName: 'field',
      label: '文件上传',
      formItemClass: 'col-span-1 items-baseline',
    },
    {
      component: 'AInputArea',
      fieldName: 'field1',
      label: '备注',
      formItemClass: 'col-span-1 items-baseline',
      renderComponentContent: () => ({
        prefix: () => 'prefix',
        suffix: () => 'suffix',
      }),
    },
  ],
  // 中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1',
  // 是否可展开
  showCollapseButton: false,
  showDefaultActions: false,
});
</script>

<template>
  <Drawer title="上传文件">
    <!--    <div-->
    <!--      v-for="item in [1, 2, 3, 4, 5]"-->
    <!--      :key="item"-->
    <!--      class="even:bg-heavy bg-muted flex-center h-[220px] w-full"-->
    <!--    >-->
    <!--      {{ item }}-->
    <!--    </div>-->
    <UploadForm />
    <template #prepend-footer>
      <Button type="link">点击更新数据</Button>
    </template>
  </Drawer>
</template>

<style scoped lang="scss"></style>
