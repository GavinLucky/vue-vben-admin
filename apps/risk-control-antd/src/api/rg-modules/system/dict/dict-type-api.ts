import { doRequestFn } from '#/api/rg-modules/base-request';

enum dictTypeApi {
  dictOptionSelectList = '/system/dict/type/optionselect',
  dictTypeExport = '/system/dict/type/export',
  dictTypeList = '/system/dict/type/list',
  dictTypeRefreshCache = '/system/dict/type/refreshCache',
  root = '/system/dict/type',
}

/**
 * 获取字典类型列表
 * @param params 请求参数
 * @returns list
 */
export function dictTypeList(params?: RgApi.Pagination.IPageQuery) {
  return doRequestFn<RgApi.Pagination.IPageResult<RgApi.Dict.IDictType>>(
    'get',
    dictTypeApi.dictTypeList,
    { params },
  );
}

/**
 * 导出字典类型列表
 * @param data 表单参数
 * @returns blob
 */
export function dictTypeExport(data: any) {
  console.log('data', data);
  // return commonExport(dictTypeApi.dictTypeExport, data);
}

/**
 * 删除字典类型
 * @param dictIds 字典类型id数组
 * @returns void
 */
export function dictTypeRemove(dictIds: (number | string)[]) {
  console.log('dictIds', dictIds);
  return doRequestFn('delete', `${dictTypeApi.root}/${dictIds}`);
}

/**
 * 刷新字典缓存
 * @returns void
 */
export function refreshDictTypeCache() {
  return doRequestFn('delete', dictTypeApi.dictTypeRefreshCache);
}

/**
 * 新增
 * @param data 表单参数
 * @returns void
 */
export function dictTypeAdd(data: any) {
  return doRequestFn<any>('post', dictTypeApi.root, data);
  // return requestClient.postWithMsg<void>(dictTypeApi.root, data);
}

/**
 * 修改
 * @param data 表单参数
 * @returns void
 */
export function dictTypeUpdate(data: any) {
  return doRequestFn<any>('put', dictTypeApi.root, data);
  // return requestClient.putWithMsg<void>(dictTypeApi.root, data);
}

/**
 * 查询详情
 * @param dictId 字典类型id
 * @returns 信息
 */
export function dictTypeInfo(dictId: number | string) {
  return doRequestFn<any>('get', `${dictTypeApi.root}/${dictId}`);
  // return requestClient.get<DictType>(`${dictTypeApi.root}/${dictId}`);
}

/**
 * 下拉框  返回值和list一样
 * @returns options
 */
export function dictOptionSelectList() {
  return doRequestFn<any>('get', dictTypeApi.dictOptionSelectList);
  // return requestClient.get<DictType[]>(dictTypeApi.dictOptionSelectList);
}
