export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    async (to) => {
      // 사용자 정보를 미리 가져오는 함수
      const fetchUserInformation = async () => {
        const { fetchDoc: fetchUserDoc, user } = useProjectUser();
        const auth = useFirebaseAuth()!;
        const currentUser = auth.currentUser;

        // 사용자가 로그인되어 있지만 사용자 정보가 없는 경우에만 가져옴
        if (currentUser && !user.value) {
          console.log("사용자 정보 가져오기 시작");
          await fetchUserDoc();
          console.log("사용자 정보 로딩 완료:", user.value ? "성공" : "실패");
        }

        return { user, currentUser };
      };

      // /admin 경로 처리
      // if (to.path.startsWith("/admin")) {
      //   console.log("admin 페이지 접속");
      //   const { user, currentUser } = await fetchUserInformation();

      //   // 로그인 확인 (익명 사용자도 불가)
      //   if (!currentUser || currentUser.isAnonymous) {
      //     console.log("관리자 접근 권한 없음: 로그인 필요");
      //     return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
      //   }

      //   // 사용자 문서 확인 (추가 권한 체크 가능)
      //   if (!user.value) {
      //     console.log("사용자 정보 없음");
      //     // 필요하다면 여기서 사용자 문서 생성 로직 추가 가능
      //   }
      // }

      // /p/ 경로 처리
      if (to.path.startsWith("/p/")) {
        console.log("프로젝트 페이지 접속");
        const { user } = await fetchUserInformation();

        // 슬러그 확인
        const slug = to.params.project;
        if (!slug) {
          console.log("프로젝트 ID 누락");
          return navigateTo("/404"); // 404 페이지로 리다이렉트
        }

        // 프로젝트 문서 가져오기
        const { fetchDoc, doc } = useProjectDoc();
        await fetchDoc(slug);

        if (!doc.value) {
          console.log("존재하지 않는 프로젝트:", slug);
          return navigateTo("/404"); // 404 페이지로 리다이렉트
        }

        console.log("프로젝트 정보 로딩 완료:", doc.value.name);
      }

      // 다른 경로는 상태 초기화
      else {
        const { clearDoc: clearProjectDoc } = useProjectDoc();
        clearProjectDoc();
      }
    },
    {
      global: true,
    }
  );
});
