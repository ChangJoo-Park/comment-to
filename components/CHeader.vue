<script setup>
const props = defineProps({
  name: {
    type: String,
    required: false,
    default: ''
  }
})

const handleClick = () => {
  window.alert('click')
}

</script>
<template>
  <div class="border-b border-gray-200">
    <div class="c-header container mx-auto">
      <div class="c-header-brand">
        <img src="/icon.svg" alt="logo" width="60px" height="60px" />
        <div>
          <h1 v-if="props.name">{{ props.name }}</h1>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <NuxtLink to="/p/test/roadmap" class="font-bold hover:underline hover:text-blue-500">로드맵</NuxtLink>
        <NuxtLink to="/p/test/comments" class="font-bold hover:underline hover:text-blue-500">피드백</NuxtLink>
        <NuxtLink to="/p/test/changelogs" class="font-bold hover:underline hover:text-blue-500">변경이력</NuxtLink>
      </div>
      <div class="flex-1"></div>
      <div>
        <button @click="handleClick">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.c-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.c-header-brand {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 2rem;
}

.c-header-link {}
</style>
