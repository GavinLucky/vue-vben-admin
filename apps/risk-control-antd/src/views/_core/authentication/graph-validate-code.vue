<script setup lang="ts">
import { computed, ref } from 'vue';

import { Image } from '@vben/icons';

import { Input, Spin, Tooltip } from 'ant-design-vue';

/** 图形验证码 */

defineOptions({
  name: 'GraphValidateCode',
});
interface IGraphValidateCodeProps {
  /** 获取图片Api接口 */
  propApi?: () => Promise<boolean>;
  /** 校验失败状态 */
  propValidateFailed: boolean;
  propCaptcha?: string;
}
// eslint-disable-next-line vue/define-macros-order
const props = defineProps<IGraphValidateCodeProps>();
const emit = defineEmits<{
  (e: 'onEmitOnBlur'): void;
  (e: 'onEmitOnChange', event: Event): void;
  (e: 'onEmitOnFocus'): void;
}>();

const validateFailedComputed = computed(() => {
  return !!props.propValidateFailed;
});
const captchaComputed = computed(() => {
  const imgData = props.propCaptcha;
  if (!imgData) {
    return '';
  }
  if (!imgData?.startsWith('data:image/png;base64,')) {
    return `data:image/png;base64,${imgData}`;
  }
  return imgData;
});
const imgLoadingStateRef = ref(false);
const inputValue = defineModel<string>('value');

const loadImgDataApiFn = () => {
  return new Promise((resolve, reject) => {
    if (props.propApi) {
      imgLoadingStateRef.value = true;
      props
        .propApi()
        .then((res) => {
          // console.log('res', res);
          // imgDataRef.value = res;

          resolve(res);
        })
        .catch((error) => {
          console.error('e', error);
          reject(error);
        })
        .finally(() => {
          imgLoadingStateRef.value = false;
        });
    }
  });
};
const updateImgDataFn = () => {
  loadImgDataApiFn().then().catch();
};

const handleBlur = () => {
  // console.log('handleBlur');
  emit('onEmitOnBlur');
  // 光标失焦
};
const handleFocus = () => {
  // console.log('handleFocus');
  emit('onEmitOnFocus');
  // 光标聚焦
};
const handleChange = (e: Event) => {
  // console.log('handleChange', e);
  emit('onEmitOnChange', e);
  // 输入框内容改变
};
</script>

<template>
  <div
    class="graph-validate-code-cls flex w-full flex-row items-center justify-between"
  >
    <div class="mr-[2px] w-1/2 flex-1">
      <Input
        v-model:value="inputValue"
        :class="[
          validateFailedComputed ? 'border-destructive' : 'border-light',
        ]"
        placeholder="请输入验证码"
        @blur="handleBlur"
        @change="handleChange"
        @focus="handleFocus"
      />
    </div>

    <div class="w-1/2 flex-1">
      <Spin :spinning="imgLoadingStateRef" size="small">
        <Tooltip placement="top">
          <template #title>
            <span>点击更新验证码</span>
          </template>

          <div
            class="hover:border-primary border-light ml-[2px] box-border flex cursor-pointer flex-row justify-center rounded-[8px] border px-[5px] py-[1px]"
            @click="updateImgDataFn"
          >
            <img
              v-if="captchaComputed"
              :src="captchaComputed"
              :style="{
                height: '28px',
                width: 'auto',
              }"
              alt=""
              class="bg-light mx-auto h-full object-contain"
            />
            <Image v-else :stroke-width="1" color="gray" size="20" />
          </div>
        </Tooltip>
      </Spin>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
