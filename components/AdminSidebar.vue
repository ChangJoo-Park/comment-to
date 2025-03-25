<template>
  <aside class="min-h-screen w-64 flex flex-col p-4">
    <div class="flex flex-col h-full gap-4 rounded-xl">
      <div class="flex-1">
        <!-- 로고 영역 -->
        <div class="p-4 font-mono">
          <div>피드백 수집 서비스</div>
        </div>

        <!-- 메뉴 영역 -->
        <ul class="menu p-4 text-base-content w-full">
          <!-- 메뉴 그룹 1 -->
          <li class="menu-title">
            <span>프로젝트</span>
          </li>
          <li>
            <NuxtLink to="/admin/p/123124" class="flex items-center gap-2">
              프로젝트 1
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/p/123124" class="flex items-center gap-2">
              프로젝트 2
            </NuxtLink>
          </li>
          <li class="mt-4">
            <NuxtLink to="/projects" class="flex items-center gap-2 btn btn-outline btn-sm">
              새 프로젝트
            </NuxtLink>
          </li>

          <!-- 메뉴 그룹 2 -->
        </ul>
      </div>

      <!-- 하단 사용자 정보 -->
      <div class="bottom-0 w-full p-4 border-t border-base-300">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="w-8 h-8 rounded-full">
              <div></div>
            </div>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium">사용자 이름</span>
            <span class="text-xs text-base-content/70">관리자</span>
          </div>
        </div>
      </div>
    </div>

  </aside>
</template>

<script setup>
// 현재 활성화된 메뉴 처리
const route = useRoute()
const isActive = (path) => route.path.startsWith(path)
</script>

<style scoped>
.router-link-active {}
</style>
