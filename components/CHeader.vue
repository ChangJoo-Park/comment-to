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
const isMobileMenuOpen = ref(false)

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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div class="sticky top-0 z-30 bg-base-100 border-b border-base-200 shadow-sm">
    <div class="container mx-auto px-4 md:px-6 lg:px-0">
      <!-- 데스크탑 헤더 -->
      <div class="navbar py-2 h-16">
        <!-- 브랜드 영역 -->
        <div class="navbar-start">
          <div class="flex items-center gap-3">
            <img src="/icon.svg" alt="logo" class="w-10 h-10" />
            <h1 v-if="props.name" class="text-xl font-bold hidden sm:block">{{ props.name }}</h1>
          </div>
        </div>

        <!-- 네비게이션 링크 -->
        <div class="navbar-center hidden md:flex">
          <ul class="menu menu-horizontal px-1 gap-2">
            <li>
              <NuxtLink to="/p/test/comments" :class="[
                  'font-medium px-4 py-2 transition-colors duration-200',
                  active === 'comments'
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'hover:bg-base-200'
                ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                피드백
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/p/test/roadmap" :class="[
                  'font-medium px-4 py-2 transition-colors duration-200',
                  active === 'roadmap'
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'hover:bg-base-200'
                ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                로드맵
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/p/test/changelogs" :class="[
                  'font-medium px-4 py-2 transition-colors duration-200',
                  active === 'changelogs'
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'hover:bg-base-200'
                ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                변경이력
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 우측 사용자 정보 영역 -->
        <div class="navbar-end">
          <!-- 사용자 로그인 시 -->
          <div v-if="user && !user.isAnonymous" class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle flex items-center justify-center group">
              <div
                class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center uppercase font-bold group-hover:bg-primary/20">
                {{ user.email ? user.email.charAt(0) : 'U' }}
              </div>
            </div>
            <ul tabindex="0" class="menu dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52">
              <li class="menu-title font-bold pt-2 pb-1">
                <span class="truncate text-xs">{{ user.email }}</span>
              </li>
              <li><a @click.prevent="handleUserDropdown('settings')" class="flex items-center py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  설정
                </a></li>
              <li><a @click.prevent="handleUserDropdown('logout')" class="flex items-center py-3 text-error">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  로그아웃
                </a></li>
            </ul>
          </div>

          <!-- 로그인하지 않은 경우 -->
          <div v-else>
            <NuxtLink :to="`/login?redirect=${currentPath}`" class="btn btn-primary btn-sm">
              로그인
            </NuxtLink>
          </div>

          <!-- 모바일 메뉴 버튼 -->
          <button @click="toggleMobileMenu" class="btn btn-ghost btn-circle ml-2 md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 모바일 메뉴 (반응형) -->
      <div v-if="isMobileMenuOpen" class="md:hidden animate-fade-in-down border-t border-base-200 py-2 px-1">
        <ul class="menu w-full">
          <li>
            <NuxtLink to="/p/test/comments" :class="[
                'font-medium py-3 transition-colors duration-200',
                active === 'comments' ? 'text-primary font-bold' : ''
              ]" @click="isMobileMenuOpen = false">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              피드백
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/p/test/roadmap" :class="[
                'font-medium py-3 transition-colors duration-200',
                active === 'roadmap' ? 'text-primary font-bold' : ''
              ]" @click="isMobileMenuOpen = false">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              로드맵
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/p/test/changelogs" :class="[
                'font-medium py-3 transition-colors duration-200',
                active === 'changelogs' ? 'text-primary font-bold' : ''
              ]" @click="isMobileMenuOpen = false">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              변경이력
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.animate-fade-in-down {
  animation: fadeInDown 0.3s ease-in-out;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
