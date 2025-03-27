<script setup>
const props = defineProps({
  name: {
    type: String,
    required: false,
    default: ''
  }
})

const auth = useFirebaseAuth()
const route = useRoute()
const currentPath = computed(() => {
  return route.path
})

const active = computed(() => {
  const route = useRoute()
  if (route.path.includes('comments')) {
    return 'comments'
  } else if (route.path.includes('roadmap')) {
    return 'roadmap'
  } else if (route.path.includes('changelogs')) {
    return 'changelogs'
  }
})
const user = ref(null)

onMounted(() => {
  useFirebaseAuth().onAuthStateChanged((value) => {
    user.value = value
  })
})

const handleUserDropdown = (key) => {
  const { unfocus } = useUnfocus()
  unfocus()

  switch(key) {
    case 'settings':
      console.log('settings')
      break
    case 'logout':
      console.log('logout')
      auth.signOut()
      break
  }
}

</script>
<template>
  <div class="sticky top-0 z-10 bg-white border-b border-gray-200">
    <div class="c-header container mx-auto py-2">
      <div class="flex flex-row gap-2 items-center mr-8">
        <img src="/icon.svg" alt="logo" class="w-12 h-12" />
        <div>
          <h1 v-if=" props.name" class="text-2xl font-bold">{{ props.name }}</h1>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <NuxtLink to="/p/test/comments" class="font-bold hover:underline hover:text-blue-500"
          :class="{ 'text-blue-500': active === 'comments' }">피드백</NuxtLink>
        <NuxtLink to="/p/test/roadmap" class="font-bold hover:underline hover:text-blue-500"
          :class="{ 'text-blue-500': active === 'roadmap' }">로드맵</NuxtLink>
        <NuxtLink to="/p/test/changelogs" class="font-bold hover:underline hover:text-blue-500"
          :class="{ 'text-blue-500': active === 'changelogs' }">변경이력</NuxtLink>
      </div>
      <div class="flex-1"></div>
      <div>
        <div v-if="user" class="flex flex-row gap-2 items-center">
          <div class="dropdown">
            <div tabindex="0" class="flex flex-row gap-2 items-center select-none cursor-pointer">
              <div class="w-8 h-8 rounded-full bg-gray-200"></div>
              <div class="font-bold text-sm">{{ user.email }}</div>
            </div>
            <ul tabindex="0" class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li><a @click.prevent="handleUserDropdown('settings')">설정</a></li>
              <li><a @click.prevent="handleUserDropdown('logout')">로그아웃</a></li>
            </ul>
          </div>

        </div>
        <div v-else>
          <NuxtLink :to="`/login?redirect=${currentPath}`" class="font-bold hover:underline hover:text-blue-500">
            로그인
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.c-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.c-header-brand {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 2rem;
}
</style>
