import type { RouteMeta as IRouteMeta } from '@vben-core/typings';

import 'vue-router';

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RouteMeta extends IRouteMeta {}
}

export interface VbenAdminProAppConfigRaw {
  VITE_GLOB_API_URL: string;
  VITE_GLOB_API_RG_URL: string;
  // 客户端ID
  VITE_GLOB_APP_CLIENT_ID: string;
  // # 全局加密开关(即开启了加解密功能才会生效 不是全部接口加密 需要和后端对应)
  VITE_GLOB_ENABLE_ENCRYPT: string;
  // RSA请求解密私钥
  VITE_GLOB_RSA_PRIVATE_KEY: string;
  // RSA请求加密公钥
  VITE_GLOB_RSA_PUBLIC_KEY: string;
  // 是否开启websocket  注意从配置文件获取的类型为string
  VITE_GLOB_WEBSOCKET_ENABLE: string;
}

export interface ApplicationConfig {
  apiURL: string;
  rgApiUrl: string;
  // 客户端key
  clientId: string;
  // 全局加密开关(即开启了加解密功能才会生效 不是全部接口加密 需要和后端对应)
  enableEncrypt: boolean;
  // RSA响应解密私钥
  rsaPrivateKey: string;
  // RSA请求加密公钥
  rsaPublicKey: string;
  // 是否开启websocket
  websocketEnable: boolean;
}

declare global {
  /** 构建版本 */
  export declare const __APP_VERSION__: string;
  /** 构建时间 */
  export declare const __APP_BUILD_TIME__: string;
  /** metadata 定义 */
  export declare const __VBEN_ADMIN_METADATA__: string;

  interface Window {
    _VBEN_ADMIN_PRO_APP_CONF_: VbenAdminProAppConfigRaw;
  }
}
