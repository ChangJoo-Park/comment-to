<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h1 class="text-4xl font-bold mb-8">{{ props.title }}</h1>
</template>
