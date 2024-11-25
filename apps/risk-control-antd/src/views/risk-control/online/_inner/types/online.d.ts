declare namespace OnlineSp {
  export namespace Commom {
    type wordsType =
      | 'badwords'
      | 'badwords-cn'
      | 'badwords-en'
      | 'badwords-ensp'
      | 'badwords-global'
      | 'whitewords';
  }
  export namespace RawItem {
    interface IUploadWordsFileItem {
      id: number;
      filename: string;
      filetype: string;
      releaseStatus: number;
      rawFilename: string;
      userId: number;
      userName: null | string;
      releaseUserId: null | number;
      releaseUserName: null | string;
      releaseDt: null | string;
      createDt: string;
      updateDt: string;
      remark: string;
    }
    interface IReleaseLogItem {
      id: number;
      lastReleaseId: number;
      releaseId: number;
      rawFilename: string;
      wordsDiff: string;
      remark: string;
      userId: number;
      userName: null | string;
      createTime: string;
      wordsDiffMap: {
        add: string[];
        del: string[];
      };
    }
  }
}
