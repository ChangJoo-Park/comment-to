<script setup>
const props = defineProps({
  name: {
    type: String,
    required: false,
    default: ''
  }
})

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
