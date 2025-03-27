import { collection, doc, getDoc, type DocumentData } from "firebase/firestore"

export const useProjectDoc = () => {
  const db = useFirestore()
  const docState = useState<DocumentData | null>('projectDoc', () => null)

  const fetchDoc = async (projectId: string) => {
    try {
      if (docState.value) {
        if (docState.value.id === projectId) {
          return docState.value
        }
      }
      const docSnap = await getDoc(doc(collection(db, 'projects'), projectId))
      const data = docSnap.data()
      // 문서가 존재하지 않는 경우
      if (!data) {
        console.log('문서가 존재하지 않습니다.')
        return null
      }

      // 데이터 저장
      docState.value = {
        id: projectId,
        ...data
      }
      return docState.value
    } catch (error) {
      docState.value = null
    }
  }

  const clearDoc = () => {
    docState.value = null
  }

  return {
    doc: docState,
    fetchDoc,
    clearDoc
  }
}
