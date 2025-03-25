<script setup>
import { useCreateFeedback } from '~/composables/useCreateFeedback'
import { useFetchFeedbacks } from '~/composables/useFetchFeedbacks'

const project = useRoute().params.project

const items = ref([])

const title = ref('')
const description = ref('')

const handleClick = (id) => {
  window.alert(id)
}

const handleSubmit = (e) => {
  const { createFeedback } = useCreateFeedback()
  createFeedback(title.value.trim(), description.value.trim())
  title.value = ''
  description.value = ''
  // unfocus
  e.target.blur()
}

const { fetchItems } = useFetchFeedbacks()

onMounted(async () => {
  items.value = await fetchItems()
})

</script>
<template>
  <div class="container mx-auto max-w-screen-lg py-8">
    <CPageTitle title="피드백" />
    <div class="flex flex-row gap-8">
      <div class="w-[400px]">
        <form action="" class="flex flex-col gap-4 bg-gray-50 p-4 rounded outline outline-gray-200"
          @submit.prevent="handleSubmit">
          <legend class="text-lg font-bold">요청사항</legend>
          <!-- 어드민에서 수정할 수 있어야함 -->
          <p class="text-sm text-gray-500">이 서비스 개선을 위한 제안을 해주세요.</p>
          <input type="text" placeholder="제목" class="w-full border border-gray-300 rounded-md p-2 bg-white"
            v-model="title" required />
          <textarea name="comment" id="comment" placeholder="자세한 내용을 알려주세요 (옵션)" rows="8"
            class="w-full border border-gray-300 rounded-md p-2 bg-white" v-model="description" />
          <input type="submit" value="남기기"
            class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 animate-all duration-300" />
        </form>
      </div>
      <div class="w-full flex flex-col gap-4">
        <div class="flex flex-row justify-end">
          <input type="search" placeholder="검색" class="border border-gray-300 rounded-md p-2 bg-white" />
        </div>
        <Suspense>
          <div class="flex flex-col gap-4">
            <NuxtLink :to="`/p/${project}/comments/${item.id}`"
              class="flex flex-row gap-4 w-full p-4 rounded outline outline-gray-200 bg-gray-50 hover:bg-white animate-all duration-300"
              v-for="item in items" :key="item.id">
              <div>
                <div class="flex flex-row gap-2">
                  <button type="button"
                    class="text-black px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white animate-all duration-300"
                    @click.prevent="handleClick(item.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                    <span class="text-sm">1</span>
                  </button>
                </div>
              </div>
              <div>
                <div class="flex flex-row gap-2">
                  <h3 class="text-lg font-bold">{{ item.title }}</h3>
                </div>
                <p class="text-sm text-gray-500">{{ item.description }}</p>
              </div>
            </NuxtLink>
          </div>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<style></style>
