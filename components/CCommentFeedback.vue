<script setup>
import CUsername from '~/components/CUsername.vue';
import { computed } from 'vue';

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  isOwner: {
    type: Boolean,
    required: true,
  },
})

const formattedDate = computed(() => {
  if (!props.comment.createdAt) return '';
  return props.comment.createdAt.toDate();
})
</script>

<template>
  <div class="card w-full" :class="isOwner ? 'bg-primary/5 border-primary/20' : 'bg-base-100'">
    <div class="card-body p-4">
      <!-- 헤더: 작성자 정보와 날짜 -->
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div class="flex items-center gap-2">
          <div class="avatar placeholder">
            <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
              <span class="text-xs">{{ comment.username?.charAt(0) || comment.email?.charAt(0) || '?' }}</span>
            </div>
          </div>
          <div>
            <CUsername :username="comment.username" :email="comment.email" class="font-medium" />
            <div class="flex items-center text-xs text-base-content/60">
              <CDateTime :date="formattedDate" />
            </div>
          </div>
        </div>

        <!-- 소유자 전용 액션 버튼 -->
        <div v-if="isOwner" class="flex items-center gap-2">
          <button class="btn btn-ghost btn-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>수정</span>
          </button>
          <button class="btn btn-ghost btn-xs text-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>삭제</span>
          </button>
        </div>
      </div>

      <!-- 댓글 내용 -->
      <div class="prose prose-sm max-w-none">
        <p class="whitespace-pre-wrap break-words">
          {{ comment.comment }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
