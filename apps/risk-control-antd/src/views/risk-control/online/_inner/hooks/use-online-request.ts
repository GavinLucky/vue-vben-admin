import {
  getOnlineWordTypeOptionsApi,
  getUploadedOnlineWordsListApi,
} from '#/api/rg-modules/risk-control/words-online-api';

const getOnlineWordTypeOptionsApiFn = () => {
  return getOnlineWordTypeOptionsApi();
};
const getUploadedOnlineWordsListApiFn = (
  wordType: OnlineSp.Commom.wordsType,
  pageNum: number,
  pageSize: number = 10,
) => {
  return getUploadedOnlineWordsListApi({
    pageNum,
    pageSize,
    rawFilename: wordType,
  });
};
export function useOnlineRequest() {
  return {
    getOnlineWordTypeOptionsApiFn,
    getUploadedOnlineWordsListApiFn,
  };
}
