<script setup>
const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
  status: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

</script>
<template>
  <div
    class="w-[300px] flex-shrink-0 bg-gray-100 rounded-md outline outline-gray-200 p-4 overflow-hidden flex flex-col gap-4">
    <CRoadmapLaneHeader :status="status" />
    <div ref="list" class="flex-1 overflow-y-auto flex flex-col gap-2 pb-8">
      <CRoadmapCard v-for="item in items" :key="item.id" :title="item.title" :description="item.description"
        :to="`/p/${projectId}/comments/${item.id}`" />
    </div>
  </div>
</template>

<style></style>
