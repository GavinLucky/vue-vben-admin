import type { ICustomOptions } from '#/api/rg-request';

import { isString } from '@vben/utils';

import { stringify } from 'qs';

import { rgReqClient } from '#/api/rg-request';

export function doRequestFn<T>(
  type: 'delete' | 'get' | 'post' | 'put',
  uriPath: string,
  data: object | string | undefined = undefined,
  options: ICustomOptions = {},
) {
  return new Promise<RgApi.Base.TupleResp<T, RgApi.Base.ServerDataType<any>>>(
    (resolve) => {
      setTimeout(async () => {
        let [error, resp]:
          | [undefined, undefined]
          | RgApi.Base.TupleResp<T, Error> = [undefined, undefined];
        if (type === 'get') {
          try {
            let urlPathWithQuery = uriPath;
            if (data) {
              const query = stringify(data);
              if (query) {
                urlPathWithQuery = `${uriPath}?${query}`;
              }
            }
            const getRes: T | undefined = await rgReqClient.get<T>(
              urlPathWithQuery,
              {
                customOptions: options,
              } as any,
            );
            resp = getRes;
            resolve([error, resp] as [undefined, T]);
          } catch (error_) {
            console.error(error_);
            error = error_ as RgApi.Base.ServerDataType;
            resolve([error, resp] as RgApi.Base.TupleResp);
          }
        } else {
          try {
            // 兼容restful风格 put delete 改造
            let tempData = data;
            let tempUriPath = uriPath;
            if (isString(data)) {
              tempUriPath = `${uriPath}${data}`;
              tempData = undefined;
            }
            const otherRes = await rgReqClient[type]<T>(tempUriPath, tempData, {
              customOptions: options,
            } as any);
            resp = otherRes;
            resolve([error, resp] as [undefined, T]);
          } catch (error_) {
            console.error(error_);
            error = error_ as RgApi.Base.ServerDataType;
            resolve([error, resp] as RgApi.Base.TupleResp);
          }
        }
      });
    },
  );
}

export function doUploadRequestFn(
  uriPath: string,
  data: { file: Blob | File } & Record<string, any>,
  options: ICustomOptions = {},
) {
  return new Promise(() => {
    setTimeout(async () => {
      rgReqClient.upload(uriPath, data, options).then().catch();
    });
  });
}
