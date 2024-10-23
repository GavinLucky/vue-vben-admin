// / <reference types="vite/client" />
export {};
// vite define 生成的全局变量，生产模式，在 js 代码引用出使用字符串静态替换
declare global {
  /** 构建版本 */
  export declare const __APP_VERSION__: string;
  /** 构建时间 */
  export declare const __APP_BUILD_TIME__: string;
  /** metadata 定义 */
  export declare const __VBEN_ADMIN_METADATA__: string;
}

declare interface ImportMetaEnv {
  /* # 应用命名空间，用于缓存、store等功能的前缀，确保隔离*/
  VITE_APP_NAMESPACE: string;

  /* # 应用标题*/
  VITE_APP_TITLE: string;
  /** # 打包后是否生成dist.zip */
  VITE_ARCHIVER: boolean;

  /** # 资源公共路径,需要以 / 开头和结尾*/
  VITE_BASE: string;

  /** # 是否开启压缩，可以设置为 none, brotli, gzip */
  VITE_COMPRESS: boolean;

  /** # 是否打开 devtools，true 为打开，false 为关闭 */
  VITE_DEVTOOLS: boolean;

  /** # 接口地址 */
  VITE_GLOB_API_URL: string;

  /** # 是否注入全局loading */
  VITE_INJECT_APP_LOADING: boolean;

  /** # 是否开启 Nitro Mock服务，true 为开启，false 为关闭*/
  VITE_NITRO_MOCK: boolean;

  /* # 端口号*/
  VITE_PORT: string;

  /**  # 是否开启 PWA */
  VITE_PWA: boolean;
}
declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
