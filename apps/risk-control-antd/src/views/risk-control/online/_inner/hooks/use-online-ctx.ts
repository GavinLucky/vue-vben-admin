import { computed } from 'vue';

import { useContext } from '@vben/hooks';
import { mitt } from '@vben/utils';

export const { setupStore: setUpOnlineCtx, useStore: useOnlineCtx } =
  useContext('contracts-list', () => {
    const emitter = mitt();
    const emitterComputed = computed(() => emitter);

    return {
      emitterComputed,
    };
  });
