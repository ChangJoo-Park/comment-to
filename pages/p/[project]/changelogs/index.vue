<script setup>
import { marked } from 'marked';

const { fetchChangeLogs } = useChangeLogs();
const changeLogs = ref([]);
const recent = ref({});
const project = useRoute().params.project;
const isLoading = ref(true);

// 마크다운을 HTML로 변환하는 함수
const renderMarkdown = (text) => {
  if (!text) return '';
  try {
    return marked.parse(text);
  } catch (e) {
    console.error('마크다운 변환 오류:', e);
    return text;
  }
};

// 날짜 포맷팅 함수
const formatDate = (date) => {
  if (!date) return '';
  try {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    return '';
  }
};

onMounted(async () => {
  isLoading.value = true;
  try {
    changeLogs.value = await fetchChangeLogs();
    if (changeLogs.value.length > 0) {
      recent.value = changeLogs.value[0];
    }
  } catch (error) {
    console.error('변경 이력 로딩 오류:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="container mx-auto max-w-screen-lg py-6 px-4 md:px-6 lg:px-0">
    <CPageTitle title="변경이력" subtitle="서비스의 업데이트 내역과 버전별 변경사항을 확인하세요" />

    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- 변경 이력이 없는 경우 -->
    <div v-else-if="!changeLogs.length" class="card bg-base-100 shadow-lg p-12 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-base-content/30" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
      <h3 class="text-xl font-bold mt-4">변경 이력이 없습니다</h3>
      <p class="text-base-content/70 mt-2">첫 번째 변경 이력이 등록되면 이곳에 표시됩니다</p>
    </div>

    <!-- 변경 이력 내용 -->
    <div v-else class="flex flex-col md:flex-row gap-8 mt-6">
      <!-- 최신 변경 이력 상세 -->
      <div class="md:w-2/3">
        <div class="card bg-base-100 shadow-lg overflow-hidden">
          <div class="card-body p-6">
            <!-- 제목 및 버전 정보 -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h2 class="card-title text-2xl font-bold">{{ recent.title }}</h2>
              <div class="badge badge-lg"
                :class="recent.type === 'major' ? 'badge-primary' : recent.type === 'minor' ? 'badge-secondary' : 'badge-accent'">
                v{{ recent.version || '1.0.0' }}
              </div>
            </div>

            <!-- 릴리스 날짜 -->
            <div class="flex items-center text-base-content/60 text-sm mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span v-if="recent.createdAt">
                {{ recent.createdAt.toDate ? recent.createdAt.toDate().toLocaleDateString('ko-KR', {year: 'numeric',
                month: 'long', day: 'numeric'}) : formatDate(recent.createdAt) }}
              </span>
            </div>

            <!-- 마크다운 내용 -->
            <div class="divider my-2"></div>
            <div class="prose prose-sm sm:prose max-w-none" v-html="renderMarkdown(recent.description)"></div>

            <!-- 작성자 정보 (있는 경우) -->
            <div v-if="recent.author" class="flex items-center mt-6 pt-4 border-t border-base-200">
              <div class="avatar placeholder mr-3">
                <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
                  <span>{{ recent.author.substring(0, 1).toUpperCase() }}</span>
                </div>
              </div>
              <div>
                <div class="font-medium">{{ recent.author }}</div>
                <div class="text-xs text-base-content/60">작성자</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 변경 이력 목록 -->
      <div class="md:w-1/3">
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body p-0">
            <div class="p-4 border-b border-base-200 flex items-center justify-between">
              <h3 class="card-title text-lg">변경 이력 목록</h3>
              <div class="badge badge-ghost">{{ changeLogs.length }}개</div>
            </div>

            <div class="overflow-y-auto max-h-[500px] changelog-scrollbar">
              <ul class="menu menu-lg p-0">
                <li v-for="(log, index) in changeLogs" :key="log.id" :class="{'bordered': index === 0}">
                  <NuxtLink :to="`/p/${project}/changelogs/${log.id}`" class="flex flex-col items-start py-3 gap-1">
                    <div class="flex w-full justify-between items-center">
                      <span class="font-medium">{{ log.title }}</span>
                      <div class="badge badge-sm"
                        :class="log.type === 'major' ? 'badge-primary' : log.type === 'minor' ? 'badge-secondary' : 'badge-accent'">
                        v{{ log.version || '1.0.0' }}
                      </div>
                    </div>
                    <div v-if="log.createdAt" class="text-xs text-base-content/60 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ log.createdAt.toDate ? log.createdAt.toDate().toLocaleDateString('ko-KR', {year: 'numeric',
                      month: 'short', day: 'numeric'}) : formatDate(log.createdAt) }}
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- 변경 이력 관리 버튼 (관리자용) -->
            <div class="p-4 border-t border-base-200">
              <NuxtLink :to="`/p/${project}/admin/changelogs`" class="btn btn-outline btn-block btn-sm gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                변경 이력 관리
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose pre {
  background-color: hsl(var(--b2));
  color: hsl(var(--bc));
  border-radius: 0.5rem;
  padding: 1rem;
}

.prose code {
  background-color: hsl(var(--b2));
  color: hsl(var(--bc));
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  color: hsl(var(--bc));
  margin-top: 1.5em;
  margin-bottom: 0.75em;
}

.prose ul,
.prose ol {
  padding-left: 1.5rem;
}

.prose a {
  color: hsl(var(--p));
  text-decoration: underline;
}

.changelog-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.changelog-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.changelog-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.changelog-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.bordered {
  border-left: 3px solid hsl(var(--p));
}
</style>
