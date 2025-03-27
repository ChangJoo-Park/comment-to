<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: ''
  },
  showBadge: {
    type: Boolean,
    default: false
  },
  badgeText: {
    type: String,
    default: 'New'
  },
  badgeType: {
    type: String,
    default: 'primary' // primary, secondary, accent, info 등 daisyUI 색상
  }
})
</script>

<template>
  <div class="page-title-container mb-6">
    <div class="flex items-center gap-3 mb-1">
      <h1 class="text-2xl md:text-3xl font-bold">
        {{ props.title }}
        <div v-if="showBadge" :class="`badge badge-${badgeType} badge-sm ml-2`">{{ badgeText }}</div>
      </h1>

    </div>

    <p v-if="subtitle" class="text-base-content/70 text-sm md:text-base max-w-2xl">
      {{ subtitle }}
    </p>
  </div>
</template>

<style scoped>
.page-title-container {
  position: relative;
}

.page-title-container::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: hsl(var(--p));
  /* primary 색상 */
  border-radius: 3px;
}

@media (max-width: 768px) {
  .page-title-container::after {
    width: 40px;
    height: 2px;
  }
}
</style>
