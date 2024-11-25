import { doRequestFn } from '#/api/rg-modules/base-request';

export function getOnlineWordTypeOptionsApi() {
  return doRequestFn<OnlineSp.Commom.wordsType[]>(
    'get',
    '/ugc/words/type',
    undefined,
    {},
  );
}
