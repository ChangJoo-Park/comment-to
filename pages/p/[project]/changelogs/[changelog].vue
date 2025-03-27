<script setup>
import { marked } from 'marked';

const route = useRoute();
const { getChangeLog } = useChangeLogs();
const project = route.params.project;
const changelogId = route.params.changelog;

const changeLog = ref({});
const isLoading = ref(true);
const hasError = ref(false);

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

const goBack = () => {
  navigateTo(`/p/${project}/changelogs`);
};

onMounted(async () => {
  isLoading.value = true;
  try {
    changeLog.value = await getChangeLog(changelogId);

    // SEO 메타데이터 설정
    useSeoMeta({
      title: `${changeLog.value?.title || '변경 이력'} - ${project}`,
      description: changeLog.value?.description?.substring(0, 160) || '변경 이력 상세 정보'
    });
  } catch (error) {
    console.error('변경 이력 로딩 오류:', error);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="container mx-auto max-w-screen-lg py-6 px-4 md:px-6 lg:px-0">
    <!-- 뒤로가기 버튼 -->
    <div class="mb-6">
      <button @click="goBack" class="btn btn-ghost btn-sm gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        변경 이력 목록으로
      </button>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="hasError" class="card bg-base-100 shadow-lg p-12 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-error opacity-70" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h3 class="text-xl font-bold mt-4">변경 이력을 불러올 수 없습니다</h3>
      <p class="text-base-content/70 mt-2 mb-6">요청하신 변경 이력이 존재하지 않거나 오류가 발생했습니다</p>
      <button @click="goBack" class="btn btn-primary">목록으로 돌아가기</button>
    </div>

    <!-- 변경 이력 내용 -->
    <div v-else-if="changeLog.id" class="card bg-base-100 shadow-lg overflow-hidden">
      <div class="card-body p-6 md:p-8">
        <!-- 헤더 영역 -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h1 class="text-3xl md:text-4xl font-bold leading-tight">{{ changeLog.title }}</h1>

          <!-- 버전 정보 -->
          <div class="badge badge-lg"
            :class="changeLog.type === 'major' ? 'badge-primary' : changeLog.type === 'minor' ? 'badge-secondary' : 'badge-accent'">
            v{{ changeLog.version || '1.0.0' }}
          </div>
        </div>

        <!-- 릴리스 정보 -->
        <div class="flex flex-wrap gap-4 mb-6">
          <!-- 날짜 -->
          <div class="flex items-center text-base-content/70">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span v-if="changeLog.createdAt">
              {{ changeLog.createdAt.toDate ? changeLog.createdAt.toDate().toLocaleDateString('ko-KR', {year: 'numeric',
              month: 'long', day: 'numeric'}) : formatDate(changeLog.createdAt) }}
            </span>
          </div>

          <!-- 작성자 정보 -->
          <div v-if="changeLog.author" class="flex items-center text-base-content/70">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{{ changeLog.author }}</span>
          </div>
        </div>

        <!-- 구분선 -->
        <div class="divider my-0"></div>

        <!-- 마크다운 콘텐츠 -->
        <div class="py-4">
          <article class="prose prose-base md:prose-lg max-w-none" v-html="renderMarkdown(changeLog.description)">
          </article>
        </div>

        <!-- 하단 액션 영역 -->
        <div class="card-actions justify-end mt-6 pt-4 border-t border-base-200">
          <button @click="goBack" class="btn btn-ghost">
            목록으로
          </button>

          <!-- 관리자용 편집 버튼 (옵션) -->
          <NuxtLink :to="`/p/${project}/admin/changelogs/edit/${changeLog.id}`" class="btn btn-outline btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            수정
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 데이터가 없는 경우 -->
    <div v-else-if="!isLoading" class="card bg-base-100 shadow-lg p-12 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-base-content/30" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
      <h3 class="text-xl font-bold mt-4">변경 이력이 없습니다</h3>
      <p class="text-base-content/70 mt-2 mb-6">요청하신 변경 이력을 찾을 수 없습니다</p>
      <button @click="goBack" class="btn btn-primary">목록으로 돌아가기</button>
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

.prose h1 {
  font-size: 2em;
  margin-top: 0;
}

.prose h2 {
  font-size: 1.5em;
}

.prose h3 {
  font-size: 1.25em;
}

.prose ul,
.prose ol {
  padding-left: 1.5rem;
}

.prose a {
  color: hsl(var(--p));
  text-decoration: underline;
}

.prose blockquote {
  border-left: 4px solid hsl(var(--p));
  padding-left: 1rem;
  font-style: italic;
  color: hsl(var(--bc) / 0.8);
}

.prose hr {
  border-color: hsl(var(--b2));
}

.prose table {
  width: 100%;
  border-collapse: collapse;
}

.prose table th,
.prose table td {
  padding: 0.5rem;
  border: 1px solid hsl(var(--b2));
}

.prose table th {
  background-color: hsl(var(--b2));
}
</style>
