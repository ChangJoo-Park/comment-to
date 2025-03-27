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
    class="card w-[320px] flex-shrink-0 bg-base-200/60 rounded-lg overflow-hidden flex flex-col shadow-none border border-base-300">
    <!-- 레인 헤더 -->
    <div class="p-3 pb-0">
      <CRoadmapLaneHeader :status="status" :items="items" />
    </div>

    <!-- 레인 콘텐츠 -->
    <div ref="list" class="flex-1 overflow-y-auto p-3 pt-1 roadmap-lane-content">
      <div v-if="items.length === 0"
        class="flex flex-col items-center justify-center h-32 text-center text-base-content/50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="text-sm">아직 항목이 없습니다</p>
      </div>

      <CRoadmapCard v-for="item in items" :key="item.id" :title="item.title" :description="item.description"
        :to="`/p/${projectId}/comments/${item.id}`" />

      <div class="h-4"></div> <!-- 스크롤 패딩 -->
    </div>

    <!-- 하단 액션 영역 -->
    <!-- <div class="p-3 border-t border-base-300 bg-base-100 flex justify-between items-center">
      <span class="text-xs text-base-content/70">총 {{ items.length }}개</span>
      <button class="btn btn-ghost btn-xs text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        추가
      </button>
    </div> -->
  </div>
</template>

<style scoped>
.roadmap-lane-content {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.roadmap-lane-content::-webkit-scrollbar {
  width: 6px;
}

.roadmap-lane-content::-webkit-scrollbar-track {
  background: transparent;
}

.roadmap-lane-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
</style>
