import { buildUUID } from '@vben/utils';

import { doRequestFn, doUploadRequestFn } from '#/api/rg-modules/base-request';

enum profileApiPath {
  root = '/system/user/profile',
  updateAvatar = '/system/user/profile/avatar',
  updatePassword = '/system/user/profile/updatePwd',
}

/**
 * 用户个人主页信息
 * @returns userInformation
 */
export function userProfile() {
  return doRequestFn<RgApi.Profile.IProfileUser>('get', profileApiPath.root);
}

/**
 * 更新用户个人主页信息
 * @param data
 * @returns void
 */
export function userProfileUpdate(data: any) {
  console.log('data', data);
  return doRequestFn<RgApi.Profile.IProfileUser>(
    'put',
    profileApiPath.root,
    data,
  );
}

/**
 * 用户修改密码 (需要加密)
 * @param data
 * @returns void
 */
export function userUpdatePassword(data: RgApi.Profile.IUpdatePasswordReq) {
  return doRequestFn<RgApi.Profile.IProfileUser>(
    'put',
    profileApiPath.updatePassword,
    data,
    {
      encrypt: true,
    },
  );
}

/**
 * 用户更新个人头像
 * @param fileCallback data
 * @returns void
 */
export function userUpdateAvatar(fileCallback: RgApi.Common.IUploadFile) {
  /** 直接点击头像上传 filename为空 由于后台通过拓展名判断(默认文件名blob) 会上传失败 */
  let { file } = fileCallback;
  let { filename } = fileCallback;
  if (!filename) {
    filename = `${buildUUID()}.png`;
  }
  /**
   * Blob转File类型
   * 1. 在直接点击确认 filename为空 取uuid作为文件名
   * 2. 选择上传必须转为File类型 Blob类型上传后台获取文件名为空
   */
  file = new File([file], filename);

  return doUploadRequestFn(profileApiPath.updateAvatar, {
    avatarfile: file,
    fileName: filename,
  } as any);
}
