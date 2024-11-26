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
    const choosedWordTypeIndexRef = ref<'' | OnlineSp.Commom.wordsType>('');
    const choosedWordTypeIndexComputed = computed(
      () => choosedWordTypeIndexRef.value,
    );
    const setChoosedWordTypeIndex = (index: OnlineSp.Commom.wordsType) => {
      if (choosedWordTypeIndexRef.value !== index) {
        choosedWordTypeIndexRef.value = index;
        emitterComputed.value.emit('onWordsTypeChanged');
      }
    };
    /** 词库类型选项列表*/
    const wordTypeOptionsListRef = ref<
      {
        payload?: {
          cnTitle: string;
          wordsKey: string;
        };
        title?: string;
        value: string;
      }[]
    >([]);
    const wordTypeOptionsListComputed = computed(
      () => wordTypeOptionsListRef.value,
    );
    const setWordTypeOptionsList = (
      list: OnlineSp.Commom.wordsType[] | Record<any, any>[],
    ) => {
      const [first] = list;
      if (first && isString(first)) {
        // 文本类型，转换成对象
        const formatList = list.map((ele) => {
          const cnTitle =
            OnlineConstSp.wordsTypeLabelMap[ele as OnlineSp.Commom.wordsType];
          const obj = {
            payload: {
              wordsKey: ele,
              cnTitle,
            },
            title: cnTitle,
            value: ele,
          };
          return obj;
        });

        wordTypeOptionsListRef.value = formatList as any;
        setChoosedWordTypeIndex(first);
        return;
      }
      wordTypeOptionsListRef.value = list as any;
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
