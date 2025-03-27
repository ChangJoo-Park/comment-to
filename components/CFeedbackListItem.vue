<script setup>
const props = defineProps({
  project: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  onClick: {
    type: Function,
    required: true,
  },
})

const onUpVote = (id) => {
  props.onClick(id)
}
</script>
<template>
  <NuxtLink :to="`/p/${project}/comments/${item.id}`"
    class="flex flex-row gap-4 w-full px-4 py-8 items-center border-b border-gray-400">
    <div>
      <div class="flex flex-row gap-2">
        <button type="button"
          class="text-black bg-white px-4 py-2 rounded-md cursor-pointer hover:bg-black hover:text-white outline outline-gray-100 group flex flex-col gap-0"
          @click.prevent="onUpVote">
          <div>
            <Icon name="la:angle-up" />
          </div>
          <span class="text-sm">{{ item.votes ?? 0 }}</span>
        </button>
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <h3 class="text-lg font-bold mb-1">{{ item.title }}</h3>
      <p class="text-sm mb-4" v-if="item.description.length > 0">{{ item.description }}</p>
      <CDateTime :date="item.createdAt.toDate()" />
    </div>
    <div class="flex flex-row gap-1 items-center">
      <Icon name="la:comments" />
      <span class="">
        {{ item.comments ?? 0 }}
      </span>
    </div>
  </NuxtLink>

</template>
