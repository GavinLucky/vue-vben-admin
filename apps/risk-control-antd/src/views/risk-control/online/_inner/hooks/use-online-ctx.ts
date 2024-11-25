import { computed, ref } from 'vue';

import { useContext } from '@vben/hooks';
import { isString, mitt } from '@vben/utils';

import { OnlineConstSp } from '#/views/risk-control/online/_inner/defs/online-defs';

export const { setupStore: setUpOnlineCtx, useStore: useOnlineCtx } =
  useContext('contracts-list', () => {
    const emitter = mitt();
    const emitterComputed = computed(() => emitter);

    // #region 词库类型相关
    // =================================================
    /** 当前选中的词谱类型*/
    const choosedWordTypeIndexRef = ref<OnlineSp.Commom.wordsType>('');
    const choosedWordTypeIndexComputed = computed(
      () => choosedWordTypeIndexRef.value,
    );
    const setChoosedWordTypeIndex = (index: OnlineSp.Commom.wordsType) => {
      choosedWordTypeIndexRef.value = index;
    };
    /** 词库类型选项列表*/
    const wordTypeOptionsListRef = ref([]);
    const wordTypeOptionsListComputed = computed(
      () => wordTypeOptionsListRef.value,
    );
    const setWordTypeOptionsList = (list: OnlineSp.Commom.wordsType[]) => {
      const [first] = list;
      if (first && isString(first)) {
        // 文本类型，转换成对象
        const formatList = list.map((ele) => {
          const obj = {
            label: `${ele}(${OnlineConstSp.wordsTypeLabelMap[ele] || ''})`,
            value: ele,
          };
          return obj;
        });
        wordTypeOptionsListRef.value = formatList;
        choosedWordTypeIndexRef.value = first;
        return;
      }
      wordTypeOptionsListRef.value = list;
    };
    // #endregion  -------------------------------------

    return {
      emitterComputed,
      choosedWordTypeIndexComputed,
      setChoosedWordTypeIndex,
      wordTypeOptionsListComputed,
      setWordTypeOptionsList,
    };
  });
