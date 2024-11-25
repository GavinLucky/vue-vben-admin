import type { VxeGridProps } from '@vben/plugins/src/vxe-table/types';

import { OnlineConstSp } from '#/views/risk-control/online/_inner/defs/online-defs';

const onLineColumns: VxeGridProps['columns'] = [
  {
    field: OnlineConstSp.Enums.UploadWordsFileItemEnum.kFiletype,
    title: '词库ID',
    minWidth: 80,
  },
  {
    field: OnlineConstSp.Enums.UploadWordsFileItemEnum.kId,
    title: '文件id',
    minWidth: 80,
  },
  {
    field: OnlineConstSp.Enums.UploadWordsFileItemEnum.kRawFilename,
    title: '文件名称',
    minWidth: 130,
  },
  {
    field: OnlineConstSp.Enums.UploadWordsFileItemEnum.kUserName,
    title: '上传人',
    slots: { default: 'avatar' },
    minWidth: 80,
  },
  {
    field: OnlineConstSp.Enums.UploadWordsFileItemEnum.kUpdateDt,
    title: '上传时间',
    minWidth: 120,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '功能',
    resizable: false,
    width: 120,
  },
];
// 上线记录
const onlineLogsColumns = [
  {
    field: 'createTime',
    title: '上线时间',
    minWidth: 150,
  },
  {
    field: 'status',
    title: '上线状态',
    slots: { default: 'status' },
    minWidth: 100,
  },
  {
    field: 'user',
    title: '上线人',
    // slots: { default: 'avatar' },
    minWidth: 80,
  },
  {
    field: 'desp',
    title: '上线说明',
    slots: { default: 'status' },
    minWidth: 100,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '功能',
    resizable: false,
    width: 90,
  },
];
export function useTableHooks() {
  return {
    onLineColumns,
    onlineLogsColumns,
  };
}
