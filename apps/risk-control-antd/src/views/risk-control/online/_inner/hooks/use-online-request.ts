import { doUploadRequestFn } from '#/api/rg-modules/base-request';
import {
  doReleaseVersionApi,
  getDiffWithOnlineWordsVersionApi,
  getOnlineReleaseLogsApi,
  getOnlineWordTypeOptionsApi,
  getUploadedOnlineWordsListApi,
  getWordFileDownloadUrlApi,
} from '#/api/rg-modules/risk-control/words-online-api';

const getOnlineWordTypeOptionsApiFn = () => {
  return getOnlineWordTypeOptionsApi();
};
const getUploadedOnlineWordsListApiFn = (
  wordType: OnlineSp.Commom.wordsType,
  pageNum: number,
  pageSize: number = 10,
  filterMap: any = {},
) => {
  return getUploadedOnlineWordsListApi({
    pageNum,
    pageSize,
    filetype: wordType,
    ...filterMap,
  });
};
const getOnlineReleaseLogsApiFn = (
  wordType: OnlineSp.Commom.wordsType,
  pageIndex: number,
  pageSize: number,
  filtMap: Record<any, any> = {},
) => {
  return getOnlineReleaseLogsApi({
    filetype: wordType,
    pageNum: pageIndex,
    pageSize,
    ...filtMap,
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
/** 获取文件下载地址tokenId */
const getWordFileDownloadUrlApiFn = (uploadId: number) => {
  return getWordFileDownloadUrlApi({ uploadId });
};

export function useOnlineRequest() {
  return {
    getOnlineWordTypeOptionsApiFn,
    getUploadedOnlineWordsListApiFn,
    getOnlineReleaseLogsApiFn,
    uploadWordFileApiFn,
    doReleaseVersionApiFn,
    getDiffWithOnlineWordsVersionApiFn,
    getWordFileDownloadUrlApiFn,
  };
}
