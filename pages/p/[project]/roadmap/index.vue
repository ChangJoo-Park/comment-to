<script setup>
const { doc: projectDoc } = useProjectDoc()
const items = ref([])

onMounted(async () => {
  useSeoMeta({
    title: `로드맵 - ${projectDoc.value?.name}`,
  })

  const statusKeys = projectDoc.value?.status.map((status) => status.key)
  const { fetchItemsByStatus } = useFetchFeedbacks()
  items.value = await fetchItemsByStatus(statusKeys)
})

const getItemsByStatus = (status) => {
  return items.value.filter((item) => item.status === status)
}
</script>

<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div class="container mx-auto max-w-screen-lg pt-8 px-4">
      <CPageTitle title="로드맵" />
    </div>


    <div class="container mx-auto max-w-screen-lg px-4 pb-4 grid grid-cols-3 gap-4">
      <CRoadmapLane :status="item" :title="item.displayName" :items="getItemsByStatus(item.key)"
        v-for="item in (projectDoc?.status ?? [])" :project-id="projectDoc?.id" />
    </div>
  </div>
</template>

<style></style>
