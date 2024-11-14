/** 登录认证相关 */
import { doRequestFn } from '#/api/rg-modules/base-request';

export function getAuthCodeApi(): Promise<[any, any]> {
  return doRequestFn('get', '/auth/code', undefined, {
    ignoreAddHeader: true,
  }) as any;
}

export function authLoginWithPsdApi(
  params: RgApi.Auth.IAuthLoginReq,
): Promise<[any, any]> {
  return doRequestFn('post', '/auth/login', params) as any;
}

export function getLoginUserInfoApi() {
  return doRequestFn('get', '/auth/info', undefined, undefined) as any;
}
