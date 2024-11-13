<script setup lang="ts">
import { computed, ref } from 'vue';

import { $t } from '@vben/locales';

/** 图形验证码 */

defineOptions({
  name: 'GraphValidateCode',
});
interface IGraphValidateCodeProps {
  propApi?: () => Promise<string>;
  propValidateFailed: boolean;
}
// eslint-disable-next-line vue/define-macros-order
const props = defineProps<IGraphValidateCodeProps>();
const emit = defineEmits<{
  (e: 'onEmitOnBlur'): void;
}>();

const validateFailedComputed = computed(() => {
  return !!props.propValidateFailed;
});

const imgLoadingStateRef = ref(false);
const inputValue = defineModel('value');
const imgDataRef = ref();
const loadImgDataApiFn = () => {
  return new Promise((resolve, reject) => {
    if (props.propApi) {
      imgLoadingStateRef.value = true;
      props
        .propApi()
        .then((res) => {
          // console.log('res', res);
          imgDataRef.value = res;

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
  // 光标聚焦
};
defineExpose({
  loadImgFn: () => {
    return loadImgDataApiFn();
  },
});
</script>

<template>
  <div
    class="graph-validate-code-cls flex w-full flex-row items-center justify-between"
  >
    <div class="mr-[2px] w-1/2 flex-1">
      <a-input
        v-model:value="inputValue"
        :class="[
          validateFailedComputed ? 'border-destructive' : 'border-light',
        ]"
        :placeholder="$t('authentication.graphValidateCodeTip')"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>

    <div class="w-1/2 flex-1">
      <a-spin :spinning="imgLoadingStateRef" size="small">
        <a-tooltip placement="top">
          <template #title>
            <span>{{ $t('authentication.clickToUpdateGraphCode') }}</span>
          </template>

          <div
            class="hover:border-primary border-light ml-[2px] box-border cursor-pointer rounded-[8px] border px-[5px] py-[1px]"
            @click="updateImgDataFn"
          >
            <img
              :src="imgDataRef"
              :style="{
                height: '28px',
                width: 'auto',
              }"
              alt=""
              class="mx-auto h-full object-contain"
            />
          </div>
        </a-tooltip>
      </a-spin>
    </div>
  </div>
</template>

<style scoped lang="scss">
.graph-validate-code-cls {
  .border-destructive {
    border-color: #ff3860;
  }
}
</style>
