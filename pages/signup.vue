<script setup>
import { createUserWithEmailAndPassword } from 'firebase/auth';

definePageMeta({
  layout: 'auth',
})

const auth = useFirebaseAuth();

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const matchPassword = computed(() => {
  return password.value === passwordConfirm.value;
})

const signup = async () => {
  if (!matchPassword.value) {
    console.error("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = useCurrentUser();
    console.log("user -> ", user);
    // redirect()
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <div class="flex flex-row w-full items-center justify-center">
    <div class="flex flex-col items-center justify-center">
      <form action="" @submit.prevent="signup">
        <h1 class="text-2xl font-bold mb-4 text-center">회원가입</h1>
        <div class="form-control mb-2">
          <label class="label">
            <span class="label-text">이메일</span>
          </label>
          <input v-model="email" type="email" class="input input-bordered">
        </div>
        <div class="form-control mb-2">
          <label class="label">
            <span class="label-text">비밀번호</span>
          </label>
          <input v-model="password" type="password" class="input input-bordered">
        </div>
        <div class="form-control mb-2">
          <label class="label">
            <span class="label-text">비밀번호 확인</span>
          </label>
          <input v-model="passwordConfirm" type="password" class="input input-bordered">
        </div>
        <button class="btn btn-primary">보내기</button>
      </form>
    </div>
  </div>
</template>
