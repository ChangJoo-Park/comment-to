<script setup>
import { useCreateFeedback } from '~/composables/useCreateFeedback'
import { useFetchFeedbacks } from '~/composables/useFetchFeedbacks'
import { useUnfocus } from '~/composables/useUnfocus'
import { onKeyStroke } from '@vueuse/core'
import { Icon } from '#components'

const { unfocus } = useUnfocus()
const { doc: projectDoc } = useProjectDoc()
const { user, fetchDoc: fetchUserDoc } = useProjectUser()
const project = useRoute().params.project
const sort = ref('recent')
const items = ref([])
const searchInput = ref(null)
const isLoading = ref(false)
const searchQuery = ref('')
const isUserLoading = ref(false)

const title = ref('')
const description = ref('')

// 사용자 로그인 상태 확인
const auth = useFirebaseAuth()
const isLoggedIn = computed(() => {
  return auth.currentUser != null
})

// 컴포넌트 마운트 시 사용자 정보 확인 및 로드
onMounted(async () => {
  useSeoMeta({
    title: `피드백 - ${project}`,
  })

  // 사용자 정보가 아직 없고 로그인 되어 있다면 정보 가져오기
  if (!user.value && isLoggedIn.value) {
    isUserLoading.value = true
    try {
      await fetchUserDoc()
      console.log("사용자 정보 로드 완료")
    } catch (error) {
      console.error("사용자 정보 로드 실패:", error)
    } finally {
      isUserLoading.value = false
    }
  }
})

// 투표 상태 최적화를 위한 계산된 속성
const userVotes = computed(() => {
  return user.value?.votes || []
})

