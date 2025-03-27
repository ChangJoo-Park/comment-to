<script setup>
const props = defineProps({
  status: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <div class="w-full flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-sm px-3 py-3 z-10">
    <div class="flex items-center space-x-3">
      <!-- 색상 표시 + 제목 -->
      <div class="flex items-center space-x-2">
        <div class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: status.color }"></div>
        <h3 class="text-base font-medium text-foreground/90 tracking-tight">{{ status.displayName }}</h3>
      </div>
    </div>

    <!-- 항목 수 배지 -->
    <div class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors" :style="{
        backgroundColor: status.color + '15',
        color: status.color,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: status.color + '30'
      }">
      {{ items?.length || 0 }}
    </div>
  </div>
</template>

<style scoped>
.sticky {
  /* 그림자 대신 미세한 경계선 사용 */
  box-shadow: none;
}

/* 호버 효과 */
.flex:hover .text-foreground\/90 {
  opacity: 1;
}

/* 애니메이션 */
.text-foreground\/90,
.rounded-full {
  transition: all 0.2s ease-in-out;
}
</style>
