/** 用户相关 api*/

import { doRequestFn } from '#/api/rg-modules/base-request';

export function getUserInfoApi(): Promise<[any, any]> {
  return doRequestFn('get', '/auth/code', undefined, {
    ignoreAddHeader: true,
  }) as any;
}
