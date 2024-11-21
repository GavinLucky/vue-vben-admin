<script lang="ts" setup>
// import { computed } from 'vue';

defineOptions({
  name: 'TopBottomView',
});
</script>

<template>
  <div class="base-container h-full w-full">
    <ul
      :style="{ 'list-style-type': 'none' }"
      class="page-layout flex h-full w-full flex-col"
    >
      <li v-if="$slots.viewTopSlot" class="page-layout h-auto w-full flex-none">
        <slot name="viewTopSlot"></slot>
      </li>
      <li
        v-if="$slots.viewSecondSlot"
        class="page-layout h-auto w-full flex-none"
      >
        <slot name="viewSecondSlot"></slot>
      </li>
      <li class="page-layout max-h-full w-full flex-1 overflow-y-hidden">
        <slot name="viewBottomSlot"></slot>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
