<script setup>
import { useCreateFeedback } from '~/composables/useCreateFeedback'
import { useFetchFeedbacks } from '~/composables/useFetchFeedbacks'

const project = useRoute().params.project
const sort = ref('recent')
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
  e.target.blur()
}

const { fetchItems } = useFetchFeedbacks()

watch(sort, async () => {
  items.value = await fetchItems(sort.value)
}, { immediate: true })

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
        <div class="flex flex-row justify-between">
          <select class="rounded-md bg-white text-gray-700" v-model="sort">
            <option value="recent">최신순</option>
            <option value="recommend">추천순</option>
            <option value="comment">댓글순</option>
          </select>
          <input type="search" placeholder="검색" class="border border-gray-300 rounded-md p-2 bg-white" />
        </div>
        <Suspense>
          <div class="flex flex-col gap-4">
            <NuxtLink :to="`/p/${project}/comments/${item.id}`"
              class="flex flex-row gap-4 w-full p-4 rounded outline outline-gray-200 bg-gray-50 hover:bg-white animate-all items-center"
              v-for="item in items" :key="item.id">
              <div>
                <div class="flex flex-row gap-2">
                  <button type="button"
                    class="text-black bg-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white animate-all duration-300 outline outline-gray-200"
                    @click.prevent="handleClick(item.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                    <span class="text-sm">{{ item.votes }}</span>
                  </button>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex flex-row gap-2">
                  <h3 class="text-lg font-bold">{{ item.title }}</h3>
                </div>
                <p class="text-sm text-gray-500">{{ item.description }}</p>
                <div class="text-sm text-gray-500">
                  <span class="text-gray-500" v-if="item.createdAt">{{ item.createdAt.toDate().toLocaleString()
                    }}</span>
                </div>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
                <span class="">
                  {{ item.comments }}
                </span>
              </div>
            </NuxtLink>
          </div>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<style></style>
