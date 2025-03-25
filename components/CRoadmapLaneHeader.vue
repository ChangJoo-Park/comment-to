<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="w-full flex flex-row justify-start sticky top-0">
    <p class="text-lg text-black font-bold">{{ title }}</p>
  </div>
</template>
