<script setup>
const route = useRoute()
const item = ref(null)
const comments = ref([])
const user = useCurrentUser()
const commentText = ref('')
function goBack() {
  navigateTo('/p/' + route.params.project + '/comments')
}

const { fetchItem, fetchComments } = useFetchFeedbacks()

onMounted(async () => {
  item.value = await fetchItem(route.params.comment)
  comments.value = await fetchComments(route.params.comment)
})

const submitComment = async () => {
  const { createComment } = useCreateComment()
  const comment = await createComment(route.params.comment, commentText.value)
  comments.value.push(comment)
  commentText.value = ''
}
</script>
<template>
  <div class="container mx-auto max-w-screen-lg py-8">
    <div class="mb-8">
      <button class="text-black px-4 py-2 rounded-md cursor-pointer" @click="goBack">뒤로가기</button>
    </div>
    <div class="flex flex-row gap-8">
      <div class="w-[400px] h-40 bg-gray-50 rounded-md outline outline-gray-200 p-4">
        <div class="w-full flex flex-col gap-4">
          <div class="w-full flex flex-row gap-2 justify-between">
            <p class="font-bold">상태</p>
            <p class="text-gray-500">논의중</p>
          </div>
          <div class="w-full flex flex-row gap-2 justify-between">
            <p class="font-bold">투표수</p>
            <p class="text-gray-500">100+</p>
          </div>
          <div class="w-full flex flex-row gap-2 justify-between">
            <p class="font-bold">참여자</p>
            <p class="text-gray-500">100+</p>
          </div>
        </div>
      </div>

      <div class="w-full flex flex-col gap-8">
        <Suspense>
          <!-- 본문 -->
          <div class="w-full flex flex-col" v-if="item">
            <!-- 제목 -->
            <h1 class="text-2xl font-bold mb-2">{{ item.title }}</h1>
            <!-- 작성자 -->
            <div class="text-gray-500 flex flex-row gap-2">
              <div v-if="item.isAnonymous">
                <span class="text-gray-500">Anonymous</span>
              </div>
              <div v-else>
                <span class="text-gray-500">{{ item.username }}</span>
              </div>
              <span class="text-gray-500">•</span>
              <!-- 작성일 -->
              <span class="text-gray-500" v-if="item.createdAt">{{ item.createdAt.toDate().toLocaleString() }}</span>
            </div>

            <!-- 내용 -->
            <p class="text-gray-500">{{ item.description }}</p>
            <div v-if="!!user && user?.uid == item.createdByUid" class="w-full flex flex-row gap-2 justify-start mt-8" >
              <!-- 수정 및 삭제 -->
              <button class="text-gray-500">수정</button>
              <button class="text-gray-500">삭제</button>
            </div>
          </div>
        </Suspense>
        <!-- 댓글 작성 폼 -->
        <div class="flex flex-col gap-2">
          <div class="font-bold">의견을 남겨주세요.</div>
          <textarea name="comment" id="comment" placeholder="댓글을 입력하세요" rows="2"
            class="w-full border border-gray-300 rounded-md p-2 bg-white" v-model="commentText" />
          <div class="flex flex-row justify-end">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md" @click="submitComment">작성</button>
          </div>
        </div>
        <!-- 댓글 목록 -->
        <Suspnse>
          <div class="flex flex-col" v-if="comments.length > 0">
            <div class="w-full flex flex-col mb-4">
              <p class="text-black font-bold">댓글 {{ comments.length }}개</p>
            </div>
            <div class="w-full flex flex-col gap-4">
              <div class="w-full px-4 py-4 outline outline-gray-200 bg-white rounded-lg" v-for="comment in comments"
                :key="comment.id">
                <div class="w-full flex flex-col space-y-2">
                  <!-- 작성자 정보와 날짜 -->
                  <div class="flex flex-row items-center gap-3">
                    <p v-if="comment.isAnonymous" class="text-sm font-medium text-gray-700">Anonymous</p>
                    <p v-else class="text-sm font-medium text-gray-700">{{ comment.username }}</p>
                    <span class="text-xs text-gray-400">•</span>
                    <p class="text-sm text-gray-500">{{ comment.createdAt.toDate().toLocaleString() }}</p>
                  </div>
                  <!-- 댓글 내용 -->
                  <p class="mt-2 text-base text-gray-800 whitespace-pre-wrap break-words">
                    {{ comment.comment }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Suspnse>
      </div>
    </div>
  </div>
</template>

<style></style>
