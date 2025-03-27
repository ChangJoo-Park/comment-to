import { collection, doc, getDoc, type DocumentData } from "firebase/firestore";

export const useProjectUser = () => {
  const db = useFirestore();
  const docState = useState<DocumentData | null>("projectUserDoc", () => null);

  const fetchDoc = async () => {
    try {
      const user = useCurrentUser();
      if (user.value == null) {
        console.log("로그인 상태가 아닙니다.");
        return;
      }
      const docSnap = await getDoc(
        doc(collection(db, "users"), user.value.uid)
      );
      const data = docSnap.data();
      // 문서가 존재하지 않는 경우
      if (!data) {
        console.log("문서가 존재하지 않습니다.");
        return null;
      }

      // 데이터 저장
      docState.value = {
        id: user.value.uid,
        ...data,
      };
      console.log("사용자 정보 있음");
      return docState.value;
    } catch (error) {
      console.error(error);
      docState.value = null;
    }
  };

  const clearDoc = () => {
    docState.value = null;
  };

  return {
    user: docState,
    fetchDoc,
    clearDoc,
  };
};
