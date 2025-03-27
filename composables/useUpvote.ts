import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const useUpvote = () => {
  const db = useFirestore();
  const { doc: projectDoc } = useProjectDoc();
  const downvote = async (id: string) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("User not found");
    }

    // 사용자 정보에서 투표 결과 제거
    const userRef = doc(db, "users", currentUser?.uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }
    const userVotes = userDoc.data()?.votes ?? [];
    if (!userVotes.includes(id)) {
      throw new Error("User not voted");
    }
    userVotes.splice(userVotes.indexOf(id), 1);
    await updateDoc(userRef, {
      votes: userVotes,
    });

    // 투표 결과 제거
    const votesCollectionRef = collection(
      db,
      "projects",
      projectDoc?.value?.id,
      "items",
      id,
      "votes"
    );
    const voteRef = doc(votesCollectionRef, currentUser.uid);
    await deleteDoc(voteRef);

    // 피드백 투표 수 감소
    const feedbackRef = doc(db, "projects", projectDoc?.value?.id, "items", id);
    await updateDoc(feedbackRef, {
      votes: increment(-1),
    });
  };

  const upvote = async (id: string) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not found");
    }

    // 사용자 정보에 투표 결과 추가
    const userRef = doc(db, "users", currentUser?.uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: currentUser?.email,
        displayName: currentUser?.displayName,
        photoURL: currentUser?.photoURL,
      });
    }
    const userVotes = userDoc.data()?.votes ?? [];

    if (userVotes.includes(id)) {
      throw new Error("Already voted");
    }

    userVotes.push(id);
    await updateDoc(userRef, {
      votes: userVotes,
    });

    // 어떤 사람이 투표했는지 저장
    console.log("어떤 사람이 투표했는지 저장");
    const votesCollectionRef = collection(
      db,
      "projects",
      projectDoc?.value?.id,
      "items",
      id,
      "votes"
    );
    const voteRef = doc(votesCollectionRef, currentUser.uid);
    await setDoc(voteRef, {
      uid: currentUser.uid,
      username: currentUser.displayName,
      photoURL: currentUser.photoURL,
      createdAt: new Date(),
      email: currentUser.email,
    });
    console.log("투표 증가");
    // votes 증가
    const feedbackRef = doc(db, "projects", projectDoc?.value?.id, "items", id);
    await updateDoc(feedbackRef, {
      votes: increment(1),
    });
  };
  return { upvote, downvote };
};
