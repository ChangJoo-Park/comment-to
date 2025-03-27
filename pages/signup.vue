<script setup>
import { createUserWithEmailAndPassword } from 'firebase/auth';

definePageMeta({
  layout: 'auth',
})

const auth = useFirebaseAuth();

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const matchPassword = computed(() => {
  return password.value === passwordConfirm.value;
})

const signup = async () => {
  if (!matchPassword.value) {
    errorMessage.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = useCurrentUser();
    console.log("user -> ", user);
    navigateTo('/');
  } catch (e) {
    console.error(e);
    errorMessage.value = "회원가입에 실패했습니다. 다시 시도해 주세요.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col w-full max-w-md">
      <div class="text-center mb-4">
        <h1 class="text-3xl font-bold">회원가입</h1>
        <p class="py-2 text-sm">계정을 만들어 피드백 관리를 시작하세요</p>
      </div>

      <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <form @submit.prevent="signup">
            <!-- 에러 메시지 -->
            <div v-if="errorMessage" class="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ errorMessage }}</span>
            </div>

            <!-- 이메일 입력 -->
            <div class="form-control w-full mb-4">
              <label class="label block">
                <span class="label-text">이메일</span>
              </label>
              <input v-model="email" type="email" placeholder="your-email@example.com"
                class="input input-bordered w-full" required />
            </div>

            <!-- 비밀번호 입력 -->
            <div class="form-control w-full mb-4">
              <label class="label block">
                <span class="label-text">비밀번호</span>
              </label>
              <input v-model="password" type="password" placeholder="••••••••" class="input input-bordered w-full"
                required />
              <label class="label">
                <span class="label-text-alt">8자 이상의 비밀번호를 입력하세요</span>
              </label>
            </div>

            <!-- 비밀번호 확인 입력 -->
            <div class="form-control w-full">
              <label class="label block">
                <span class="label-text">비밀번호 확인</span>
              </label>
              <input v-model="passwordConfirm" type="password" placeholder="••••••••"
                class="input input-bordered w-full"
                :class="{ 'input-error': password && passwordConfirm && !matchPassword }" required />
              <label class="label" v-if="password && passwordConfirm && !matchPassword">
                <span class="label-text-alt text-error">비밀번호가 일치하지 않습니다</span>
              </label>
            </div>

            <!-- 회원가입 버튼 -->
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary" :class="{ 'loading': isLoading }"
                :disabled="isLoading || (password && passwordConfirm && !matchPassword)">
                {{ isLoading ? '처리중...' : '회원가입' }}
              </button>
            </div>
          </form>

          <!-- 소셜 로그인 섹션 -->
          <div class="divider">OR</div>

          <div class="flex flex-col gap-2">
            <button class="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 48 48">
                <path fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
                </path>
                <path fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
                </path>
                <path fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
                </path>
                <path fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
                </path>
              </svg>
              Google 계정으로 가입
            </button>

            <button class="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 16 16">
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub 계정으로 가입
            </button>
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <p>
          이미 계정이 있으신가요?
          <NuxtLink to="/login" class="link link-primary">로그인</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
