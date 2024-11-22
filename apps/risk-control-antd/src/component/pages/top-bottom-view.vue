<script lang="ts" setup>
// import { computed } from 'vue';

defineOptions({
  name: 'TopBottomView',
});
</script>

<template>
  <div class="base-container flex h-full w-full flex-col">
    <ACard
      v-if="$slots.viewTopSlot"
      :body-style="{
        padding: '5px',
        width: '100%',
        height: 'auto',
      }"
      :bordered="false"
      :style="{
        width: 'calc(100% - 16px)',
        height: 'auto',
      }"
      class="m-[8px] mb-[4px] flex-none cursor-default"
      hoverable
    >
      <slot name="viewTopSlot"></slot>
    </ACard>
    <ACard
      v-if="$slots.viewSecondSlot"
      :body-style="{
        padding: '5px',
        width: '100%',
        height: 'auto',
      }"
      class="mb-[4px] flex-none cursor-default"
      hoverable
    >
      <slot name="viewSecondSlot"></slot>
    </ACard>
    <ACard
      :body-style="{
        padding: '5px',
        width: '100%',
        height: '100%',
        maxHeight: '100%',
      }"
      :bordered="false"
      :class="[$slots.viewTopSlot ? 'mt-[4px]' : '']"
      :style="{
        width: 'calc(100% - 16px)',
        height: 'auto',
        maxHeight: 'calc(100% - 16px)',
      }"
      class="page-layout m-[8px] flex-1 cursor-default overflow-y-hidden"
      hoverable
    >
      <slot name="viewBottomSlot"></slot>
    </ACard>
    <!--    <ul-->
    <!--      :style="{ 'list-style-type': 'none' }"-->
    <!--      class="page-layout flex h-full w-full flex-col"-->
    <!--    >-->
    <!--      <li-->
    <!--        v-if="$slots.viewTopSlot"-->
    <!--        :style="{-->
    <!--          width: 'calc(100% - 16px)',-->
    <!--          height: 'auto',-->
    <!--        }"-->
    <!--        class="page-layout m-[8px] mb-[4px] h-auto w-full flex-none"-->
    <!--      >-->
    <!--        <slot name="viewTopSlot"></slot>-->
    <!--      </li>-->
    <!--      <li-->
    <!--        v-if="$slots.viewSecondSlot"-->
    <!--        class="page-layout h-auto w-full flex-none"-->
    <!--      >-->
    <!--        <slot name="viewSecondSlot"></slot>-->
    <!--      </li>-->
    <!--      <li-->
    <!--        :style="{-->
    <!--          width: 'calc(100% - 16px)',-->
    <!--          height: 'auto',-->
    <!--          maxHeight: 'calc(100% - 16px)',-->
    <!--        }"-->
    <!--        class="page-layout m-[8px] flex-1 overflow-y-hidden pt-[4px]"-->
    <!--      >-->
    <!--        <slot name="viewBottomSlot"></slot>-->
    <!--      </li>-->
    <!--    </ul>-->
  </div>
</template>

<style scoped></style>
