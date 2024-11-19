import { useAppConfig } from '@vben/hooks';

/** 登录认证相关 */
import { doRequestFn } from '#/api/rg-modules/base-request';

const { clientId } = useAppConfig(import.meta.env, import.meta.env.PROD);

export function getAuthCaptchaImageApi() {
  return doRequestFn<RgApi.Auth.IAuthCodeResp>('get', '/auth/code', undefined, {
    ignoreAddHeader: true,
  });
}

export function authLoginWithPsdApi(
  params: RgApi.Auth.IAuthLoginReq,
): Promise<[any, any]> {
  // 写死的租户id
  params.tenantId = '000000';
  params.clientId = clientId;
  return doRequestFn<RgApi.Auth.IAuthLoginResp>('post', '/auth/login', params, {
    encrypt: true,
  });
}

export function getLoginUserInfoApi() {
  return doRequestFn<RgApi.Auth.ILoginUserInfoResp>(
    'get',
    '/system/user/getInfo',
    undefined,
    {
      errorMessageMode: 'none',
    },
  );
}
