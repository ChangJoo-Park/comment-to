import { collection, getDocs, where, query } from "firebase/firestore";

export const useProjects = () => {
  const db = useFirestore();
  const fetchProjectsByIds = async (ids: string[]) => {
    console.log(ids);
    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("id", "in", ids));
    const items = await getDocs(q);
    return items.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  return {
    fetchProjectsByIds,
  };
};
