import { getCurrentUser } from 'vuefire'
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore"
import { getAuth, signInAnonymously } from 'firebase/auth'

export const useFetchFeedbacks = () => {
  const db = useFirestore()
  const { doc: projectDoc } = useProjectDoc()

  const fetchItems = async (sort: string) => {
    if (!projectDoc.value) {
      throw new Error('Project not found')
    }
    const itemsCollectionRef = collection(db, 'projects', projectDoc.value.id, 'items')
    let sortKey = '';
    switch (sort) {
      case 'recent':
        sortKey = 'createdAt';
        break;
      case 'recommend':
        sortKey = 'votes';
        break;
      case 'comment':
        sortKey = 'comments';
        break;
    }

    const q  = query(itemsCollectionRef, orderBy(sortKey, 'desc'))
    const items = await getDocs(q)
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

    const comments = await getDocs(
      query(
        collection(db, 'projects', projectDoc.value.id, 'items', id, 'comments'),
        orderBy('createdAt', 'desc')  // 최신순 정렬 (desc: 내림차순)
      )
    )

    return comments.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  return {
    fetchItems,
    fetchItem,
    fetchComments,
  }
}
