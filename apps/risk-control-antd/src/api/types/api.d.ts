declare namespace RgApi {
  namespace Base {
    type ServerDataType<T> = {
      code: number;
      data: null | T;
      msg: string;
    };
    type TupleResp<T = any, E extends Error | ServerDataType = any> =
      | [E, undefined]
      | [undefined, T];
  }
  namespace Common {
    /**
     * 登录类型
     * password 密码
     * sms 短信
     * social 第三方oauth
     * email 邮箱
     * xcx 小程序
     */
    type LoginGrantType = 'email' | 'password' | 'sms' | 'social' | 'xcx';
    interface IRole {
      dataScope: string;
      id: number;
      level: number;
      name: string;
    }

    interface IDept {
      id: number;
      name: string;
    }

    interface IJob {
      id: number;
      name: string;
    }
  }
  namespace Auth {
    interface IAuthCodeResp {
      captchaEnabled: boolean;
      uuid: string;
      img: string;
    }
    interface IAuthLoginReq {
      code: string;
      password: string;
      grantType: Common.LoginGrantType;
      username: string;
      uuid: string;
      tenantId?: string;
      clientId?: string;
    }

    interface ILoginUserInfoResp {
      authorities: Authority[];
      dataScopes: DataScope[]; // 这里是一个空数组，所以类型是空接口数组
      roles: string[];
      user: RgApi.User.IUserInfo;
    }
  }
  namespace User {
    interface IUserInfo {
      avatarName?: string;
      avatarPath?: string;
      createTime: string;
      dept: Common.IDept;
      email: string;
      enabled: boolean;
      gender: string;
      id: number;
      isAdmin: boolean;
      jobs: Common.IJob[];
      nickName: string;
      password: string;
      phone: string;
      pwdResetTime: string;
      roles: Common.IRole[];
      updateBy: string;
      updateTime: string;
      username: string;
    }
  }
}
