<script setup>
const props = defineProps({
  status: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="w-full flex flex-row justify-start sticky top-0 items-center gap-2">
    <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: status.color }"></div>
    <p class="text-lg text-black font-bold">{{ status.displayName }}</p>
  </div>
</template>
