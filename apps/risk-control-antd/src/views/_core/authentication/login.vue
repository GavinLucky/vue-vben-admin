<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, onMounted, ref } from 'vue';

import { AuthenticationLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { getAuthCodeApi } from '#/api/rg-modules/auth-api';
import { useAuthStore } from '#/store';
import { doEncrypt } from '#/utils/js-encrypt-utils';
import GraphValidateCode from '#/views/_core/authentication/graph-validate-code.vue';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const authLoginRef = ref<typeof AuthenticationLogin>();

const codeUuidRef = ref('');
const imgDataApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const [err, resp] = await getAuthCodeApi();
      if (err) {
        console.error('captcha', err);
        reject(err);
      } else {
        codeUuidRef.value = resp.uuid;
        // console.log('captcha', resp.img);
        resolve(resp.img);
      }
    });
  });
};

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'AInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      // dependencies: {},
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'AInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'Input',
      fieldName: 'code',
      componentProps: {
        api: imgDataApi,
      },
      rules: z
        .string()
        .min(1, { message: $t('authentication.graphValidateCodeTip') }),
    },
  ];
});

// #region submit
// =================================================
const submitBtnClickFn = async ([error, values]: any) => {
  if (error) {
    console.error('validate error', error);
    message.error($t('authentication.checkInputData'), 5);
    return;
  }
  console.log('submitBtnClickFn', values);
  if (values.password) {
    // 账密登录
    const params: RgApi.Auth.IAuthLoginReq = {
      username: values.username,
      password: `${doEncrypt(values.password)}`,
      code: values.code,
      uuid: codeUuidRef.value,
    };
    await authStore.authLogin(params);
  } else {
    message.warn($t('authentication.notSupportedLogin'), 5);
  }
};
// #endregion  -------------------------------------
onMounted(() => {
  // console.log('Login onMounted');
  setTimeout(() => {
    // getGraphValidateCodeComp()?.loadImgFn();
  }, 100);
});
</script>

<template>
  <AuthenticationLogin
    ref="authLoginRef"
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    :show-third-party-login="false"
    @submit="submitBtnClickFn"
  >
    <template
      #code="{ api, isInValid, value, handleBlur, handleChange, setValue }"
    >
      <div class="w-full">
        <GraphValidateCode
          :prop-api="api"
          :prop-validate-failed="isInValid"
          :value="value"
          @on-emit-on-blur="handleBlur()"
          @on-emit-on-change="handleChange($event)"
          @on-emit-on-focus="() => {}"
          @update:value="(nV) => setValue(nV)"
        />
      </div>
    </template>
  </AuthenticationLogin>
</template>
