<script setup></script>
<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div class="container mx-auto max-w-screen-lg pt-8">
      <CPageTitle title="로드맵" />
    </div>
    <!-- 좌우로 overflow 스크롤이 되는 영역 -->
    <div class="w-full h-full overflow-x-auto flex flex-row gap-4 px-4 pb-4">
      <div
        class="w-[300px] flex-shrink-0 bg-gray-100 rounded-md outline outline-gray-200 p-4 overflow-hidden flex flex-col gap-4">
        <!-- Header -->
        <div class="w-full flex flex-row justify-start sticky top-0">
          <p class="text-lg text-black font-bold">논의중</p>
        </div>

        <!-- Card -->
        <div class="flex-1 overflow-y-auto flex flex-col gap-2 pb-8">
          <div class="w-full flex flex-col gap-4">
            <div class="w-full bg-white rounded-md outline outline-gray-200 p-4">
              <p class="text-sm font-bold">주요 기능</p>
              <p class="text-sm text-gray-500">주요 기능을 설명합니다.</p>
            </div>
          </div>
          <div class="w-full flex flex-col gap-4">
            <div class="w-full bg-white rounded-md outline outline-gray-200 p-4">
              <p class="text-sm font-bold">주요 기능</p>
              <p class="text-sm text-gray-500">주요 기능을 설명합니다.</p>
            </div>
          </div>
          <div class="w-full flex flex-col gap-4">
            <div class="w-full bg-white rounded-md outline outline-gray-200 p-4">
              <p class="text-sm font-bold">주요 기능</p>
              <p class="text-sm text-gray-500">주요 기능을 설명합니다.</p>
            </div>
          </div>
          <div class="w-full flex flex-col gap-4">
            <div class="w-full bg-white rounded-md outline outline-gray-200 p-4">
              <p class="text-sm font-bold">주요 기능</p>
              <p class="text-sm text-gray-500">주요 기능을 설명합니다.</p>
            </div>
          </div>
          <div class="w-full flex flex-col gap-4">
            <div class="w-full bg-white rounded-md outline outline-gray-200 p-4">
              <p class="text-sm font-bold">주요 기능</p>
              <p class="text-sm text-gray-500">주요 기능을 설명합니다.</p>
            </div>
          </div>
          <div class="w-full flex flex-col gap-4">
            <div class="w-full bg-white rounded-md outline outline-gray-200 p-4">
              <p class="text-sm font-bold">주요 기능</p>
              <p class="text-sm text-gray-500">주요 기능을 설명합니다.</p>
            </div>
          </div>
          <div class="w-full flex flex-col gap-4">
            <div class="w-full bg-white rounded-md outline outline-gray-200 p-4">
              <p class="text-sm font-bold">주요 기능</p>
              <p class="text-sm text-gray-500">주요 기능을 설명합니다.</p>
            </div>
          </div>
          <div class="w-full flex flex-col gap-4">
            <div class="w-full bg-white rounded-md outline outline-gray-200 p-4">
              <p class="text-sm font-bold">주요 기능</p>
              <p class="text-sm text-gray-500">주요 기능을 설명합니다.</p>
            </div>
          </div>
          <div class="w-full flex flex-col gap-4">
            <div class="w-full bg-white rounded-md outline outline-gray-200 p-4">
              <p class="text-sm font-bold">주요 기능</p>
              <p class="text-sm text-gray-500">주요 기능을 설명합니다.</p>
            </div>
          </div>
          <div class="w-full flex flex-col gap-4">
            <div class="w-full bg-white rounded-md outline outline-gray-200 p-4">
              <p class="text-sm font-bold">주요 기능</p>
              <p class="text-sm text-gray-500">주요 기능을 설명합니다.</p>
            </div>
          </div>

        </div>
      </div>

      <div class="w-[300px] flex-shrink-0 bg-gray-100 rounded-md outline outline-gray-200 p-4">
        <div class="w-full flex flex-row justify-start sticky top-0 bg-gray-100">
          <p class="text-lg text-black font-bold">진행중</p>
        </div>
      </div>

      <div class="w-[300px] flex-shrink-0 bg-gray-100 rounded-md outline outline-gray-200 p-4">
        <div class="w-full flex flex-row justify-start sticky top-0 bg-gray-100">
          <p class="text-lg text-black font-bold">출시예정</p>
        </div>
      </div>

      <div class="w-[300px] flex-shrink-0 bg-gray-100 rounded-md outline outline-gray-200 p-4">
        <div class="w-full flex flex-row justify-start sticky top-0 bg-gray-100">
          <p class="text-lg text-black font-bold">출시됨</p>
        </div>

      </div>
    </div>
  </div>
</template>

<style></style>
