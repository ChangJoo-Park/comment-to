<script setup>
definePageMeta({
  layout: 'admin',
})
</script>
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">프로젝트 상세</h1>
    <div role="tablist" class="tabs mb-8">
      <NuxtLink to="/admin/p/123124" role="tab" class="tab">피드백</NuxtLink>
      <NuxtLink to="/admin/p/123124/changelogs" role="tab" class="tab">변경이력</NuxtLink>
      <NuxtLink to="/admin/p/123124/setting" role="tab" class="tab tab-active">설정</NuxtLink>
    </div>
    <div class="flex flex-col gap-4">
      <div class="px-2 border border-slate-200 rounded-xl px-8 py-4">
        <!-- 제목 -->
        <h1 class="text-lg font-bold mb-2">프로젝트 설정</h1>

        <div class="flex flex-col gap-4">
          <div>
            <div>프로젝트 이름</div>
          </div>
          <div class="flex flex-row gap-4">
            <input type="text" class="input input-bordered" />
            <button class="btn btn-primary">저장</button>
          </div>
        </div>
      </div>

      <div class="px-2 border border-slate-200 rounded-xl px-8 py-4">
        <h1 class="text-lg font-bold mb-2">피드백 추가 설정</h1>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <div>
              <div>피드백 입력 폼 타이틀</div>
            </div>
            <div class="flex flex-row gap-4">
              <input type="text" class="input input-bordered" />
              <button class="btn btn-primary">저장</button>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div>
              <div>피드백 입력 폼 안내문구</div>
            </div>
            <div class="flex flex-row gap-4">
              <textarea class="textarea textarea-bordered" />
              <button class="btn btn-primary">저장</button>
            </div>
          </div>
        </div>
      </div>

      <div class="px-2 border border-slate-200 rounded-xl px-8 py-4">
        <!-- 제목 -->
        <div class="flex flex-row items-center justify-between">
          <div class="flex flex-col">
            <h1 class="text-lg font-bold mb-2">아이템 상태</h1>
            <!-- 설명 -->
            <p class="text-sm text-gray-500 mb-4">아이템 상태를 설정합니다.</p>
          </div>
          <div class="btn btn-primary btn-sm">추가</div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-row items-center border border-slate-300 rounded-xl p-4">
            <div class="flex-1">
              <div class="flex flex-row gap-4 items-center">
                <div class="p-2 border border-dashed border-base-content rounded-lg">
                  <div class="w-4 h-4 bg-blue-500 rounded-full " />
                </div>
                <div class="min-w-24">진행중</div>
                <div>상세 설명</div>
              </div>
            </div>
            <div>
              수정, 삭제
            </div>
          </div>

          <div class="flex flex-row items-center border border-slate-300 rounded-xl p-4">
            <div class="flex-1">
              <div class="flex flex-row gap-4 items-center">
                <div class="p-2 border border-dashed border-base-content rounded-lg">
                  <div class="w-4 h-4 bg-blue-500 rounded-full " />
                </div>
                <div class="min-w-24">진행중</div>
                <div>상세 설명</div>
              </div>
            </div>
            <div>
              수정, 삭제
            </div>
          </div>
          <div class="flex flex-row items-center border border-slate-300 rounded-xl p-4">
            <div class="flex-1">
              <div class="flex flex-row gap-4 items-center">
                <div class="p-2 border border-dashed border-base-content rounded-lg">
                  <div class="w-4 h-4 bg-blue-500 rounded-full " />
                </div>
                <div class="min-w-24">진행중</div>
                <div>상세 설명</div>
              </div>
            </div>
            <div>
              수정, 삭제
            </div>
          </div>

          <div class="flex flex-row items-center border border-slate-300 rounded-xl p-4">
            <div class="flex-1">
              <div class="flex flex-row gap-4 items-center">
                <div class="p-2 border border-dashed border-base-content rounded-lg">
                  <div class="w-4 h-4 bg-blue-500 rounded-full " />
                </div>
                <div class="min-w-24">진행중</div>
                <div>상세 설명</div>
              </div>
            </div>
            <div>
              수정, 삭제
            </div>
          </div>
        </div>
      </div>

      <!-- 라벨 -->

      <div class="px-2 border border-slate-200 rounded-xl px-8 py-4">
        <h1 class="text-lg font-bold mb-2">라벨</h1>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <div>
              <div>아이템에 필터를 위한 라벨을 추가할 수 있습니다.</div>
            </div>
            <div>
              <div class="flex flex-row gap-2 items-center">
                <div class="flex w-64 flex-col gap-4">
                  작업중
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
