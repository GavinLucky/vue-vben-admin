<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

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
</script>

<template>
  <Drawer title="上传文件">
    <div
      v-for="item in [1, 2, 3, 4, 5]"
      :key="item"
      class="even:bg-heavy bg-muted flex-center h-[220px] w-full"
    >
      {{ item }}
    </div>

    <template #prepend-footer>
      <Button type="link">点击更新数据</Button>
    </template>
  </Drawer>
</template>

<style scoped lang="scss"></style>
