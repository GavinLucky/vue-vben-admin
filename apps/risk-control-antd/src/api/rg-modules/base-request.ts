import type { ICustomOptions } from '#/api/rg-request';

import { stringify } from 'qs';

import { rgReqClient } from '#/api/rg-request';

export function doRequestFn<T>(
  type: 'get' | 'post',
  uriPath: string,
  data: object | undefined = undefined,
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
            const postRes = await rgReqClient.post<T>(uriPath, data, {
              customOptions: options,
            } as any);
            resp = postRes;
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
