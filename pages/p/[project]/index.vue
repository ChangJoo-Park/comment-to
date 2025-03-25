<script setup>
onMounted(() => {
  const { project } = useRoute().params
  useRouter().push(`/p/${project}/comments`)
})
</script>

<template>
  <div>
  </div>
</template>

<style scoped></style>
