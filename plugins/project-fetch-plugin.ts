export default defineNuxtPlugin(() => {
  addRouteMiddleware(async (to) => {
    if (to.path.startsWith('/p/')) {
      const slug = to.params.project

      if (!slug) {
        return navigateTo('/') // TODO: 404
      }

      const { fetchDoc, doc } = useProjectDoc()
      await fetchDoc(slug)
      console.log('doccccc -> ', doc.value)
      if (!doc.value) {
        return navigateTo('/') // TODO: 404
      }
    } else {
      const { clearDoc } = useProjectDoc()
      clearDoc()
    }
  },
  {
    global: true,
  },
  )
})
