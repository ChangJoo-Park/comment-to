<script setup>
import { useCreateFeedback } from '~/composables/useCreateFeedback'
import { useFetchFeedbacks } from '~/composables/useFetchFeedbacks'
import { useUnfocus } from '~/composables/useUnfocus'
import { onKeyStroke } from '@vueuse/core'
import { Icon } from '#components'

const { unfocus } = useUnfocus()
const { doc: projectDoc } = useProjectDoc()
const project = useRoute().params.project
const sort = ref('recent')
const items = ref([])
const searchInput = ref(null)

const title = ref('')
const description = ref('')

const handleUpVote = async (id) => {
  const { upvote } = useUpvote()
  await upvote(id)
  items.value = await fetchItems(sort.value)
}

const handleSubmit = async (e) => {
  const { createFeedback } = useCreateFeedback()
  createFeedback(title.value.trim(), description.value.trim())
  title.value = ''
  description.value = ''
  unfocus()
  items.value = await fetchItems(sort.value)
}

const { fetchItems } = useFetchFeedbacks()

watch(sort, async () => {
  items.value = await fetchItems(sort.value)
}, { immediate: true })

const sortValue = computed(() => {
  switch (sort.value) {
    case 'recent':
      return '최신순'
    case 'recommend':
      return '추천순'
    case 'comment':
      return '댓글순'
    default:
      return '최신순'
  }
})

const clickSort = async (value) => {
  sort.value = value
  items.value = await fetchItems(sort.value)
  unfocus()
}

onKeyStroke(['k', 'K', 'meta'], (e) => {
  searchInput.value.focus()
})

onKeyStroke(['Escape'], (e) => {
  unfocus()
})

onMounted(() => {
  useSeoMeta({
    title: `피드백 - ${project}`,
  })
})
</script>
<template>
  <div class="container mx-auto max-w-screen-lg py-8">
    <CPageTitle title="피드백" />
    <div class="flex flex-col lg:flex-row gap-8">
      <div class="w-full lg:w-[400px]">
        <form action="" class="card bg-gray-50 shadow-sm flex flex-col gap-4 p-4" @submit.prevent="handleSubmit">
          <legend class="text-lg font-bold">요청사항</legend>
          <!-- 어드민에서 수정할 수 있어야함 -->
          <p class="text-sm text-gray-500">이 서비스 개선을 위한 제안을 해주세요.</p>
          <input type="text" class="input w-full" v-model="title" required placeholder="제목을 입력해주세요" />
          <textarea class="textarea w-full" placeholder="자세한 내용을 알려주세요 (옵션)" rows="8" v-model="description" />
          <input type="submit" value="남기기" class="btn btn-primary" />
        </form>
        <div class="mt-2 text-sm text-gray-500">
          Powered by <code>Comment</code>.
        </div>
      </div>
      <div class="w-full flex flex-col gap-4">
        <div class="flex flex-row justify-between">
          <div class="dropdown">
            <button tabindex="0" role="button" class="btn">
              <span>{{ sortValue }}</span>
            </button>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a @click="clickSort('recent')">최신순</a></li>
              <li><a @click="clickSort('recommend')">추천순</a></li>
              <li><a @click="clickSort('comment')">댓글순</a></li>
            </ul>
          </div>
          <label class="input">
            <Icon name="la:search" size="2em" />
            <input type="search" placeholder="검색" class="grow" ref="searchInput" />
            <kbd class="kbd kbd-sm">⌘</kbd>
            <kbd class="kbd kbd-sm">K</kbd>
          </label>
        </div>
        <div class="flex flex-col">
          <CFeedbackListItem :project="project" :item="item" v-for="item in items" :key="item.id"
            :onUpVoteClick="() => handleUpVote(item.id)" :status="getStatus(projectDoc, item.status)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
