import {
  getOnlineReleaseLogsApi,
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
    filetype: wordType,
  });
};
const getOnlineReleaseLogsApiFn = (
  wordType: OnlineSp.Commom.wordsType,
  pageIndex: number,
  pageSize: number,
) => {
  return getOnlineReleaseLogsApi({
    filetype: wordType,
    pageNum: pageIndex,
    pageSize,
  });
};
export function useOnlineRequest() {
  return {
    getOnlineWordTypeOptionsApiFn,
    getUploadedOnlineWordsListApiFn,
    getOnlineReleaseLogsApiFn,
  };
}
