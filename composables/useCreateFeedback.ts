import { getCurrentUser } from 'vuefire'
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore"
import { getAuth, signInAnonymously } from 'firebase/auth'

export const useCreateFeedback = () => {
  const db = useFirestore()
  const { doc: projectDoc } = useProjectDoc()

  const createFeedback = async (title: string, description: string) => {
    let user = await getCurrentUser()
    if (user == null) {
      const auth = getAuth();
      await signInAnonymously(auth)
      user = await getCurrentUser()
    }

    if (!projectDoc.value) {
      throw new Error('Project not found')
    }
    const itemsCollectionRef = collection(db, 'projects', projectDoc.value.id, 'items')
    const userRef = user ? doc(db, 'users', user.uid) : null

    // 새 문서 추가
    const newDoc = await addDoc(itemsCollectionRef, {
      title,
      description,
      createdAt: serverTimestamp(),
      createdBy: userRef,
      createdByUid: user?.uid || null, // uid도 함께 저장하면 편리
      isAnonymous: user?.isAnonymous,
      username: user?.displayName || null,
      avatar: user?.photoURL || null,
      email: user?.email || null,
    })
  }

  return {
    createFeedback,
  }
}
