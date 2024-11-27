<script lang="ts" setup>
import { computed, watchEffect } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { CloudUpload } from '@vben/icons';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { OnlineConstSp } from '#/views/risk-control/online/_inner/defs/online-defs';
import { useOnlineCtx } from '#/views/risk-control/online/_inner/hooks/use-online-ctx';
import { useOnlineRequest } from '#/views/risk-control/online/_inner/hooks/use-online-request';
import { formSchemaDatas } from '#/views/risk-control/online/_inner/sub-views/upload-thesaurus-drawer/_inner/form.schema.data';

defineOptions({
  name: 'UploadThesaurusDrawer',
});

const { uploadWordFileApiFn } = useOnlineRequest();
const { choosedWordTypeIndexComputed, emitterComputed } = useOnlineCtx();
const uploadDrawerTitleComputed = computed(() => {
  if (!choosedWordTypeIndexComputed.value) {
    return '上传词表';
  }
  const cnTitle =
    OnlineConstSp.wordsTypeLabelMap[choosedWordTypeIndexComputed.value];

  return `上传词表--${choosedWordTypeIndexComputed.value}--【${cnTitle}】`;
});

const [UploadForm, uploadFormMethod] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
    labelClass: 'w-[80px]',
  },
  // 提交函数
  handleSubmit: () => {},
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [...formSchemaDatas],
  // 中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 gap-2',
  // 是否可展开
  showCollapseButton: false,
  showDefaultActions: false,
});

watchEffect(() => {
  if (choosedWordTypeIndexComputed.value) {
    const [first] = formSchemaDatas;
    if (first) {
      first.defaultValue = choosedWordTypeIndexComputed.value;
      first.componentProps!.options = [
        {
          label: choosedWordTypeIndexComputed.value,
          value: choosedWordTypeIndexComputed.value,
        },
      ];
      uploadFormMethod.updateSchema([first]);
    }
  }
});

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    setTimeout(async () => {
      try {
        await uploadFormMethod.validate();
      } catch (error) {
        message.error('请正确先写表单');
        console.log(error);
        return;
      }

      const { uploadFileField, remark, filetype } =
        await uploadFormMethod.getValues();
      console.log('formFieldValue', uploadFileField, remark, filetype);

      drawerApi.setState({ loading: true, confirmLoading: true });
      const [file] = uploadFileField;
      const [err] = await uploadWordFileApiFn(
        file.originFileObj,
        filetype,
        remark,
      );
      drawerApi.setState({ loading: false, confirmLoading: false });
      if (err) {
        message.error(err.msg || '上传失败');
      } else {
        message.success('上传成功');
        emitterComputed.value.emit('onUploadFinshed');
        drawerApi.close();
      }
      // console.log('onConfirm', err, resp);
    }, 0);

    // drawerApi.close();
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      // handleUpdate(10);
    }
  },
  onBeforeClose() {
    uploadFormMethod.resetForm();
  },
});
</script>

<template>
  <Drawer :title="uploadDrawerTitleComputed">
    <!--    <div-->
    <!--      v-for="item in [1, 2, 3, 4, 5]"-->
    <!--      :key="item"-->
    <!--      class="even:bg-heavy bg-muted flex-center h-[220px] w-full"-->
    <!--    >-->
    <!--      {{ item }}-->
    <!--    </div>-->
    <UploadForm>
      <template #uploadFileField="{ value, setValue }">
        <div class="h-auto w-full">
          <a-upload-dragger
            :before-upload="() => false"
            :file-list="value"
            :max-count="1"
            :multiple="false"
            action=""
            class="w-full"
            name="file"
            @update:file-list="setValue"
          >
            <p class="ant-upload-drag-icon">
              <CloudUpload
                class="mb-8px text-primary m-auto h-[32px] w-[32px]"
              />
            </p>
            <p class="ant-upload-text">点击或者拖拽文件到此处上传</p>
            <p class="ant-upload-hint">仅支持*.txt格式文件，允许上传一个文件</p>
          </a-upload-dragger>
        </div>
      </template>
    </UploadForm>
    <template #prepend-footer> </template>
  </Drawer>
</template>

<style scoped lang="scss"></style>
