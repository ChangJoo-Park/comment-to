export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    // @ts-ignore
    async (to) => {
      if (to.path.startsWith("/p/")) {
        // 사용자 로그인 처리, 로그인 안했으면 익명 로그인
        const slug = to.params.project;

        if (!slug) {
          return navigateTo("/"); // TODO: 404
        }

        const { fetchDoc, doc } = useProjectDoc();
        await fetchDoc(slug);
        if (!doc.value) {
          return navigateTo("/"); // TODO: 404
        }
      } else {
        const { clearDoc } = useProjectDoc();
        clearDoc();
      }
    },
    {
      global: true,
    }
  );
});
