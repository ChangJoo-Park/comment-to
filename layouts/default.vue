<script setup>
const { doc: project } = useProjectDoc()
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <Suspense>
      <CHeader :name="project.name" />
    </Suspense>

    <slot />
  </div>
</template>
<style></style>
