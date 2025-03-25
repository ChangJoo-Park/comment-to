<template>
  <div class="flex w-screen h-screen bg-base-200 flex">
    <AdminSidebar />
    <main class="flex-1 p-6 border rounded-xl m-4 shadow-xl bg-base-100 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>
