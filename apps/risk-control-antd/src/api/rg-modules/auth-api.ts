/** 登录认证相关 */
import { doRequestFn } from '#/api/rg-modules/base-request';

export function getAuthCodeApi() {
  return doRequestFn<RgApi.Auth.IAuthCodeResp>('get', '/auth/code', undefined, {
    ignoreAddHeader: true,
  });
}

export function authLoginWithPsdApi(
  params: RgApi.Auth.IAuthLoginReq,
): Promise<[any, any]> {
  return doRequestFn('post', '/auth/login', params);
}

export function getLoginUserInfoApi() {
  return doRequestFn('get', '/auth/info', undefined, undefined) as any;
}
