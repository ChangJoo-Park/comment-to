import { getCurrentUser } from 'vuefire'
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore"
import { getAuth, signInAnonymously } from 'firebase/auth'

export const useCreateComment = () => {
  const db = useFirestore()
  const { doc: projectDoc } = useProjectDoc()

  const createComment = async (itemId: string, comment: string) => {
    let user = await getCurrentUser()

    if (user == null) {
      // 댓글은 로그인 시키는 것도 괜찮겠다
      const auth = getAuth();
      await signInAnonymously(auth)
      user = await getCurrentUser()
    }

    if (!projectDoc.value) {
      throw new Error('Project not found')
    }

    const itemsCollectionRef = collection(db, 'projects', projectDoc.value.id, 'items', itemId, 'comments')
    const userRef = user ? doc(db, 'users', user.uid) : null

    // 새 문서 추가
    const newDoc = await addDoc(itemsCollectionRef, {
      comment,
      createdAt: serverTimestamp(),
      createdBy: userRef,
      createdByUid: user?.uid || null, // uid도 함께 저장하면 편리
      username: user?.displayName || null,
      avatar: user?.photoURL || null,
      email: user?.email || null,
      isAnonymous: user?.isAnonymous,
    })

    const commentDoc = await getDoc(doc(db, 'projects', projectDoc.value.id, 'items', itemId, 'comments', newDoc.id))

    return {
      id: newDoc.id,
      ...commentDoc.data(),
    }
  }

  return {
    createComment,
  }
}
