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
      flag: boolean;
      roleId: number;
      roleKey: string;
      roleName: string;
      roleSort: number;
      status: string;
      superAdmin: boolean;
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
    interface IAuthLoginResp {
      scope: null | string;
      openid: null | string;
      access_token: string;
      refresh_token: null | string;
      expire_in: string;
      refresh_expire_in: null;
      client_id: string;
    }
    interface ILoginUserInfoResp {
      permissions: string[]; // 这里是一个空数组，所以类型是空接口数组
      roles: string[];
      user: RgApi.User.IUserInfo;
    }
  }
  namespace User {
    interface IUserInfo {
      avatar: string;
      createTime: string;
      deptId: number;
      deptName: string;
      email: string;
      loginDate: string;
      loginIp: string;
      nickName: string;
      phonenumber: string;
      remark: string;
      roles: Common.IRole[];
      sex: string;
      status: string;
      tenantId: string;
      userId: number;
      userName: string;
      userType: string;
    }
  }
}
