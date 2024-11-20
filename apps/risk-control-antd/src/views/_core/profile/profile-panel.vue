<script setup lang="ts">
import { computed } from 'vue';

import { preferences, usePreferences } from '@vben/preferences';

import { message } from 'ant-design-vue';

import { userUpdateAvatar } from '#/api/rg-modules/system/profile/profile-api';
import { CropperAvatar } from '#/component/cropper';

const props = defineProps<{ profile?: RgApi.Profile.IUserProfile }>();

defineEmits<{
  // 头像上传完毕
  uploadFinish: [];
}>();

const avatar = computed(
  () => props.profile?.user.avatar ?? preferences.app.defaultAvatar,
);

const doUploadAvatarFn = ({
  file,
  filename,
  name,
}: {
  file: Blob;
  filename: string;
  name: string;
}) => {
  console.log('doUploadAvatarFn', file, filename, name);
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const [err, resp] = await userUpdateAvatar({ file });
      console.log('doUploadAvatarFn', err, resp);
      if (err) {
        message.error(err.msg);
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

const { isDark } = usePreferences();
const poetrySrc = computed(() => {
  const color = isDark.value ? 'white' : 'gray';
  return `https://v2.jinrishici.com/one.svg?font-size=12&color=${color}`;
});
</script>

<template>
  <a-card :loading="!profile" class="h-full lg:w-1/3">
    <div v-if="profile" class="flex flex-col items-center gap-[24px]">
      <div class="flex flex-col items-center gap-[20px]">
        <a-tooltip :title="$t('page.profile.uploadAvatarTooltip')">
          <CropperAvatar
            :show-btn="false"
            :size="8"
            :upload-api="doUploadAvatarFn"
            :value="avatar"
            width="120"
            @change="$emit('uploadFinish')"
          />
        </a-tooltip>
        <div class="flex flex-col items-center gap-[8px]">
          <span class="text-foreground text-xl font-bold">
            {{ profile?.user.nickName ?? $t('page.profile.userNameUnknown') }}
          </span>
          <!-- https://www.jinrishici.com/doc/#image -->
          <img :src="poetrySrc" alt="" />
        </div>
      </div>
      <div class="px-[24px]">
        <a-descriptions :column="1">
          <a-descriptions-item :label="$t('page.profile.accountKey')">
            {{ profile?.user.userName }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('page.profile.phoneKey')">
            {{
              profile?.user.phonenumber || $t('page.profile.phonenumberUnknown')
            }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('page.profile.emailKey')">
            {{ profile?.user.email || $t('page.profile.emailUnknown') }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('page.profile.deptKey')">
            <a-tag color="processing">
              {{ profile?.user.deptName ?? $t('page.profile.deptNameUnknown') }}
            </a-tag>
            <a-tag v-if="profile?.user.postGroup" color="processing">
              {{ profile?.user.postGroup }}
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('page.profile.lastLoginTimeKey')">
            {{ profile?.user.loginDate }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
  </a-card>
</template>
