// import type { VxeGridProps } from '@vben/plugins/src/vxe-table/types';

import type { VxeGridProps } from '#/adapter/vxe-table';

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
    minWidth: 200,
    slots: { default: 'rawFilename' },
  },
  {
    field: OnlineConstSp.Enums.UploadWordsFileItemEnum.kUserName,
    title: '上传人',
    // slots: { default: 'avatar' },
    minWidth: 80,
  },
  {
    field: OnlineConstSp.Enums.UploadWordsFileItemEnum.kUpdateDt,
    title: '上传时间',
    minWidth: 120,
  },
  {
    field: OnlineConstSp.Enums.UploadWordsFileItemEnum.kRemark,
    title: '备注',
    minWidth: 200,
    // overflow: 'ellipsis',
    slots: {
      default: `default_slot_${OnlineConstSp.Enums.UploadWordsFileItemEnum.kRemark}`,
    },
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
    field: 'rawFilename',
    title: '上线文件名',
    // slots: { default: 'status' },
    minWidth: 100,
  },
  {
    field: 'userName',
    title: '上线人',
    // slots: { default: 'avatar' },
    minWidth: 80,
  },
  {
    field: OnlineConstSp.Enums.UploadWordsFileItemEnum.kRemark,
    title: '备注',
    minWidth: 200,
    overflow: 'hidden',
    showOverflow: false,
    slots: {
      default: `default_slot_${OnlineConstSp.Enums.UploadWordsFileItemEnum.kRemark}`,
    },
  },
  // {
  //   field: 'action',
  //   fixed: 'right',
  //   slots: { default: 'action' },
  //   title: '功能',
  //   resizable: false,
  //   width: 90,
  // },
];
export function useTableHooks() {
  return {
    onLineColumns,
    onlineLogsColumns,
  };
}
