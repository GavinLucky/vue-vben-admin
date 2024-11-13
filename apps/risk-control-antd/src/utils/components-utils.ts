import type { Ref } from 'vue';

export const getRefCompFn = <T = any>(ref: Ref<T, boolean>): T | undefined => {
  return isArray(ref.value) ? ref.value[0] : ref.value;
};

function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}
