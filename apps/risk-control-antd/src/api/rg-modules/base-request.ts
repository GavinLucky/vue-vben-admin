import type { ICustomOptions } from '#/api/rg-request';

import { stringify } from 'qs';

import { rgReqClient } from '#/api/rg-request';

export function doRequestFn(
  type: 'get' | 'post',
  uriPath: string,
  data: object | undefined = undefined,
  options: ICustomOptions = {},
) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      let [error, resp] = [undefined, undefined];
      if (type === 'get') {
        try {
          let urlPathWithQuery = uriPath;
          if (data) {
            const query = stringify(data);
            if (query) {
              urlPathWithQuery = `${uriPath}?${query}`;
            }
          }
          const getRes = await rgReqClient.get(urlPathWithQuery, {
            customOptions: options,
          } as any);
          resp = getRes;
        } catch (error_) {
          console.error(error_);
          error = error_;
        } finally {
          resolve([error, resp]);
        }
      } else {
        try {
          const postRes = await rgReqClient.post(uriPath, data, {
            customOptions: options,
          } as any);
          resp = postRes;
        } catch (error_) {
          console.error(error_);
          error = error_;
        } finally {
          resolve([error, resp]);
        }
      }
    });
  });
}
