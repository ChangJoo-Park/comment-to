<script setup>
const { getChangeLog } = useChangeLogs()

const changeLog = ref({})
onMounted(async () => {
  changeLog.value = await getChangeLog(useRoute().params.changelog)
})

const goBack = () => {
  const project = useRoute().params.project
  navigateTo(`/p/${project}/changelogs`)
}
</script>
<template>
  <div class="container mx-auto max-w-screen-lg py-8">
    <button class="flex flex-col gap-4 mb-8" @click="goBack">뒤로가기</button>
    <div>
      <div>
        <h2 class="text-6xl font-bold">{{ changeLog.title }}</h2>
      </div>
      <div>
        <p class="text-sm text-gray-500" v-if="changeLog.createdAt">{{ changeLog.createdAt.toDate().toLocaleString() }}
        </p>
      </div>
      <div class="mt-8">
        <p class="text-sm text-gray-500">{{ changeLog.description }}</p>
      </div>
    </div>
  </div>
</template>
<style></style>
