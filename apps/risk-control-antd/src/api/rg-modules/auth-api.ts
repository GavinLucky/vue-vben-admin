import { useAppConfig } from '@vben/hooks';

/** 登录认证相关 */
import { doRequestFn } from '#/api/rg-modules/base-request';

const { clientId } = useAppConfig(import.meta.env, import.meta.env.PROD);

export function getAuthCodeApi() {
  return doRequestFn<RgApi.Auth.IAuthCodeResp>('get', '/auth/code', undefined, {
    ignoreAddHeader: true,
  });
}

export function authLoginWithPsdApi(
  params: RgApi.Auth.IAuthLoginReq,
): Promise<[any, any]> {
  params.tenantId = '000000';
  params.clientId = clientId;
  return doRequestFn('post', '/auth/login', params, { encrypt: true });
}

export function getLoginUserInfoApi() {
  return doRequestFn('get', '/auth/info', undefined, undefined) as any;
}
