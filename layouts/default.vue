<script setup>
const { doc: project } = useProjectDoc()
</script>

<template>
  <div class="flex flex-col">
    <Suspense>
      <CHeader v-if="project" :name="project.name" />
    </Suspense>

    <slot />
  </div>
</template>
<style></style>
