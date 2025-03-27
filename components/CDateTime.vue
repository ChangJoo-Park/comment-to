<script setup>
const props = defineProps({
  date: {
    type: Date,
    required: false,
  },
})
</script>
<template>
  <div class="text-sm text-black" v-if="date">
    {{ date.toLocaleString() }}
  </div>
</template>
