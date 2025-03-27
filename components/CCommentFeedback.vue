<script setup>
import CUsername from '~/components/CUsername.vue';

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
</script>
<template>
  <div class="w-full px-4 py-4 outline outline-gray-200 rounded-lg"
    :class="{ 'bg-white': !isOwner, 'bg-gray-100': isOwner }">
    <div class="w-full flex flex-col space-y-2">
      <!-- 작성자 정보와 날짜 -->
      <div class="flex flex-row items-center">
        <CUsername :username="comment.username" :email="comment.email" />
        <span class="text-xs text-gray-400 mx-1">•</span>
        <CDateTime :date="comment.createdAt.toDate()" />
        <div v-if="isOwner" class="ml-4 flex flex-row gap-2 justify-start">
          <!-- 수정 및 삭제 -->
          <button class="link">수정</button>
          <button class="link">삭제</button>
        </div>
      </div>
      <!-- 댓글 내용 -->
      <p class="mt-2 text-base text-gray-800 whitespace-pre-wrap break-words">
        {{ comment.comment }}
      </p>
    </div>
  </div>
</template>
