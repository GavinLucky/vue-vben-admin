// export { __APP_BUILD_TIME__, __APP_VERSION__, __VBEN_ADMIN_METADATA__ };
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