const handleUpVote = async (id) => {
  unfocus()

  // 로그인 확인
  if (!isLoggedIn.value) {
    // 익명 로그인 또는 로그인 페이지로 이동 로직
    const confirm = window.confirm('투표하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')
    if (confirm) {
      navigateTo(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
    }
    return
  }

  isLoading.value = true
  try {
    const { vote } = useUpvote()
    await vote(id, 'up')
    items.value = await fetchItems(sort.value)
    await fetchUserDoc() // 최신 사용자 정보 업데이트
  } catch (error) {
    console.error("투표 처리 중 오류 발생:", error)
    // 사용자에게 오류 알림
  } finally {
    isLoading.value = false
  }
}

const handleDownVote = async (id) => {
  unfocus()

  // 로그인 확인
  if (!isLoggedIn.value) {
    const confirm = window.confirm('투표를 취소하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')
    if (confirm) {
      navigateTo(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
    }
    return
  }

  isLoading.value = true
  try {
    const { vote } = useUpvote()
    await vote(id, 'down')
    items.value = await fetchItems(sort.value)
    await fetchUserDoc() // 최신 사용자 정보 업데이트
  } catch (error) {
    console.error("투표 취소 중 오류 발생:", error)
    // 사용자에게 오류 알림
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async (_) => {
  if (!title.value.trim()) return

  isLoading.value = true
  try {
    const { createFeedback } = useCreateFeedback()
    await createFeedback(title.value.trim(), description.value.trim())
    title.value = ''
    description.value = ''
    unfocus()
    items.value = await fetchItems(sort.value)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const { fetchItems } = useFetchFeedbacks()

watch(sort, async () => {
  isLoading.value = true
  try {
    items.value = await fetchItems(sort.value)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}, { immediate: true })

const sortValue = computed(() => {
  switch (sort.value) {
    case 'recent': return '최신순'
    case 'recommend': return '추천순'
    case 'comment': return '댓글순'
    default: return '최신순'
  }
})

const clickSort = async (value) => {
  sort.value = value
  unfocus()
}

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value
  const query = searchQuery.value.toLowerCase()
  return items.value.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  )
})

onKeyStroke(['k', 'K', 'meta'], (_) => {
  searchInput.value?.focus()
})

onKeyStroke(['Escape'], (_) => {
  unfocus()
})
</script>

<template>
  <div class="container mx-auto max-w-screen-lg py-6 px-4 md:px-6 lg:px-0">
    <CPageTitle title="피드백" />

    <!-- 로그인/사용자 정보 로딩 상태 표시 -->
    <div v-if="isUserLoading" class="alert alert-info mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>사용자 정보를 불러오는 중입니다...</span>
    </div>

    <div class="flex flex-col lg:flex-row gap-8 mt-6">
      <!-- 피드백 작성 폼 섹션 -->
      <div class="w-full lg:w-[400px]">
        <div class="card bg-base-100 shadow-lg overflow-hidden">
          <div class="card-body p-6">
            <h2 class="card-title text-xl font-bold mb-2">요청사항</h2>
            <p class="text-sm text-base-content/70 mb-4">이 서비스 개선을 위한 제안을 해주세요.</p>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div class="form-control">
                <input v-model="title" type="text" class="input input-bordered w-full" required
                  placeholder="제목을 입력해주세요">
              </div>

              <div class="form-control">
                <textarea v-model="description" class="textarea textarea-bordered w-full h-32"
                  placeholder="자세한 내용을 알려주세요 (옵션)"></textarea>
              </div>

              <button type="submit" class="btn btn-primary w-full" :class="{ 'loading': isLoading }"
                :disabled="isLoading || !title.trim()">
                {{ isLoading ? '처리중...' : '피드백 등록하기' }}
              </button>
            </form>
          </div>
        </div>

        <div class="mt-3 text-sm text-base-content/60 text-center">
          Powered by <span class="font-semibold">Comment</span>
        </div>
      </div>

      <!-- 피드백 목록 섹션 -->
      <div class="w-full flex flex-col gap-6">
        <div class="flex flex-col sm:flex-row justify-between gap-4">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              {{ sortValue }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul tabindex="0" class="dropdown-content z-10 menu p-2 shadow-lg bg-base-100 rounded-box w-52">
              <li><a @click="clickSort('recent')" class="flex items-center" :class="{ 'active': sort === 'recent' }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  최신순
                </a></li>
              <li><a @click="clickSort('recommend')" class="flex items-center"
                  :class="{ 'active': sort === 'recommend' }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  추천순
                </a></li>
              <li><a @click="clickSort('comment')" class="flex items-center" :class="{ 'active': sort === 'comment' }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  댓글순
                </a></li>
            </ul>
          </div>

          <div class="join">
            <div class="join-item bg-base-100 border border-base-300 rounded-l-lg px-3 flex items-center">
              <Icon name="la:search" size="1.25em" class="text-base-content/60" />
            </div>
            <input ref="searchInput" v-model="searchQuery" type="search" placeholder="피드백 검색하기"
              class="join-item input input-bordered flex-1 min-w-[200px]" />
            <div
              class="join-item hidden sm:flex bg-base-100 border border-l-0 border-base-300 rounded-r-lg px-2 items-center gap-1">
              <kbd class="kbd kbd-sm">⌘</kbd>
              <kbd class="kbd kbd-sm">K</kbd>
            </div>
          </div>
        </div>

        <!-- 피드백 목록 -->
        <div v-if="isLoading && !items.length" class="flex justify-center py-12">
          <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <div v-else-if="!filteredItems.length" class="card bg-base-100 shadow p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-base-content/30" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="text-xl font-bold mt-4">피드백이 없습니다</h3>
          <p class="text-base-content/70 mt-2">첫 번째 피드백을 남겨보세요!</p>
        </div>

        <div v-else class="flex flex-col gap-4">
          <CFeedbackListItem v-for="item in filteredItems" :key="item.id" :project="project" :item="item"
            :on-up-vote-click="() => handleUpVote(item.id)" :on-down-vote-click="() => handleDownVote(item.id)"
            :status="getStatus(projectDoc, item.status)" :has-vote="userVotes.includes(item.id)" />
        </div>

        <div class="flex justify-center mt-4" v-if="filteredItems.length > 0">
          <button class="btn btn-ghost btn-sm" @click="loadMore">더 보기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-hover-effect {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-hover-effect:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
