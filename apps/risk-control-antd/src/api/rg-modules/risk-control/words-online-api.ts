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
