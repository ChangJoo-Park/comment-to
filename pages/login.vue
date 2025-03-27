<script setup>
import { signInWithEmailAndPassword } from 'firebase/auth';

definePageMeta({
  layout: 'auth',
})

const auth = useFirebaseAuth();

const email = ref("");
const password = ref("");

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    redirect()
  } catch (e) {
    console.error(e);
  }
}

const redirect = () => {
  const redirect = useRoute().query.r;
  if (redirect) {
    navigateTo(redirect);
  } else {
    navigateTo("/");
  }
}
</script>
<template>
  <div class="flex flex-row w-full items-center justify-center">
    <div class="flex flex-col items-center justify-center">
      <form action="" @submit.prevent="login">
        <h1 class="text-2xl font-bold mb-4 text-center">로그인</h1>
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
        <button class="btn btn-primary">로그인</button>
      </form>
    </div>
  </div>
</template>
