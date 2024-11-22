import type { VxeGridProps } from '@vben/plugins/src/vxe-table/types';

const onLineColumns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    field: 'name',
    title: '名称',
    minWidth: 80,
  },
  {
    field: 'nickName',
    title: '昵称',
    minWidth: 130,
  },
  {
    field: 'avatar',
    title: '头像',
    slots: { default: 'avatar' },
    minWidth: 80,
  },
  {
    field: 'deptName',
    title: '部门',
    minWidth: 120,
  },
  {
    field: 'phonenumber',
    title: '手机号',
    formatter({ cellValue }) {
      return cellValue || '暂无';
    },
    minWidth: 120,
  },
  {
    field: 'status',
    title: '状态',
    slots: { default: 'status' },
    minWidth: 100,
  },
  {
    field: 'createTime',
    title: '创建时间',
    minWidth: 150,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 180,
  },
];
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
    title: '创建人',
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
    title: '操作',
    resizable: false,
    width: 180,
  },
];
export function useTableHooks() {
  return {
    onLineColumns,
    onlineLogsColumns,
  };
}
