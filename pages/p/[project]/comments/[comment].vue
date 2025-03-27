<script setup>
import { Suspense } from 'vue'
import CDateTime from '~/components/CDateTime.vue'
import CUsername from '~/components/CUsername.vue'

const { doc: projectDoc } = useProjectDoc()
const route = useRoute()
const item = ref(null)
const comments = ref([])
const user = useCurrentUser()
const isLoading = ref(true)
const newComment = ref('')
const isSubmitting = ref(false)
const isVoting = ref(false)
const { user: userDoc, fetchDoc: fetchUserDoc } = useProjectUser()

function goBack() {
  try {
    const router = useRouter();
    router.back(); // 이전 페이지로 이동
  } catch {
    // 히스토리가 없는 경우 목록 페이지로
    return navigateTo('/p/' + route.params.project + '/comments')
  }
}

const { fetchItem, fetchComments } = useFetchFeedbacks()

onMounted(async () => {
  isLoading.value = true
  try {
    item.value = await fetchItem(route.params.comment)
    comments.value = await fetchComments(route.params.comment)
    // 사용자 정보가 없으면 불러오기
    if (user.value && !userDoc.value) {
      await fetchUserDoc()
    }
    useSeoMeta({
      title: `${item?.value?.title}`,
      description: item?.value?.description,
    })
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

// 사용자 투표 상태 확인
const hasVoted = computed(() => {
  if (!userDoc.value || !userDoc.value.votes) return false
  return userDoc.value.votes.includes(route.params.comment)
})

// 투표 처리 함수
const handleVote = async (type) => {
  if (!user.value) {
    // 로그인 필요 알림
    const confirm = window.confirm('투표하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')
    if (confirm) {
      navigateTo(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
    }
    return
  }

  isVoting.value = true
  try {
    const { vote } = useUpvote()
    await vote(route.params.comment, type)

    // 투표 후 아이템 정보와 사용자 정보 업데이트
    item.value = await fetchItem(route.params.comment)
    await fetchUserDoc()
  } catch (error) {
    console.error('투표 중 오류 발생:', error)
    alert(`투표 처리 중 오류가 발생했습니다: ${error.message}`)
  } finally {
    isVoting.value = false
  }
}

const submitComment = async (text) => {
  if (!text.trim()) return

  isSubmitting.value = true
  try {
    const { createComment } = useCreateComment()
    const comment = await createComment(route.params.comment, text)
    comments.value.push(comment)
    newComment.value = ''
  } catch (error) {
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}

const getStatus = (value) => {
  return projectDoc?.value?.status.find((status) => status.key === value)
}

const statusColor = computed(() => {
  const status = getStatus(item?.value?.status)
  return status?.color || '#777777'
})

const statusDisplayName = computed(() => {
  const status = getStatus(item?.value?.status)
  return status?.displayName || '없음'
})
</script>

<template>
  <div class="container mx-auto max-w-screen-lg py-6 px-4 md:px-6 lg:px-0">
    <!-- 상단 네비게이션 -->
    <div class="mb-6">
      <button @click="goBack" class="btn btn-ghost btn-sm gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        뒤로가기
      </button>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="flex justify-center py-20">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- 메인 콘텐츠 -->
    <div v-else-if="item" class="flex flex-col md:flex-row gap-8">
      <!-- 사이드 정보 패널 -->
      <div class="w-full md:w-[300px] lg:w-[350px] order-2 md:order-1">
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body p-6">
            <h2 class="card-title text-lg mb-4">피드백 정보</h2>

            <!-- 상태 표시 -->
            <div class="flex justify-between items-center py-3 border-b border-base-200">
              <span class="text-base-content/70">상태</span>
              <div class="badge" :style="{
                backgroundColor: statusColor + '20',
                color: statusColor,
                borderColor: statusColor
              }">
                <span class="inline-block w-2 h-2 rounded-full mr-1.5" :style="{ backgroundColor: statusColor }"></span>
                {{ statusDisplayName }}
              </div>
            </div>

            <!-- 투표수 표시 및 투표 버튼 -->
            <div class="flex flex-col gap-3 py-3 border-b border-base-200">
              <div class="flex justify-between items-center">
                <span class="text-base-content/70">투표수</span>
                <div class="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span class="font-medium">{{ item.votes || 0 }}</span>
                </div>
              </div>

              <!-- 투표 버튼 -->
              <div class="flex items-center justify-center gap-2">
                <button v-if="hasVoted" @click="handleVote('down')" class="btn btn-sm btn-outline flex-1"
                  :class="{ 'loading': isVoting }" :disabled="isVoting">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2" />
                  </svg>
                  투표 취소
                </button>
                <button v-else @click="handleVote('up')" class="btn btn-sm btn-primary flex-1"
                  :class="{ 'loading': isVoting }" :disabled="isVoting">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  투표하기
                </button>
              </div>
            </div>

            <!-- 댓글수 표시 -->
            <div class="flex justify-between items-center py-3 border-b border-base-200">
              <span class="text-base-content/70">댓글</span>
              <div class="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clip-rule="evenodd" />
                </svg>
                <span class="font-medium">{{ comments.length }}</span>
              </div>
            </div>

            <!-- 작성일 표시 -->
            <div class="flex justify-between items-center py-3">
              <span class="text-base-content/70">작성일</span>
              <CDateTime :date="item.createdAt.toDate()" class="text-sm" />
            </div>
          </div>
        </div>

        <!-- 로그인 안내 카드 (비로그인 사용자에게만 표시) -->
        <div v-if="!user" class="card bg-base-100 shadow-lg mt-4">
          <div class="card-body p-4">
            <p class="text-sm text-base-content/80 mb-2">투표 및 댓글 작성을 위해 로그인해주세요.</p>
            <NuxtLink :to="`/login?redirect=${encodeURIComponent(window.location.pathname)}`"
              class="btn btn-primary btn-sm w-full">
              로그인하기
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- 메인 콘텐츠 영역 -->
      <div class="w-full order-1 md:order-2">
        <div class="card bg-base-100 shadow-lg mb-8">
          <div class="card-body p-6">
            <!-- 제목 영역 -->
            <h1 class="text-2xl font-bold mb-4">{{ item.title }}</h1>

            <!-- 작성자 정보 -->
            <div class="flex items-center gap-2 mb-6 text-base-content/70">
              <CUsername :username="item.username" :email="item.email" />
              <span>•</span>
              <CDateTime :date="item.createdAt.toDate()" />
            </div>

            <!-- 내용 -->
            <div class="prose max-w-none">
              <p>{{ item.description }}</p>
            </div>

            <!-- 작성자 전용 액션 버튼 -->
            <div v-if="!!user && user?.uid == item.createdByUid" class="mt-8 flex gap-2">
              <button class="btn btn-outline btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                수정
              </button>
              <button class="btn btn-outline btn-error btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                삭제
              </button>
            </div>
          </div>
        </div>

        <!-- 댓글 작성 폼 (로그인 사용자만 표시) -->
        <div v-if="user" class="card bg-base-100 shadow-lg mb-8">
          <div class="card-body p-6">
            <h2 class="card-title text-lg mb-4">댓글 작성</h2>
            <div class="form-control">
              <textarea v-model="newComment" class="textarea textarea-bordered h-24"
                placeholder="의견을 남겨주세요..."></textarea>
            </div>
            <div class="card-actions justify-end mt-4">
              <button @click="submitComment(newComment)" class="btn btn-primary" :class="{ 'loading': isSubmitting }"
                :disabled="isSubmitting || !newComment.trim()">
                댓글 등록
              </button>
            </div>
          </div>
        </div>

        <!-- 댓글 목록 -->
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="card-title text-lg">댓글 {{ comments.length }}개</h2>
              <div class="badge badge-neutral">최신순</div>
            </div>

            <div v-if="!comments.length" class="text-center py-8 text-base-content/60">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-base-content/40" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
            </div>

            <div v-else class="divide-y divide-base-200 flex flex-col gap-4">
              <CCommentFeedback v-for="comment in comments" :key="comment.id" :comment="comment"
                :isOwner="comment.createdByUid == user?.uid" class="py-4 first:pt-0 last:pb-0" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 데이터가 없는 경우 -->
    <div v-else-if="!isLoading" class="card bg-base-100 shadow-lg p-12 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-base-content/30" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-xl font-bold mt-4">피드백을 찾을 수 없습니다</h3>
      <p class="text-base-content/70 mt-2 mb-6">요청하신 피드백이 존재하지 않거나 삭제되었습니다.</p>
      <button @click="goBack" class="btn btn-primary mx-auto">목록으로 돌아가기</button>
    </div>
  </div>
</template>

<style>
.comment-transition-enter-active,
.comment-transition-leave-active {
  transition: all 0.3s ease;
}

.comment-transition-enter-from,
.comment-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
