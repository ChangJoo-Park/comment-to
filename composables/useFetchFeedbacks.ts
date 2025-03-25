import { getCurrentUser } from 'vuefire'
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp } from "firebase/firestore"
import { getAuth, signInAnonymously } from 'firebase/auth'

export const useFetchFeedbacks = () => {
  const db = useFirestore()
  const { doc: projectDoc } = useProjectDoc()

  const fetchItems = async () => {
    if (!projectDoc.value) {
      throw new Error('Project not found')
    }
    const itemsCollectionRef = collection(db, 'projects', projectDoc.value.id, 'items')
    const items = await getDocs(itemsCollectionRef)
    return items.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  const fetchItem = async (id: string) => {
    if (!projectDoc.value) {
      throw new Error('Project not found')
    }
    const item = await getDoc(doc(db, 'projects', projectDoc.value.id, 'items', id))
    return { id: item.id, ...item.data() }
  }

  const fetchComments = async (id: string) => {
    if (!projectDoc.value) {
      throw new Error('Project not found')
    }

      console.log('items id => ', id)
    const comments = await getDocs(collection(db, 'projects', projectDoc.value.id, 'items', id, 'comments'))
    console.log('comments => ', comments)
    return comments.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  return {
    fetchItems,
    fetchItem,
    fetchComments,
  }
}
