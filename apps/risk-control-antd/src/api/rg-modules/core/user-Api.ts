/** 用户相关 api*/

import { doRequestFn } from '#/api/rg-modules/base-request';

export function getUserInfoApi(): Promise<[any, any]> {
  return doRequestFn('get', '/system/user/getInfo', undefined, {
    ignoreAddHeader: true,
  }) as any;
}
