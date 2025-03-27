<script setup>
import { computed } from 'vue';

const props = defineProps({
  date: {
    type: Date,
    required: false,
  },
  showIcon: {
    type: Boolean,
    default: false
  }
})

const formattedDate = computed(() => {
  if (!props.date) return '';

  // 날짜 포맷팅 (더 세련된 형식)
  try {
    const now = new Date();
    const diff = now - props.date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // 상대적 시간 표현
    if (seconds < 60) {
      return '방금 전';
    } else if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days < 7) {
      return `${days}일 전`;
    } else {
      // 일주일 이상인 경우 연/월/일 표시
      return props.date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  } catch (e) {
    // 오류 발생 시 기본 날짜 형식 반환
    return props.date.toLocaleString('ko-KR');
  }
})
</script>

<template>
  <div v-if="date" class="flex items-center text-base-content/70 text-xs">
    <svg v-if="showIcon" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24"
      stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    {{ formattedDate }}
  </div>
  <div v-else class="text-xs text-base-content/40">날짜 없음</div>
</template>
