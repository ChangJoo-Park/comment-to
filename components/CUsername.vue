<script setup>
const props = defineProps({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
})
</script>
<template>
  <p v-if="!username && !email" class="text-sm font-bold">익명</p>
  <div v-else class="text-sm font-bold">{{ username ?? email }}</div>
</template>
