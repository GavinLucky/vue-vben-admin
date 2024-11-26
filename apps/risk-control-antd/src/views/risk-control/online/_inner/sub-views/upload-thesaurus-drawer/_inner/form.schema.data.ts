import type { VbenFormSchema } from '#/adapter/form';

import { z } from '#/adapter/form';

const formSchemaDatas: VbenFormSchema[] = [
  {
    component: 'ASelect',
    fieldName: 'filetype',
    label: '词库类型',
    formItemClass: 'col-span-1 items-baseline cursor-default',
    defaultValue: '',
    componentProps: {
      options: [],
    },
    disabled: true,
  },
  {
    // 组件需要在 #/adapter.ts内注册，并加上类型
    component: 'Input',
    fieldName: 'uploadFileField',
    label: '文件上传',
    formItemClass: 'col-span-1 items-baseline',
    rules: z
      .array(z.object({}))
      .min(1, '必须选择一个文件')
      .max(1, '必须选择一个文件'),
  },
  {
    component: 'ATextarea',
    fieldName: 'remark',
    label: '备注',
    defaultValue: '',
    formItemClass: 'col-span-1 items-baseline',
    // renderComponentContent: () => ({
    //   prefix: () => 'prefix',
    //   suffix: () => 'suffix',
    // }),
  },
];
export { formSchemaDatas };
