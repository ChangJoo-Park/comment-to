<script setup>
const route = useRoute()

function goBack() {
  navigateTo('/p/' + route.params.project + '/comments')
}
</script>
<template>
  <div class="container mx-auto max-w-screen-lg py-8">
    <div class="mb-8">
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md" @click="goBack">뒤로가기</button>
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
        <!-- 본문 -->
        <div class="w-full flex flex-col">
          <!-- 제목 -->
          <h1 class="text-2xl font-bold mb-2">안녕하세요 반갑습니다.</h1>
          <!-- 작성자 -->
          <p class="text-gray-500">
            작성자 •
            <span class="text-gray-500">작성일</span>
          </p>
          <!-- 작성일 -->


          <!-- 내용 -->
          <p class="text-gray-500">어떤 내용을 적을지 몰라서 아무말이나 적습니다.</p>

          <div class="w-full flex flex-row gap-2 justify-start mt-8">
            <!-- 수정 및 삭제 -->
            <button class="text-gray-500">수정</button>
            <button class="text-gray-500">삭제</button>
          </div>
        </div>
        <!-- 댓글 작성 폼 -->
        <div class="flex flex-col gap-2">
          <div class="font-bold">의견을 남겨주세요.</div>
          <textarea name="comment" id="comment" placeholder="댓글을 입력하세요" rows="2"
            class="w-full border border-gray-300 rounded-md p-2 bg-white" />
          <div class="flex flex-row justify-end">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md">작성</button>
          </div>
        </div>
        <!-- 댓글 목록 -->
        <div class="flex flex-col">
          <div class="w-full flex flex-col mb-4">
            <p class="text-black font-bold">댓글</p>
          </div>
          <div class="w-full flex flex-col gap-4">
            <div class="w-full px-4 py-4 outline outline-gray-200 bg-white rounded-lg">
              <div class="w-full flex flex-col space-y-2">
                <!-- 작성자 정보와 날짜 -->
                <div class="flex flex-row items-center gap-3">
                  <p class="text-sm font-medium text-gray-700">작성자</p>
                  <span class="text-xs text-gray-400">•</span>
                  <p class="text-sm text-gray-500">작성일</p>
                </div>
                <!-- 댓글 내용 -->
                <p class="mt-2 text-base text-gray-800 whitespace-pre-wrap break-words">
                  내용
                </p>
              </div>
            </div>

            <div class="w-full px-4 py-4 outline outline-gray-200 bg-white rounded-lg">
              <div class="w-full flex flex-col space-y-2">
                <!-- 작성자 정보와 날짜 -->
                <div class="flex flex-row items-center gap-3">
                  <p class="text-sm font-medium text-gray-700">작성자</p>
                  <span class="text-xs text-gray-400">•</span>
                  <p class="text-sm text-gray-500">작성일</p>
                </div>
                <!-- 댓글 내용 -->
                <p class="mt-2 text-base text-gray-800 whitespace-pre-wrap break-words">
                  내용
                </p>
              </div>
            </div>

            <div class="w-full px-4 py-4 outline outline-gray-200 bg-white rounded-lg">
              <div class="w-full flex flex-col space-y-2">
                <!-- 작성자 정보와 날짜 -->
                <div class="flex flex-row items-center gap-3">
                  <p class="text-sm font-medium text-gray-700">작성자</p>
                  <span class="text-xs text-gray-400">•</span>
                  <p class="text-sm text-gray-500">작성일</p>
                </div>
                <!-- 댓글 내용 -->
                <p class="mt-2 text-base text-gray-800 whitespace-pre-wrap break-words">
                  내용
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
