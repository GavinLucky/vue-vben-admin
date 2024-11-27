import type { RouteRecordStringComponent } from '@vben/types';

import { $t } from '@vben/locales';

/**
 * 该文件放非后台返回的路由 比如个人中心 等需要跳转显示的页面
 */

/**
 * 个人中心
 */
const profileRoute: RouteRecordStringComponent[] = [
  {
    component: 'BasicLayout',
    meta: {
      hideChildrenInMenu: true,
      hideInMenu: true,
      title: $t('ui.widgets.profile'),
    },
    name: '_profile',
    path: '/profile',
    redirect: '/profile/user-profile',
    children: [
      {
        component: '/_core/profile/index',
        meta: {
          icon: 'mingcute:profile-line',
          keepAlive: true,
          title: $t('ui.widgets.profile'),
        },
        name: 'profile_user-profileIndex',
        path: 'user-profile',
      },
    ],
  },
  {
    component: 'BasicLayout',
    meta: {
      hideChildrenInMenu: true,
      hideInMenu: true,
      title: 'oss配置',
    },
    name: 'OssConfig',
    path: '/system',
    redirect: '/system/oss-config',
    children: [
      {
        component: '/system/oss-config/index',
        meta: {
          activePath: '/system/oss',
          icon: 'ant-design:setting-outlined',
          keepAlive: true,
          title: 'oss配置',
        },
        name: 'OssConfigIndex',
        path: '/system/oss-config',
      },
    ],
  },
  {
    component: 'BasicLayout',
    meta: {
      hideChildrenInMenu: true,
      hideInMenu: true,
      title: '修改生成配置',
    },
    name: 'GenConfig',
    path: '/code-gen',
    redirect: '/code-gen/edit',
    children: [
      {
        component: '/tool/gen/edit-gen',
        meta: {
          activePath: '/tool/gen',
          icon: 'tabler:code',
          keepAlive: true,
          title: '生成配置',
        },
        name: 'GenConfigIndex',
        path: '/code-gen/edit/:tableId',
      },
    ],
  },
  {
    component: 'BasicLayout',
    meta: {
      hideChildrenInMenu: true,
      hideInMenu: true,
      title: '分配角色',
    },
    name: 'RoleAssign',
    path: '/system',
    redirect: '/system/role-assign',
    children: [
      {
        component: '/system/role-assign/index',
        meta: {
          activePath: '/system/role',
          icon: 'eos-icons:role-binding-outlined',
          keepAlive: true,
          title: '分配角色',
        },
        name: 'RoleAssignIndex',
        path: '/system/role-assign/:roleId',
      },
    ],
  },
];
/** 工具外链 */
const otherLinksMenuList: RouteRecordStringComponent[] = [
  {
    component: 'BasicLayout',
    meta: {
      badgeType: 'dot',
      icon: 'arcticons:moondrop-link',
      order: 9999,
      title: '工具链接',
    },
    name: '_tool-link',
    path: '/_tool-link',
    children: [
      {
        name: '_tool-link_tata-outer',
        path: 'tata-outer',
        component: 'IFrameView',
        meta: {
          link: 'https://bita.rivergame.net/',
          icon: 'svg:bita',
          title: '数数(外链)',
        },
      },
      {
        name: '_tool-link_tata-inner',
        path: 'tata-inner',
        component: 'IFrameView',
        meta: {
          iframeSrc: 'https://bita.rivergame.net/',
          icon: 'svg:bita',
          keepAlive: true,
          title: '数数(子tab页)',
        },
      },
      //
      {
        name: '_tool-link_bi-outer',
        path: 'bi-outer',
        component: 'IFrameView',
        meta: {
          icon: 'https://bi.rivergame.net/bi.datacenter/logo.png',
          link: 'https://bi.rivergame.net/',
          title: 'BI(外链)',
        },
      },
      {
        name: '_tool-link_bi-inner',
        path: 'bi-inner',
        component: 'IFrameView',
        meta: {
          icon: 'https://bi.rivergame.net/bi.datacenter/logo.png',
          iframeSrc: 'https://bi.rivergame.net/',
          keepAlive: true,
          title: 'BI(子tab页)',
        },
      },
    ],
  },
];

/**
 * 这里放本地路由
 */
export const localMenuList: RouteRecordStringComponent[] = [
  {
    component: 'BasicLayout',
    meta: {
      order: 1,
      title: 'page.dashboard.title',
    },
    name: 'Dashboard',
    path: '/dashboard',
    redirect: '/dashboard/analytics',
    children: [
      {
        name: 'Analytics',
        path: 'analytics',
        component: '/dashboard/analytics/index',
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: 'page.dashboard.analytics',
          order: 1,
        },
      },
      {
        name: 'Workspace',
        path: 'workspace',
        component: '/dashboard/workspace/index',
        meta: {
          icon: 'carbon:workspace',
          title: 'page.dashboard.workspace',
          order: 2,
        },
      },
    ],
  },
  // {
  //   component: 'BasicLayout',
  //   meta: {
  //     hideChildrenInMenu: true,
  //     icon: 'lucide:copyright',
  //     order: 9999,
  //     title: $t('demos.vben.about'),
  //   },
  //   name: 'About',
  //   path: '/about',
  //   children: [
  //     {
  //       component: '/_core/about/index',
  //       meta: {
  //         title: $t('demos.vben.about'),
  //       },
  //       name: 'VbenAbout',
  //       path: '/vben-admin/about',
  //     },
  //   ],
  // },
  ...profileRoute,
  // ...devRoutes,
  ...otherLinksMenuList,
];
