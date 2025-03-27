<script setup>
const props = defineProps({
  onSubmit: {
    type: Function,
    required: true,
  },
})

const text = ref('')
const isSubmitting = ref(false)

const submitComment = async () => {
  if (!text.value.trim()) return;

  isSubmitting.value = true;
  try {
    await props.onSubmit(text.value);
    text.value = '';
  } catch (error) {
    console.error('댓글 작성 중 오류:', error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="card bg-base-100 shadow-sm">
    <div class="card-body p-5">
      <h3 class="card-title text-lg mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        의견을 남겨주세요
      </h3>

      <div class="form-control w-full mb-2">
        <textarea v-model="text" class="textarea textarea-bordered h-24 w-full focus:textarea-primary"
          placeholder="댓글을 입력하세요" :disabled="isSubmitting"></textarea>
      </div>

      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click.prevent="submitComment" :class="{ 'loading': isSubmitting }"
          :disabled="isSubmitting || !text.trim()">
          <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          {{ isSubmitting ? '작성 중...' : '댓글 작성' }}
        </button>
      </div>
    </div>
  </div>
</template>
