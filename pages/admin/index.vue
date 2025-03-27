<script setup>
definePageMeta({
  layout: 'admin',
})
const { user } = useProjectUser()
const projects = ref([])
onMounted(async () => {
  console.log('user.value.projects ', user.value.projects)
  const { fetchProjectsByIds } = useProjects()
  projects.value = await fetchProjectsByIds(user.value.projects)
})

</script>
<template>
  <div class="container mx-auto max-w-screen-xl">
    <header class="px-16 pt-16">
      <h1 class="text-4xl font-bold">대시보드</h1>
    </header>
    <main class="px-16 py-8">
      <h2>프로젝트 목록</h2>
      <div class="flex flex-row gap-4">
        <div class="card card-compact w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">프로젝트 1</h2>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<style></style>
