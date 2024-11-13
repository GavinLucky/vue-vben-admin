import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: 'RC',
  },
  theme: {
    builtinType: 'default',
    // colorDestructive: 'hsl(348 100% 61%)',
    // colorPrimary: 'hsl(212 100% 45%)',
    // colorSuccess: 'hsl(144 57% 58%)',
    // colorWarning: 'hsl(42 84% 61%)',
    mode: 'light',
    radius: '0.5',
    semiDarkHeader: false,
    semiDarkSidebar: false,
  },
  copyright: {
    settingShow: false,
    companyName: '@RiverGame',
    companySiteLink: '',
    date: '2024',
    icp: '',
    icpLink: '',
  },
});
