<script setup>
const route = useRoute()
const project = route.params.project

onMounted(() => {
  useSeoMeta({
    title: `로드맵 - ${project}`,
  })
})
</script>

<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div class="container mx-auto max-w-screen-lg pt-8 px-4">
      <CPageTitle title="로드맵" />
    </div>
    <!-- 좌우로 overflow 스크롤이 되는 영역 -->
    <div class="container mx-auto max-w-screen-lg px-4 pb-4 grid grid-cols-3 gap-4">
      <CRoadmapLane :status="{ id: 'planned' }" title="논의중"
        :items="[{ id: '1', title: '이용내역 삭제', description: '상세 내역입니다.' },{ id: '2', title: '원격 줄서기 신청 후 대기가 많이 남은 상황에서는 메뉴 변경이 가능 했음 좋겠어요', description: '상세 내역입니다.' }]" />
      <CRoadmapLane :status="{ id: 'inProgress' }" title="진행중"
        :items="[{ id: '3', title: '회원가입 간소화', description: '상세 내역입니다.' },{ id: '4', title: '내앞 대기자 수를 실시간 알 수 있으면 좋겠어요...', description: '상세 내역입니다.' }]" />
      <CRoadmapLane :status="{ id: 'willShipped' }" title="배포예정"
        :items="[{ id: '5', title: '테스트', description: '상세 내역입니다.' },{ id: '6', title: '대기확정번호라는거 입력하는걸 몰라서 한참 더 기다렸네요. 이런건 미리 좀 알려주시기 바랍니다.', description: '상세 내역입니다.' }]" />
    </div>
  </div>
</template>

<style></style>
