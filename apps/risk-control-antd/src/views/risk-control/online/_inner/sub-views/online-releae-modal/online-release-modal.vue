<script setup lang="ts">
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { useOnlineCtx } from '#/views/risk-control/online/_inner/hooks/use-online-ctx';
import { useOnlineRequest } from '#/views/risk-control/online/_inner/hooks/use-online-request';

defineOptions({
  name: 'OnlineReleaseModalComp',
});
const { emitterComputed } = useOnlineCtx();
const { getDiffWithOnlineWordsVersionApiFn, doReleaseVersionApiFn } =
  useOnlineRequest();

const rowRef = ref<Record<any, any> | undefined>(undefined);
const diffDetailRef = ref<Record<'add' | 'del', string[]>>({
  add: [],
  del: [],
});
const loadDiffDataFn = async () => {
  const [err, resp] = await getDiffWithOnlineWordsVersionApiFn(
    rowRef.value?.id || '',
  );
  console.log('getDiffWithOnlineWordsVersionApiFn', err, resp);
  if (err) {
    message.error(err.msg || '获取对比数据失败');
  } else {
    diffDetailRef.value = resp;
  }
};

// #region 上线说明 form
// =================================================
const [Form, formApi] = useVbenForm({
  handleSubmit: () => {},
  schema: [
    {
      component: 'ATextarea',
      componentProps: {
        placeholder: '确认词库内容无误，请填写上线说明并提交完成上线工作',
      },
      fieldName: 'remark',
      label: '上线说明',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
});
// #endregion  -------------------------------------
const submitFn = async () => {
  try {
    const validResp = await formApi.validate();
    console.log('submitFn', validResp);
    if (!validResp.valid) {
      message.error('请填写上线说明');
      return;
    }
  } catch (error) {
    console.error(error);
  }
  // eslint-disable-next-line no-use-before-define
  modalApi.setState({ loading: true, confirmLoading: true });

  const { remark } = await formApi.getValues();
  const [err, resp] = await doReleaseVersionApiFn(
    rowRef.value?.id || '',
    remark,
  );
  // eslint-disable-next-line no-use-before-define
  modalApi.setState({ loading: false, confirmLoading: false });
  if (err) {
    message.error(err.msg || '上线失败');
  } else {
    message.success('上线成功');
    emitterComputed.value.emit('onUploadFinshed');
    // eslint-disable-next-line no-use-before-define
    modalApi.close();
  }
  console.log('doReleaseVersionApiFn', err, resp);
};
const [Modal, modalApi] = useVbenModal({
  class: 'w-[65vw]',
  onClosed: () => {
    rowRef.value = undefined;
  },
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    submitFn();
  },
  onOpenChange: async (isOpen: boolean) => {
    if (isOpen) {
      modalApi.setState({ loading: true });
      rowRef.value = modalApi.getData<Record<string, any>>();
      await loadDiffDataFn();
      modalApi.setState({ loading: false });
    }
  },
});
</script>

<template>
  <Modal title="词库上线">
    <a-descriptions :column="1" bordered title="版本差异内容">
      <a-descriptions-item
        :label-style="{
          width: '120px',
          color: 'green',
        }"
        :span="1"
        label="Add"
      >
        <div class="flex flex-row items-center justify-center">
          <span>{{ diffDetailRef.add.join(',') }}</span>
        </div>
      </a-descriptions-item>
      <a-descriptions-item
        :label-style="{
          width: '120px',
          color: 'red',
        }"
        :span="3"
        label="Del"
      >
        <span>{{ diffDetailRef.del.join(',') }}</span>
      </a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <Form />
  </Modal>
</template>

<style scoped></style>
