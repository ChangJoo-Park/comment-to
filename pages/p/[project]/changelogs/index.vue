<script setup>
const { fetchChangeLogs } = useChangeLogs()

const changeLogs = ref([])
const recent = ref({})
const project = useRoute().params.project
onMounted(async () => {
  changeLogs.value = await fetchChangeLogs()
  recent.value = changeLogs.value[0]
})
</script>
<template>
  <div class="container mx-auto max-w-screen-lg py-8">
    <CPageTitle title="변경이력" />
    <div class="flex flex-row gap-4">
      <div class="flex flex-col gap-4 flex-1">
        <div>
          <h2 class="text-6xl font-bold">{{ recent.title }}</h2>
        </div>
        <div>
          <p class="text-sm text-gray-500" v-if="recent.createdAt">{{ recent.createdAt.toDate().toLocaleString() }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">{{ recent.description }}</p>
        </div>
      </div>
      <div>
        <div>
          <h3 class="text-lg font-bold">목록</h3>
        </div>
        <div>
          <ul>
            <li v-for="changeLog in changeLogs" :key="changeLog.id">
              <NuxtLink :to="`/p/${project}/changelogs/${changeLog.id}`">{{ changeLog.title }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
