import type { Recordable, UserInfo } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@vben/constants';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { notification } from 'ant-design-vue';
import { defineStore } from 'pinia';

import { logoutApi } from '#/api';
import {
  authLoginWithPsdApi,
  getLoginUserInfoApi,
} from '#/api/rg-modules/auth-api';
import { $t } from '#/locales';

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();
  /** 是否操作了401 */
  const doLogoutStatus = ref(false);
  const loginLoading = ref(false);

  function setDoLogoutStatus(status: boolean) {
    doLogoutStatus.value = status;
  }
  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   */
  async function authLogin(
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    let userInfo: null | UserInfo = null;
    try {
      loginLoading.value = true;
      const [loginErr, { access_token: accessToken }] =
        await authLoginWithPsdApi(params as RgApi.Auth.IAuthLoginReq);
      // debugger;
      if (loginErr) {
        // 登录失败
        throw new Error(loginErr);
      }
      // 如果成功获取到 accessToken
      if (accessToken) {
        accessStore.setAccessToken(accessToken);

        userInfo = await fetchUserInfo();
        /**
         * 设置用户信息
         */
        userStore.setUserInfo(userInfo);
        /**
         * 在这里设置权限
         */
        accessStore.setAccessCodes(userInfo.permissions);
        // userInfo = user.user;
        // // 获取用户信息并存储到 accessStore 中
        // const [fetchUserInfoResult, accessCodes] = await Promise.all([
        //   fetchUserInfo(),
        //   getAccessCodesApi(),
        // ]);

        // userInfo = fetchUserInfoResult;

        // accessStore.setAccessCodes([]);

        if (accessStore.loginExpired) {
          accessStore.setLoginExpired(false);
        } else {
          onSuccess
            ? await onSuccess?.()
            : await router.push(userInfo?.homePath || DEFAULT_HOME_PATH);
        }
        setDoLogoutStatus(false);
        if (userInfo?.realName) {
          notification.success({
            description: `${$t('authentication.loginSuccessDesc')}:${userInfo?.realName}`,
            duration: 3,
            message: $t('authentication.loginSuccess'),
          });
        }
      }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function logout(redirect: boolean = true) {
    try {
      await logoutApi();
    } catch {
      // 不做任何处理
    }
    resetAllStores();
    accessStore.setLoginExpired(false);

    // 回登录页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  async function fetchUserInfo(vUserinfo?: RgApi.Auth.ILoginUserInfoResp) {
    const userInfo: null | RgApi.User.IUserInfo = null;
    if (vUserinfo) {
      const { user } = vUserinfo;
      if (user) {
        userStore.setUserInfo(user as any);
        return userInfo;
      }
    }
    const [err, backUserInfoResp] = await getLoginUserInfoApi();
    if (err) {
      if (err?.code === 401) {
        // token过期
        // throw new Error('获取用户信息失败.');
        // return null;
      }
      return null;
    } else {
      const { permissions = [], roles = [], user } = backUserInfoResp;
      /**
       * 从后台user -> vben user转换
       */
      const userInfo: UserInfo = {
        ...user,
        avatar: user.avatar ?? '',
        permissions,
        realName: user.nickName,
        roles,
        userId: `${user.userId}`,
        username: user.userName,
      };
      userStore.setUserInfo(userInfo);
      return userInfo;
    }
    // userInfo = await getUserInfoApi();
    // userStore.setUserInfo(userInfo);
    // return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
    doLogoutStatus,
    setDoLogoutStatus,
  };
});
