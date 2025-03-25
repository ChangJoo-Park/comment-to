<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h1 class="text-xl lg:text-4xl font-bold mb-8 px-4 lg:px-0">{{ props.title }}</h1>
</template>
