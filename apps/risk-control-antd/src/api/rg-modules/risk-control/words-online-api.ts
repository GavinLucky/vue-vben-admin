import { doRequestFn } from '#/api/rg-modules/base-request';

export function getOnlineWordTypeOptionsApi() {
  return doRequestFn<OnlineSp.Commom.wordsType[]>(
    'get',
    '/ugc/words/type',
    undefined,
    {},
  );
}

export function getUploadedOnlineWordsListApi(
  params: RgApi.Online.IGetUploadedWordsFilesReq,
) {
  return doRequestFn<{
    rows: OnlineSp.RawItem.IUploadWordsFileItem[];
    total: number;
  }>('get', '/ugc/words/history', params, {});
}

export function getOnlineReleaseLogsApi(
  params: RgApi.Online.IGetWordsRelesedLogsReq,
) {
  return doRequestFn<{
    rows: OnlineSp.RawItem.IReleaseLogItem[];
    total: number;
  }>('get', '/ugc/words/releaseLog', params, {});
}

export function doReleaseVersionApi(params: {
  remark: string;
  uploadId: number;
}) {
  return doRequestFn<any>('post', '/ugc/words/release', params, {});
}

export function getDiffWithOnlineWordsVersionApi(params: { uploadId: number }) {
  return doRequestFn<{
    add: string[];
    del: string[];
  }>('get', '/ugc/words/diff', params, {});
}

export function getWordFileDownloadUrlApi(params: { uploadId: number }) {
  return doRequestFn<{ tokenId: string }>(
    'get',
    '/ugc/words/download',
    params,
    {},
  );
}
