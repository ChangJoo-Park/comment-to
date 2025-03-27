import { collection, doc, getDoc, setDoc, type DocumentData } from "firebase/firestore";

export const useProjectUser = () => {
  const db = useFirestore();
  const docState = useState<DocumentData | null>("projectUserDoc", () => null);
  const isLoading = useState<boolean>("projectUserLoading", () => false);
  const error = useState<Error | null>("projectUserError", () => null);

  const fetchDoc = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const user = useCurrentUser();
      if (!user.value) {
        console.log("로그인 상태가 아닙니다.");
        docState.value = null;
        return null;
      }

      // 이미 로드된 데이터가 있고 ID가 일치하면 재사용
      if (docState.value && docState.value.id === user.value.uid) {
        console.log("이미 로드된 사용자 정보 사용");
        return docState.value;
      }

      console.log("Firestore에서 사용자 정보 가져오기:", user.value.uid);
      const docSnap = await getDoc(
        doc(collection(db, "users"), user.value.uid)
      );

      const data = docSnap.data();

      // 문서가 존재하지 않는 경우 기본 문서 생성 (선택적)
      if (!data) {
        console.log("사용자 문서가 존재하지 않습니다. 기본 문서 생성");
        const defaultUserData = {
          email: user.value.email || "",
          displayName: user.value.displayName || "",
          votes: [],
          createdAt: new Date()
        };

        // await setDoc(doc(collection(db, "users"), user.value.uid), defaultUserData);

        docState.value = {
          id: user.value.uid,
          ...defaultUserData
        };
        return docState.value;
      }

      // 데이터 저장
      docState.value = {
        id: user.value.uid,
        ...data,
      };
      console.log("사용자 정보 로드 성공");
      return docState.value;
    } catch (err) {
      console.error("사용자 정보 로드 오류:", err);
      error.value = err instanceof Error ? err : new Error(String(err));
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const clearDoc = () => {
    docState.value = null;
    error.value = null;
  };

  return {
    user: docState,
    isLoading,
    error,
    fetchDoc,
    clearDoc,
  };
};
