import type { RouteRecordRaw } from 'vue-router';

const devRoutes: RouteRecordRaw[] = [
  {
    component: 'BasicLayout',
    meta: {
      icon: 'dashicons:feedback',
      keepAlive: true,
      order: 1000,
      title: '敏感词库',
    },
    name: '_library.sensitive.words',
    path: '/library.sensitive.words',
    children: [
      {
        meta: {
          icon: 'mdi:clipboard-arrow-top-outline',
          title: '词库上线',
        },
        name: '_library.sensitive.words_online',
        path: 'online',
        component: '/risk-control/online/index.vue',
      },
    ],
  },
];

export default devRoutes;
