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
  to: {
    type: String,
    required: true,
  },
});

const truncateDescription = (text, maxLength = 80) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
</script>

<template>
  <NuxtLink :to="to" class="w-full block mb-3">
    <div class="card bg-base-100 shadow hover:shadow-md transition-all duration-200 card-hover-effect">
      <div class="card-body p-4">
        <h4 class="font-semibold text-base line-clamp-2 mb-1">{{ title }}</h4>
        <p class="text-sm text-base-content/70 line-clamp-2">
          {{ truncateDescription(description) }}
        </p>

        <div class="card-actions justify-end mt-2">
          <button class="btn btn-ghost btn-xs text-primary">
            <span class="text-xs">자세히</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-hover-effect {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-hover-effect:hover {
  transform: translateY(-2px);
}
</style>
