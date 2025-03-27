<script setup>
const isSidebarOpen = ref(true)
</script>

<template>
  <aside
class="min-h-screen flex flex-col p-4 border-r border-base-300 transition-all duration-300"
    :class="{ 'w-20': !isSidebarOpen, 'w-64': isSidebarOpen }">
    <div class="flex flex-col h-full gap-4 rounded-xl">
      <div class="flex flex-row justify-between">
        <!-- 로고 영역 -->
        <div class="">
          <div v-if="isSidebarOpen" class="flex flex-row items-center gap-1">
            <img src="/icon.svg" class="w-10 h-10" alt="서비스 아이콘" >
            <span class="text-lg font-bold font-mono">서비스 이름</span>
          </div>
        </div>
        <!-- <div class="p-2 text-xl font-bold font-mono">
          <div class="flex flex-row items-center gap-1">
            <button class="cursor-pointer" @click="isSidebarOpen = !isSidebarOpen">
              <Icon name="mynaui:sidebar" />
            </button>
          </div>
        </div> -->
      </div>

      <div class="flex-1 flex flex-col gap-1">
        <div class="flex flex-row items-center gap-2 p-2 rounded-lg hover:bg-slate-200 cursor-pointer">
          <Icon name="tabler:layout-dashboard" size="1.5rem" />
          <span class="font-bold">대시보드</span>
        </div>
        <div class="flex flex-row items-center gap-2 p-2 rounded-lg hover:bg-slate-200 cursor-pointer">
          <Icon name="tabler:align-box-left-top" size="1.5rem" />
          <span class="font-bold">프로젝트</span>
        </div>
      </div>
      <!-- 하단 사용자 정보 -->
      <div class="bottom-0 w-full p-4 border-t border-base-300">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="w-8 h-8 rounded-full" />
          </div>
          <div v-if="isSidebarOpen" class="flex flex-col">
            <span class="text-sm font-medium">사용자 이름</span>
            <span class="text-xs text-base-content/70">관리자</span>
          </div>
        </div>
      </div>
    </div>

  </aside>
</template>

<style scoped>
.router-link-active {}
</style>
