<script setup>
import { animations } from '@formkit/drag-and-drop'
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";

const props = defineProps({
  status: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const [list, listItems] = useDragAndDrop(props.items, {
  group: "items",
  plugins: [animations()],
  onSort: (items) => {
    console.log('onSort -> ', items)
  },
  onTransfer: (items) => {
    console.log('onTransfer -> ', items)
  },
  onDragStart: () => {
    console.log('onDragStart')
  },
  onDragEnd: () => {
    console.log("drag end")
  },
});

</script>
<template>
  <div
    class="w-[300px] flex-shrink-0 bg-gray-100 rounded-md outline outline-gray-200 p-4 overflow-hidden flex flex-col gap-4">
    <CRoadmapLaneHeader :title="title" />
    <div ref="list" class="flex-1 overflow-y-auto flex flex-col gap-2 pb-8">
      <CRoadmapCard v-for="item in listItems" :key="item.id" :title="item.title" :description="item.description" />
    </div>
  </div>
</template>

<style></style>
