<script setup>
const { doc: projectDoc } = useProjectDoc()
const items = ref([])
const activeTab = ref(null) // 모바일에서 선택된 탭
const isLoading = ref(true)

onMounted(async () => {
  useSeoMeta({
    title: `로드맵 - ${projectDoc.value?.name}`,
  })

  isLoading.value = true
  try {
    const statusKeys = projectDoc.value?.status.map((status) => status.key)
    const { fetchItemsByStatus } = useFetchFeedbacks()
    items.value = await fetchItemsByStatus(statusKeys)

    // 첫 번째 상태를 기본 활성 탭으로 설정
    if (projectDoc.value?.status?.length > 0) {
      activeTab.value = projectDoc.value.status[0].key
    }
  } catch (error) {
    console.error('로드맵 데이터 로딩 오류:', error)
  } finally {
    isLoading.value = false
  }
})

const getItemsByStatus = (status) => {
  return items.value.filter((item) => item.status === status)
}

const setActiveTab = (key) => {
  activeTab.value = key
}

// 아이템 개수를 표시하는 배지를 위한 계산된 속성
const itemCounts = computed(() => {
  const counts = {}
  if (projectDoc.value?.status) {
    projectDoc.value.status.forEach(status => {
      counts[status.key] = getItemsByStatus(status.key).length
    })
  }
  return counts
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-base-100">
    <!-- 헤더 섹션 -->
    <div class="container mx-auto max-w-screen-lg pt-6 px-4 mb-4">
      <CPageTitle title="로드맵" />

      <!-- 모바일 탭 (md 미만 화면에서만 표시) -->
      <div class="md:hidden mt-4 mb-2">
        <div class="tabs tabs-boxed bg-base-200 p-1">
          <a v-for="status in (projectDoc?.status || [])" :key="status.key"
            :class="['tab tab-sm whitespace-nowrap', activeTab === status.key ? 'tab-active' : '']"
            @click="setActiveTab(status.key)">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: status.color }"></span>
              <span>{{ status.displayName }}</span>
              <div class="badge badge-sm" :style="{
                backgroundColor: status.color + '20',
                color: status.color,
                borderColor: status.color
              }">{{ itemCounts[status.key] || 0 }}</div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="flex-1 flex justify-center items-center py-12">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- 데스크탑 레이아웃 (수평 스크롤 방식) -->
    <div v-else class="flex-1 flex flex-col">
      <!-- 데스크탑 뷰 (md 이상 화면에서만 표시) -->
      <div class="hidden md:block flex-1 overflow-x-auto pb-6">
        <div class="container mx-auto max-w-screen-lg px-4 min-h-[calc(100vh-200px)]">
          <div class="flex space-x-4 h-full min-w-max pb-2">
            <CRoadmapLane v-for="status in (projectDoc?.status || [])" :key="status.key" :status="status"
              :title="status.displayName" :items="getItemsByStatus(status.key)" :project-id="projectDoc?.id"
              class="w-[320px] flex-shrink-0 h-full" />
          </div>
        </div>
      </div>

      <!-- 모바일 뷰 (md 미만 화면에서만 표시) -->
      <div class="md:hidden flex-1 px-4 pb-8">
        <div v-for="status in (projectDoc?.status || [])" :key="status.key" v-show="activeTab === status.key"
          class="h-full">
          <div class="bg-base-200/40 rounded-lg p-3 mb-3">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: status.color }"></div>
                <h3 class="text-lg font-bold">{{ status.displayName }}</h3>
              </div>
              <div class="badge" :style="{
                backgroundColor: status.color + '20',
                color: status.color,
                borderColor: status.color
              }">{{ itemCounts[status.key] || 0 }}</div>
            </div>
          </div>

          <!-- 아이템이 없는 경우 -->
          <div v-if="getItemsByStatus(status.key).length === 0"
            class="flex flex-col items-center justify-center py-12 text-center text-base-content/50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p class="text-base">아직 항목이 없습니다</p>
            <p class="text-sm mt-1">이 단계에 추가된 피드백이 없습니다</p>
          </div>

          <!-- 아이템 목록 -->
          <div v-else class="space-y-3">
            <CRoadmapCard v-for="item in getItemsByStatus(status.key)" :key="item.id" :title="item.title"
              :description="item.description" :to="`/p/${projectDoc?.id}/comments/${item.id}`" />
          </div>
        </div>
      </div>
    </div>

    <!-- 모바일에서 하단 내비게이션 -->
    <div class="md:hidden btm-nav btm-nav-sm z-50">
      <button v-for="(status, index) in (projectDoc?.status || [])" :key="status.key"
        :class="activeTab === status.key ? 'active' : ''" @click="setActiveTab(status.key)">
        <div class="w-2 h-2 rounded-full mx-auto mb-1" :style="{ backgroundColor: status.color }"></div>
        <span class="btm-nav-label text-xs">{{ status.displayName }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .tabs-boxed {
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
  }

  .tabs-boxed::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
  }
}

/* 스크롤바 스타일링 */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
</style>
