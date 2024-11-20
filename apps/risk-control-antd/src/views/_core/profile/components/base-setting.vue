<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { onMounted } from 'vue';

import { DictEnum } from '@vben/constants';
import { $t } from '@vben/locales';
// import { useUserStore } from '@vben/stores';
import { pick } from '@vben/utils';

import { message } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';
import { userProfileUpdate } from '#/api/rg-modules/system/profile/profile-api';
import { useAuthStore } from '#/store';
import { getDictOptions } from '#/utils/dict-utils';

import { emitter } from '../mitt';

const props = defineProps<{ profile: RgApi.Profile.IUserProfile }>();

// const userStore = useUserStore();
const authStore = useAuthStore();

const [BasicForm, formApi] = useVbenForm({
  actionWrapperClass: 'text-left ml-[68px] mb-[16px]',
  commonConfig: {
    labelWidth: 60,
  },
  handleSubmit,
  resetButtonOptions: {
    show: false,
  },
  schema: [
    {
      component: 'AInput',
      dependencies: {
        show: () => false,
        triggerFields: [''],
      },
      fieldName: 'userId',
      label: '用户ID',
      rules: 'required',
    },
    {
      component: 'AInput',
      fieldName: 'nickName',
      label: $t('page.profile.nickNameKey'),
      rules: 'required',
    },
    {
      component: 'AInput',
      fieldName: 'email',
      label: $t('page.profile.emailKey'),
      rules: z.string().email($t('page.profile.emailErrorTip')),
    },
    {
      component: 'ARadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: getDictOptions(DictEnum.SYS_USER_SEX),
        optionType: 'button',
      },
      defaultValue: '0',
      fieldName: 'sex',
      label: $t('page.profile.genderKey'),
      rules: 'required',
    },
    {
      component: 'AInput',
      fieldName: 'phonenumber',
      label: $t('page.profile.phoneKey'),
      rules: z
        .string()
        .regex(/^1[3-9]\d{9}$/, $t('page.profile.phoneErrorTip')),
    },
  ],
  submitButtonOptions: {
    content: $t('page.profile.updateData'),
  },
});

function buttonLoading(loading: boolean) {
  formApi.setState((prev) => ({
    ...prev,
    submitButtonOptions: { ...prev.submitButtonOptions, loading },
  }));
}

async function handleSubmit(values: Recordable<any>) {
  try {
    buttonLoading(true);
    const [err] = await userProfileUpdate(values);
    if (err) {
      message.error(err.msg || $t('page.profile.updateFailedTip'));
    } else {
      message.success($t('page.profile.updateSuccessTip'));
      // 更新store
      const userInfo = await authStore.fetchUserInfo();

      console.log(userInfo);
      // 左边reload
      emitter.emit('updateProfile');
    }
  } catch (error) {
    console.error(error);
  } finally {
    buttonLoading(false);
  }
}

onMounted(() => {
  const data = pick(props.profile.user, [
    'userId',
    'nickName',
    'email',
    'phonenumber',
    'sex',
  ]);
  formApi.setValues(data);
});
</script>

<template>
  <div class="flex w-full flex-row items-center justify-center">
    <div class="mt-[16px] md:w-full lg:w-1/2 2xl:w-2/5">
      <BasicForm />
    </div>
  </div>
</template>
