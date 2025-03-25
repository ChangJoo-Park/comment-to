<script setup>
definePageMeta({
  layout: 'auth',
})
</script>
<template>
  <div class="flex flex-row w-full">
    <div class="flex-1 bg-slate-400">
      <img src="https://nexus.daisyui.com/images/auth/auth-hero.png" alt="">
    </div>
    <div class="">
      <form action="">
        <h1 class="text-2xl font-bold">Login</h1>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="email" class="input input-bordered" />
        </div>
        <button class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>
