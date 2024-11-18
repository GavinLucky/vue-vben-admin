import { doRequestFn } from '#/api/rg-modules/base-request';

enum dictDataApi {
  dictDataExport = '/system/dict/data/export',
  dictDataList = '/system/dict/data/list',
  root = '/system/dict/data',
}

/**
 * 主要是DictTag组件使用
 * @param dictType 字典类型
 * @returns 字典数据
 */
export function dictDataInfo(dictType: string) {
  return doRequestFn<RgApi.Dict.IDictData[]>(
    'get',
    `${dictDataApi.root}/type/${dictType}`,
  );
}

/**
 * 字典数据
 * @param params 查询参数
 * @returns 字典数据列表
 */
export function dictDataList(params?: RgApi.Pagination.IPageQuery) {
  return doRequestFn<RgApi.Dict.IDictData[]>('get', dictDataApi.dictDataList, {
    params,
  });
}

/**
 * 导出字典数据
 * @param data 表单参数
 * @returns blob
 */
export function dictDataExport(data: any) {
  console.log('data', data);
  // TODO ::通用下载封装
  // return commonExport(dictDataApi.dictDataExport, data);
}

/**
 * 删除
 * @param dictIds 字典ID Array
 * @returns void
 */
export function dictDataRemove(dictIds: (number | string)[]) {
  console.log('dictIds', dictIds);
  // return requestClient.deleteWithMsg<void>(`${dictDataApi.root}/${dictIds}`);
}

/**
 * 新增
 * @param data 表单参数
 * @returns void
 */
export function dictDataAdd(data: any) {
  return doRequestFn<any>('post', dictDataApi.root, data);
}

/**
 * 修改
 * @param data 表单参数
 * @returns void
 */
export function dictDataUpdate(data: any) {
  return doRequestFn<any>('post', dictDataApi.root, data);
}

/**
 * 查询字典数据详细
 * @param dictCode 字典编码
 * @returns 字典数据
 */
export function dictDetailInfo(dictCode: number | string) {
  return doRequestFn<RgApi.Dict.IDictData>(
    'get',
    `${dictDataApi.root}/${dictCode}`,
  );
}
