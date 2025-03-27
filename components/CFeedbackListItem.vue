<script setup>
const props = defineProps({
  project: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  status: {
    type: Object,
    required: false,
    default: () => null
  },
  onUpVoteClick: {
    type: Function,
    required: true,
  },
  onDownVoteClick: {
    type: Function,
    required: true,
  },
  hasVote: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emptyStatus = computed(() => {
  return !props.status || Object.keys(props.status).length === 0
})

const onUpVote = (id) => {
  if (props.hasVote) {
    props.onDownVoteClick(id)
  } else {
    props.onUpVoteClick(id)
  }
}

const truncateDescription = (text, maxLength = 120) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
</script>

<template>
  <NuxtLink :to="`/p/${project}/comments/${item.id}`" class="block">
    <div
      class="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden card-hover-effect">
      <div class="card-body p-0">
        <div class="flex items-start p-5">
          <!-- 투표 버튼 -->
          <div class="mr-4">
            <button type="button" :class="[
                'btn-vote flex flex-col items-center gap-1 rounded-md min-w-[64px] py-3',
                'transition-colors duration-200 select-none',
                hasVote
                  ? 'bg-primary text-primary-content hover:bg-primary/90'
                  : 'bg-base-200 text-base-content hover:bg-base-300'
              ]" @click.prevent="onUpVote(item.id)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clip-rule="evenodd" />
              </svg>
              <span class="font-bold text-lg">{{ item.votes ?? 0 }}</span>
            </button>
          </div>

          <!-- 콘텐츠 영역 -->
          <div class="flex-1 min-w-0">
            <!-- 제목 -->
            <h3 class="text-lg font-bold mb-2 line-clamp-1">{{ item.title }}</h3>

            <!-- 요약된 설명 -->
            <p v-if="item.description?.length > 0" class="text-base-content/70 mb-4 line-clamp-2">
              {{ truncateDescription(item.description) }}
            </p>

            <!-- 메타 정보 (상태, 작성일 등) -->
            <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <!-- 상태 배지 -->
              <div v-if="status" class="badge" :style="{
                  backgroundColor: status.color + '20',
                  color: status.color,
                  borderColor: status.color
                }">
                <span class="inline-block w-2 h-2 rounded-full mr-1.5"
                  :style="{ backgroundColor: status.color }"></span>
                {{ status.displayName ?? '없음'}}
              </div>

              <!-- 작성일 -->
              <div class="text-base-content/60 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <CDateTime :date="item.createdAt.toDate()" />
              </div>

              <!-- 댓글 수 -->
              <div class="text-base-content/60 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span>{{ item.comments ?? 0 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 하단 액션 영역 -->
        <div class="flex justify-between items-center px-5 py-3 border-t border-base-200 bg-base-50">
          <div class="flex items-center text-xs text-base-content/60">
            <span>작성: {{ item.username || item.email || '익명' }}</span>
          </div>

          <div class="flex items-center">
            <button class="btn btn-ghost btn-sm gap-1 text-base-content/70">
              자세히 보기
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.btn-vote {
  min-height: 70px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-hover-effect {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-hover-effect:hover {
  transform: translateY(-2px);
}
</style>
