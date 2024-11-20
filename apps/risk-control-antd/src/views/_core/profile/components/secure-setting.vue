<script setup lang="ts">
// import type { UpdatePasswordParam } from '#/api/system/profile/model';

import { $t } from '@vben/locales';
import { omit } from '@vben/utils';

import { message, Modal } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';
import { userUpdatePassword } from '#/api/rg-modules/system/profile/profile-api';
import { useAuthStore } from '#/store';

const [BasicForm, formApi] = useVbenForm({
  actionWrapperClass: 'text-left mb-[16px] ml-[96px]',
  commonConfig: {
    labelWidth: 90,
  },
  handleSubmit,
  resetButtonOptions: {
    show: false,
  },
  schema: [
    {
      component: 'AInputPassword',
      fieldName: 'oldPassword',
      label: $t('page.profile.resetPsd.oldPsd'),
      componentProps: {
        placeholder: $t('page.profile.resetPsd.oldPsdPlaceholder'),
      },
      rules: z
        .string({ message: $t('page.profile.resetPsd.oldPsdPlaceholder') })
        .min(5, $t('page.profile.resetPsd.checkMinLength'))
        .max(20, $t('page.profile.resetPsd.checkMaxLength')),
    },
    {
      component: 'AInputPassword',
      dependencies: {
        rules(values) {
          return z
            .string({ message: $t('page.profile.resetPsd.newPsdPlaceholder') })
            .min(5, $t('page.profile.resetPsd.checkMinLength'))
            .max(20, $t('page.profile.resetPsd.checkMaxLength'))
            .refine(
              (value) => value !== values.oldPassword,
              $t('page.profile.resetPsd.checkMaxLength'),
            );
        },
        triggerFields: ['newPassword', 'oldPassword'],
      },
      fieldName: 'newPassword',
      label: $t('page.profile.resetPsd.newPsd'),
      componentProps: {
        placeholder: $t('page.profile.resetPsd.newPsdPlaceholder'),
      },
      rules: 'required',
    },
    {
      component: 'AInputPassword',
      dependencies: {
        rules(values) {
          return z
            .string({
              message: $t('page.profile.resetPsd.confirmPsdPlaceholder'),
            })
            .min(5, $t('page.profile.resetPsd.checkMinLength'))
            .max(20, $t('page.profile.resetPsd.checkMaxLength'))
            .refine(
              (value) => value === values.newPassword,
              $t('page.profile.resetPsd.confirmPsdNotMatch'),
            );
        },
        triggerFields: ['newPassword', 'confirmPassword'],
      },
      fieldName: 'confirmPassword',
      label: $t('page.profile.resetPsd.confirmPsd'),
      componentProps: {
        placeholder: $t('page.profile.resetPsd.confirmPsdPlaceholder'),
      },
      rules: 'required',
    },
  ],
  submitButtonOptions: {
    class: 'mt-[16px]',
    content: $t('page.profile.resetPsd.buttonTitle'),
  },
});

function buttonLoading(loading: boolean) {
  formApi.setState((prev) => ({
    ...prev,
    submitButtonOptions: { ...prev.submitButtonOptions, loading },
  }));
}

const authStore = useAuthStore();
function handleSubmit(values: any) {
  Modal.confirm({
    content: $t('page.profile.resetPsd.confirmToChangedPsdContent'),
    onOk: async () => {
      try {
        buttonLoading(true);
        const data = omit(values, [
          'confirmPassword',
        ]) as RgApi.Profile.IUpdatePasswordReq;
        const [err] = await userUpdatePassword(data);
        if (err) {
          message.error(err.msg);
        } else {
          message.success($t('page.profile.resetPsd.updatePsdSuccessTip'));
          await authStore.logout(true);
        }
      } catch (error) {
        console.error(error);
        message.error(
          error.msg || $t('page.profile.resetPsd.updatePsdFailedTip'),
        );
      } finally {
        buttonLoading(false);
      }
    },
    title: '提示',
  });
}
</script>

<template>
  <div class="flex flex-row items-center justify-center">
    <div class="mt-[16px] md:w-full lg:w-1/2 2xl:w-2/5">
      <BasicForm />
    </div>
  </div>
</template>
