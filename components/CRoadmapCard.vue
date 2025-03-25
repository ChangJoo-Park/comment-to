<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="w-full flex flex-col gap-4">
    <div class="w-full bg-white rounded-md outline outline-gray-200 p-4">
      <p class="text-sm font-bold">{{ title }}</p>
      <p class="text-sm text-gray-500">{{ description }}</p>
    </div>
  </div>
</template>

<style></style>
