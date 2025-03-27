import {
  collection,
  doc,
  getDoc,
  increment,
  writeBatch,
  runTransaction,
  serverTimestamp,
  DocumentReference,
} from "firebase/firestore";

export const useUpvote = () => {
  const db = useFirestore();
  const { doc: projectDoc } = useProjectDoc();

  /**
   * 배치 처리를 사용한 다운보트 함수
   */
  const downvote = async (id: string) => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw new Error("로그인이 필요합니다");
      }

      if (!projectDoc?.value?.id) {
        throw new Error("프로젝트 정보를 찾을 수 없습니다");
      }

      // 사용자 문서 참조
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        throw new Error("사용자 정보를 찾을 수 없습니다");
      }

      const userVotes = userDoc.data()?.votes ?? [];
      if (!userVotes.includes(id)) {
        throw new Error("투표한 적이 없습니다");
      }

      // 배치 생성
      const batch = writeBatch(db);

      // 1. 사용자 votes 배열에서 ID 제거
      const updatedVotes = userVotes.filter((voteId: string) => voteId !== id);
      batch.update(userRef, { votes: updatedVotes });

      // 2. 투표 문서 삭제
      const voteRef = doc(
        db,
        "projects",
        projectDoc.value.id,
        "items",
        id,
        "votes",
        currentUser.uid
      );
      batch.delete(voteRef);

      // 3. 아이템의 투표 수 감소
      const itemRef = doc(db, "projects", projectDoc.value.id, "items", id);
      batch.update(itemRef, { votes: increment(-1) });

      // 배치 커밋
      await batch.commit();
      console.log("다운보트 성공");

      return true;
    } catch (error) {
      console.error("다운보트 실패:", error);
      throw error;
    }
  };

  /**
   * 트랜잭션을 사용한 업보트 함수
   */
  const upvote = async (id: string) => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw new Error("로그인이 필요합니다");
      }

      if (!projectDoc?.value?.id) {
        throw new Error("프로젝트 정보를 찾을 수 없습니다");
      }

      // 트랜잭션 실행
      return await runTransaction(db, async (transaction) => {
        // 1. 사용자 문서 읽기
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await transaction.get(userRef);

        // 사용자 문서가 없는 경우 생성
        if (!userSnap.exists()) {
          transaction.set(userRef, {
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            votes: [],
            createdAt: serverTimestamp(),
          });
        }

        const userData = userSnap.exists() ? userSnap.data() : { votes: [] };
        const userVotes = userData.votes || [];

        // 이미 투표한 경우 에러
        if (userVotes.includes(id)) {
          throw new Error("이미 투표했습니다");
        }

        // 2. 아이템 문서 읽기
        const itemRef = doc(db, "projects", projectDoc?.value?.id, "items", id);
        const itemSnap = await transaction.get(itemRef);

        if (!itemSnap.exists()) {
          throw new Error("아이템을 찾을 수 없습니다");
        }

        // 3. 사용자 votes 배열에 ID 추가
        const updatedVotes = [...userVotes, id];
        transaction.update(userRef, { votes: updatedVotes });

        // 4. 투표 문서 생성
        const voteRef = doc(
          db,
          "projects",
          projectDoc?.value?.id,
          "items",
          id,
          "votes",
          currentUser.uid
        );

        transaction.set(voteRef, {
          uid: currentUser.uid,
          username: currentUser.displayName,
          photoURL: currentUser.photoURL,
          createdAt: serverTimestamp(),
          email: currentUser.email,
        });

        // 5. 아이템의 투표 수 증가
        transaction.update(itemRef, { votes: increment(1) });

        console.log("업보트 성공");
        return true;
      });
    } catch (error) {
      console.error("업보트 실패:", error);
      throw error;
    }
  };

  /**
   * 배치와 트랜잭션을 결합한 최적화 버전
   * 사용자 경험에 따라 선택적으로 사용
   */
  const vote = async (id: string, type: 'up' | 'down') => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw new Error("로그인이 필요합니다");
      }

      const projectId = projectDoc?.value?.id;
      if (!projectId) {
        throw new Error("프로젝트 정보를 찾을 수 없습니다");
      }

      // 배치 생성
      const batch = writeBatch(db);

      // 사용자 문서 참조 및 데이터 읽기
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      // 아이템 문서 참조
      const itemRef = doc(db, "projects", projectId, "items", id);
      const itemSnap = await getDoc(itemRef);

      if (!itemSnap.exists()) {
        throw new Error("아이템을 찾을 수 없습니다");
      }

      // 투표 문서 참조
      const voteRef = doc(db, "projects", projectId, "items", id, "votes", currentUser.uid);

      // 업보트 처리
      if (type === 'up') {
        // 사용자 문서 존재 여부 확인 및 생성/업데이트
        if (!userSnap.exists()) {
          batch.set(userRef, {
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            votes: [id],
            createdAt: serverTimestamp(),
          });
        } else {
          const userData = userSnap.data();
          const userVotes = userData.votes || [];

          if (userVotes.includes(id)) {
            throw new Error("이미 투표했습니다");
          }

          batch.update(userRef, { votes: [...userVotes, id] });
        }

        // 투표 문서 생성 및 아이템 투표 수 증가
        batch.set(voteRef, {
          uid: currentUser.uid,
          username: currentUser.displayName,
          photoURL: currentUser.photoURL,
          createdAt: serverTimestamp(),
          email: currentUser.email,
        });

        batch.update(itemRef, { votes: increment(1) });
      }
      // 다운보트 처리
      else if (type === 'down') {
        if (!userSnap.exists()) {
          throw new Error("사용자 정보를 찾을 수 없습니다");
        }

        const userData = userSnap.data();
        const userVotes = userData.votes || [];

        if (!userVotes.includes(id)) {
          throw new Error("투표한 적이 없습니다");
        }

        // 사용자 votes 배열에서 ID 제거
        const updatedVotes = userVotes.filter((voteId: string) => voteId !== id);
        batch.update(userRef, { votes: updatedVotes });

        // 투표 문서 삭제 및 아이템 투표 수 감소
        batch.delete(voteRef);
        batch.update(itemRef, { votes: increment(-1) });
      }

      // 배치 커밋
      await batch.commit();
      console.log(`${type === 'up' ? '업' : '다운'}보트 성공`);

      return true;
    } catch (error) {
      console.error(`${type === 'up' ? '업' : '다운'}보트 실패:`, error);
      throw error;
    }
  };

  return {
    upvote,
    downvote,
    vote // 통합 함수 (선택적으로 사용 가능)
  };
};
