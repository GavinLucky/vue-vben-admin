/**
 * 该文件可自行根据业务逻辑进行调整
 */

import type { HttpResponse, InternalAxiosRequestConfig } from '@vben/request';

import { useAppConfig } from '@vben/hooks';
import { preferences } from '@vben/preferences';
import {
  authenticateResponseInterceptor,
  errorMessageResponseInterceptor,
  RequestClient,
} from '@vben/request';
import { useAccessStore } from '@vben/stores';

import { message } from 'ant-design-vue';

import { useAuthStore } from '#/store';
import {
  encryptBase64,
  encryptWithAes,
  generateAesKey,
} from '#/utils/crypto-js-utils';
import { doEncrypt } from '#/utils/js-encrypt-utils';

import { refreshTokenApi } from './core';

interface ICustomOptions {
  /** 忽略请求是添加headers */
  ignoreAddHeader?: boolean;
  /** 请求开启加密 */
  encrypt?: boolean;
}
interface InternalAxiosRequestConfigWithCustomOptions
  extends InternalAxiosRequestConfig<any> {
  customOptions?: ICustomOptions;
}
const {
  rgApiUrl: rgUrl,
  clientId,
  enableEncrypt,
} = useAppConfig(import.meta.env, import.meta.env.PROD);
// const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);
// const rgUrl = import.meta.env.VITE_GLOB_API_RG_URL;
function createRequestClient(baseURL: string) {
  const client = new RequestClient({
    baseURL,
  });

  /**
   * 重新认证逻辑
   */
  async function doReAuthenticate() {
    console.warn('Access token or refresh token is invalid or expired. ');
    const accessStore = useAccessStore();
    const authStore = useAuthStore();
    accessStore.setAccessToken(null);
    if (
      preferences.app.loginExpiredMode === 'modal' &&
      accessStore.isAccessChecked
    ) {
      accessStore.setLoginExpired(true);
    } else {
      await authStore.logout();
    }
  }

  /**
   * 刷新token逻辑
   */
  async function doRefreshToken() {
    const accessStore = useAccessStore();
    const resp = await refreshTokenApi();
    const newToken = resp.data;
    accessStore.setAccessToken(newToken);
    return newToken;
  }

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config: InternalAxiosRequestConfigWithCustomOptions) => {
      const accessStore = useAccessStore();
      const { ignoreAddHeader = false, encrypt = false }: ICustomOptions =
        config?.customOptions || {};
      // 添加全局clientId
      config.headers.clientId = clientId;
      if (!ignoreAddHeader) {
        config.headers.Authorization = formatToken(accessStore.accessToken);
        config.headers['Accept-Language'] = preferences.app.locale?.replace(
          '-',
          '_',
        );
      }

      // 全局加密
      if (
        enableEncrypt &&
        encrypt &&
        ['get', 'post'].includes(config.method?.toLowerCase() || '')
      ) {
        const aesKey = generateAesKey();
        config.headers['encrypt-key'] = doEncrypt(encryptBase64(aesKey));
        console.log('url path:', config.url, 'data', config.data);
        config.data =
          typeof config.data === 'object'
            ? encryptWithAes(JSON.stringify(config.data), aesKey)
            : encryptWithAes(config.data, aesKey);
      }
      return config;
    },
  });

  // response数据解构
  client.addResponseInterceptor<HttpResponse>({
    fulfilled: (response) => {
      const { data: responseData, status } = response;
      const { code = undefined, data } = responseData;
      if (status >= 200 && status < 400 && code === 200) {
        // 兼容返回的数据结构
        return data || responseData;
      }

      throw Object.assign({}, response, { response });
    },
  });

  // token过期的处理
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      enableRefreshToken: preferences.app.enableRefreshToken,
      formatToken,
    }),
  );

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      // 这里可以根据业务进行定制,你可以拿到 error 内的信息进行定制化处理，根据不同的 code 做不同的提示，而不是直接使用 message.error 提示 msg
      // 当前mock接口返回的错误字段是 error 或者 message
      const responseData = error?.response?.data ?? {};
      const errorMessage = responseData?.error ?? responseData?.message ?? '';
      // 如果没有错误信息，则会根据状态码进行提示
      message.error(errorMessage || msg);
    }),
  );

  return client;
}

export const rgReqClient = createRequestClient(rgUrl);
export type { ICustomOptions };
// export const baseRequestClient = new RequestClient({ baseURL: apiURL });
