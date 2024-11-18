/** 登录认证相关 */

import { doRequestFn } from '#/api/rg-modules/base-request';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return doRequestFn<RgApi.Menu.IMenu[]>('get', '/system/menu/getRouters');
}
