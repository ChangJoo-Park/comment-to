<script setup>
const props = defineProps({
  onSubmit: {
    type: Function,
    required: true,
  },
})

const text = ref('')

const submitComment = () => {
  props.onSubmit(text.value)
  text.value = ''
}
</script>
<template>
  <div class="flex flex-col gap-2">
    <div class="font-bold">의견을 남겨주세요.</div>
    <textarea name="comment" id="comment" placeholder="댓글을 입력하세요" rows="2"
      class="w-full border border-gray-300 rounded-md p-2 bg-white" v-model="text" />
    <div class="flex flex-row justify-end">
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md" @click.prevent="submitComment">작성</button>
    </div>
  </div>
</template>
