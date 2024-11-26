import { doUploadRequestFn } from '#/api/rg-modules/base-request';
import {
  doReleaseVersionApi,
  getDiffWithOnlineWordsVersionApi,
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

const uploadWordFileApiFn = (
  file: Blob,
  wordstype: OnlineSp.Commom.wordsType,
  remark: string = '',
) => {
  return doUploadRequestFn('/ugc/words/upload', {
    file,
    filetype: wordstype,
    remark,
  } as any);
};

const doReleaseVersionApiFn = (uploadId: number, reason: string) => {
  return doReleaseVersionApi({
    uploadId,
    remark: reason,
  });
};

const getDiffWithOnlineWordsVersionApiFn = (uploadId: number) => {
  return getDiffWithOnlineWordsVersionApi({ uploadId });
};

export function useOnlineRequest() {
  return {
    getOnlineWordTypeOptionsApiFn,
    getUploadedOnlineWordsListApiFn,
    getOnlineReleaseLogsApiFn,
    uploadWordFileApiFn,
    doReleaseVersionApiFn,
    getDiffWithOnlineWordsVersionApiFn,
  };
}
