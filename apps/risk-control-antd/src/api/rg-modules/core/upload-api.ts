import { doUploadRequestFn } from '#/api/rg-modules/base-request';

export function updateFileToOssApi(file: Blob | File) {
  return doUploadRequestFn('/resource/oss/upload', { file });
}
