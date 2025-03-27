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
  status: {
    type: Object,
    required: false,
    default: () => null
  },
  onUpVoteClick: {
    type: Function,
    required: true,
  },
  onDownVoteClick: {
    type: Function,
    required: true,
  },
  hasVote: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emptyStatus = computed(() => {
  return props.status == {}
})

const onUpVote = (id) => {
  if (props.hasVote) {
    props.onDownVoteClick(id)
  } else {
    props.onUpVoteClick(id)
  }

}
</script>
<template>
  <NuxtLink
:to="`/p/${project}/comments/${item.id}`"
    class="flex flex-row gap-4 w-full px-4 py-8 items-center border-b border-gray-400">
    <div>
      <div class="flex flex-row gap-2">
        <button
          type="button"
          :class="[
            'px-4 py-2 rounded-md cursor-pointer flex flex-col gap-0 outline outline-gray-100 items-center justify-center',
            hasVote
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-white text-black hover:bg-black hover:text-white'
          ]"
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
      <p v-if="item.description.length > 0" class="text-sm mb-4">{{ item.description }}</p>
      <div v-if="!emptyStatus" class="flex flex-row gap-1 items-center">
        <div v-if="status" class="w-2 h-2 rounded-full" :style="{ backgroundColor: status?.color }"/>
        <span v-if="status" class="text-sm">{{ status?.displayName ?? '없음'}}</span>
        <CDateTime :date="item.createdAt.toDate()" />
      </div>
    </div>
    <div class="flex flex-row gap-1 items-center">
      <Icon name="la:comments" />
      <span class="">
        {{ item.comments ?? 0 }}
      </span>
    </div>
  </NuxtLink>

</template>
