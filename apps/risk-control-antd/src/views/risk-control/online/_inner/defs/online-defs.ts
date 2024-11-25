export namespace OnlineConstSp {
  export const wordsTypeLabelMap: Record<OnlineSp.Commom.wordsType, string> = {
    badwords: '黑名单-海外-中文',
    'badwords-cn': '黑名单-中国-中文',
    'badwords-en': '黑名单-全地区-英文',
    'badwords-ensp': '黑名单-全地区-中文拼音',
    'badwords-global': '黑名单-海外-全语言',
    whitewords: '白名单-全地区-全语言',
  };
  export namespace Enums {
    export enum UploadWordsFileItemEnum {
      kCreateDt = 'createDt',
      kFilename = 'filename',
      kFiletype = 'filetype',
      kId = 'id',
      kRawFilename = 'rawFilename',
      kReleaseDt = 'releaseDt',
      kReleaseStatus = 'releaseStatus',
      kReleaseUserId = 'releaseUserId',
      kReleaseUserName = 'releaseUserName',
      kRemark = 'remark',
      kUpdateDt = 'updateDt',
      kUserId = 'userId',
      kUserName = 'userName',
    }
  }
}
