import {
  collection,
  count,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const Aside = () => {
  const [tweetsCount, setTweetsCount] = useState(0);
  useEffect(() => {
    const tweetCol = collection(db, "tweets");
    const q = query(tweetCol, count());
    onSnapshot(
      q,
      (snapshot) => {
        setTweetsCount(snapshot.size);
      },
      []
    );
  }, []);
  return (
    <div className="max-xl:hidden p-4">
      <h1 className="text-xl  font-semibold">Gönderi Sayısı: {tweetsCount}</h1>
    </div>
  );
};

export default Aside;
