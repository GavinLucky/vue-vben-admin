<script setup lang="ts">
import type { VbenFormProps } from '#/adapter/form';

import { EllipsisText } from '@vben/common-ui';
import { useAppConfig } from '@vben/hooks';
import { ArcticonsMgrOnline, Copy, HugeiconFileExport } from '@vben/icons';

import { useClipboard } from '@vueuse/core';
import { message } from 'ant-design-vue';

import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';
import { filterValidValueMap } from '#/utils/array-utils';
import { downloadByUrl } from '#/utils/file/download';
import { useOnlineCtx } from '#/views/risk-control/online/_inner/hooks/use-online-ctx';
import { useOnlineRequest } from '#/views/risk-control/online/_inner/hooks/use-online-request';

defineOptions({
  name: 'OnlineVerListTableViewComp',
});
interface IProps {
  columns: Record<any, any>[];
  title: string;
}
// eslint-disable-next-line vue/define-macros-order
const { columns = [], title = '' } = defineProps<IProps>();

const { emitterComputed, choosedWordTypeIndexComputed } = useOnlineCtx();
const { copy, copied, isSupported } = useClipboard();
const { getUploadedOnlineWordsListApiFn, getWordFileDownloadUrlApiFn } =
  useOnlineRequest();
const uploadBtnClickFn = () => {
  emitterComputed.value.emit('emitUpload');
};
const { rgApiUrl: rgUrl } = useAppConfig(import.meta.env, import.meta.env.PROD);

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    // 点击行选中
    trigger: 'default',
    checkMethod: ({ row }) => row?.userId !== 1,
  },
  columns,
  minHeight: 150,
  maxHeight: '100%',
  // height: 'auto',
  keepSource: true,
  pagerConfig: {
    // total: 100,
    // currentPage: 2,
    pageSize: 10,
  },
  proxyConfig: {
    autoLoad: true,
    ajax: {
      query: async ({ page }, formValues = {}) => {
        // 部门树选择处理
        // debugger;
        console.log('formValue', page, formValues);
        // const list = [];
        // for (let i = 0; i < page.pageSize; i++) {
        //   list.push({ id: i, name: i, user: i });
        // }
        const filter = filterValidValueMap(formValues);
        const [err, resp] = await getUploadedOnlineWordsListApiFn(
          choosedWordTypeIndexComputed!.value,
          page.currentPage,
          page.pageSize,
          filter,
        );
        if (err) {
          message.error(err.msg || '获取失败，请稍后重试');
          return {
            total: 0,
            items: [],
          };
        } else {
          const { total, rows } = resp;
          return {
            total,
            items: rows,
          };
        }
      },
    },
  },
  rowConfig: {
    isHover: true,
    // keyField: 'userId',
    // height: 48,
  },
};

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'ARangePicker',
      fieldName: 'time',
      label: '上传时间',
    },
    {
      component: 'AInput',
      fieldName: 'userName',
      label: '上传人',
    },
    {
      component: 'AInput',
      fieldName: 'rawFilename',
      label: '文件名称',
    },
  ],
  fieldMappingTime: [
    [
      'time',
      ['params[beginTime]', 'params[endTime]'],
      // ['YYYY-MM-DD', 'YYYY-MM-DD'],
      ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
    ],
  ],
  resetButtonOptions: {
    size: 'small',
  },
  submitButtonOptions: {
    size: 'small',
  },
  // 控制表单是否显示折叠按钮
  showCollapseButton: false,
  // 按下回车时是否提交表单
  submitOnEnter: false,
  // 中屏一行显示2个，小屏一行显示1个
  wrapperClass:
    'sm:max-md:max-w-[520px]  sm:max-md:m-auto md:w-full grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4',
};

const releaseBtnClickFn = async (row: Record<any, any>) => {
  console.log('releaseBtnClickFn', row);
  emitterComputed.value.emit('emitOnlineReleaseAction', row);
};
const downloadWordFileFn = async (row: Record<any, any>) => {
  row.loading = true;

  const [err, urlTokenResp] = await getWordFileDownloadUrlApiFn(row.id);
  if (err) {
    message.error(err.msg || '获取下载链接失败');
    row.loading = false;
  } else {
    const { tokenId } = urlTokenResp;
    const url = `${rgUrl}/ugc/words/downloadFile?tokenId=${tokenId}`;
    downloadByUrl({
      url,
      target: '_blank',
    });
    message.success('已经添加浏览器下载');
  }
  row.loading = false;
};
const copyBtnClickFn = async (row: Record<any, any>) => {
  console.log('row', row);
  await copy(row.remark);
  if (copied.value) {
    message.success('已成功复制剪贴板');
  } else {
    message.error('复制失败');
  }
};

const [BasicTable, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    // checkboxChange: tableCheckboxEvent(checked),
    // checkboxAll: tableCheckboxEvent(checked),
  },
});
defineExpose({
  refeshListFn: () => {
    gridApi.reload();
  },
});
</script>

<template>
  <div class="flex h-full flex-col">
    <BasicTable
      :table-title="`${title}--上传列表`"
      class="flex-1 overflow-hidden"
    >
      <template #form-category>form</template>
      <template #toolbar-tools>
        <a-button size="small" type="primary" @click="uploadBtnClickFn">
          上传词表
        </a-button>
      </template>

      <template #rawFilename="{ row, column }">
        <div class="flex w-full flex-row">
          <div>{{ row[column.field] }}</div>
          <div class="pl-1">
            <a-tag v-if="row.releaseStatus === 2" color="success">
              当前线上版本
            </a-tag>
            <a-tag v-if="row.releaseStatus === 1" color="processing">
              正在发布版本
            </a-tag>
          </div>
        </div>
      </template>

      <template #default_slot_remark="{ row, column }">
        <div class="w-full max-w-full overflow-x-hidden">
          <div class="flex flex-row items-center justify-between">
            <div class="flex-1 overflow-x-hidden">
              <EllipsisText :line="1" :tooltip-max-width="800" class="w-full">
                {{ row[column.field] }}
              </EllipsisText>
            </div>
            <div class="flex flex-none flex-row items-center justify-center">
              <a-button
                v-if="isSupported"
                shape="circle"
                size="small"
                type="link"
                @click="copyBtnClickFn(row)"
              >
                <template #icon>
                  <Copy class="h-full w-full p-1" />
                </template>
              </a-button>
            </div>
          </div>
        </div>
      </template>
      <template #action="{ row }">
        <div class="flex w-full flex-row items-center justify-evenly">
          <a-tooltip>
            <template #title>上线</template>
            <a-button
              shape="circle"
              size="small"
              @click="releaseBtnClickFn(row)"
            >
              <template #icon>
                <ArcticonsMgrOnline class="h-full w-full p-1" />
              </template>
            </a-button>
          </a-tooltip>
          <a-tooltip>
            <template #title>导出</template>
            <a-button
              :loading="row.loading"
              shape="circle"
              size="small"
              @click="downloadWordFileFn(row)"
            >
              <template #icon>
                <HugeiconFileExport class="h-full w-full p-1" />
              </template>
            </a-button>
          </a-tooltip>
        </div>
      </template>
    </BasicTable>
  </div>
</template>

<style scoped></style>
