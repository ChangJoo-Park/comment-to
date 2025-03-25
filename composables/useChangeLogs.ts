import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore"

export const useChangeLogs = () => {
  const db = useFirestore()
  const { doc: projectDoc } = useProjectDoc()

  const fetchChangeLogs = async () => {
    if (!projectDoc.value) {
      throw new Error('Project not found')
    }
    const itemsCollectionRef = collection(db, 'projects', projectDoc.value.id, 'changelogs')
    const items = await getDocs(query(itemsCollectionRef, orderBy('createdAt', 'desc')))
    return items.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  const getChangeLog = async (id: string) => {
    if (!projectDoc.value) {
      throw new Error('Project not found')
    }
    const item = await getDoc(doc(db, 'projects', projectDoc.value.id, 'changelogs', id))
    return { id: item.id, ...item.data() }
  }

  return {
    fetchChangeLogs,
    getChangeLog,
  }
}
