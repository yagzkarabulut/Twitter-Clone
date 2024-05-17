import moment from "moment/moment";
import "moment/locale/tr";
import Buttons from "./Buttons";
import { auth, db } from "../../firebase/config";
import Dropdown from "./Dropdown";
import {
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";
import EditMode from "./EditMode";
import Content from "./Content";
const Post = ({ tweet }) => {
  // düzenleme modu state'i
  const [isEditMode, setIsEditMode] = useState(false);

  // tarihi günümüze göre kıyasını al
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  // oturumu açık olan kullanıcı tweet'in like dizisinde var mı
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  // tweeti kaldır
  const handleDelete = async () => {
    // kaldırılacak dökümanın referansını al
    const tweetRef = doc(db, "tweets", tweet.id);
    // dökümanı kaldr
    deleteDoc(tweetRef)
      .then((res) => {
        toast.warn("Tweet akıştan kaldırıldı");
      })
      .catch(() => {
        toast.danger("Tweet kaldırılırken sorun oluştu");
      });
  };

  // tweeti likela
  const handleLike = async () => {
    // güncellenicek dökümanın referansını alma
    const tweetRef = doc(db, "tweets", tweet.id);

    //  belgeyi güncelle
    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid) // like varsa like kaldır
        : arrayUnion(auth.currentUser.uid), // like yoksa ekle
    });
  };

  return (
    <div className="border-b border-zinc-700 py-6 px-3 flex gap-3 ">
      <img className="w-12 h-12 rounded-full" src={tweet.user.photo} />
      <div className="w-full">
        {/* üst kısım */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center whitespace-nowrap">
            <p className="font-semibold">{tweet.user.name}</p>
            <p className="text-gray-400 text-sm">
              @{tweet.user.name.toLowerCase().split(" ").join("_")}
            </p>
            <p className="text-gray-400 text-sm">{date}</p>
            {tweet.isEdited && (
              <p className="text-gray-400 text-xs"> *düzenlendi</p>
            )}
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              handleEdit={() => setIsEditMode(true)}
              handleDelete={handleDelete}
            />
          )}
        </div>

        {/* orta kısım */}
        <div className="my-4">
          {isEditMode ? (
            <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
          ) : (
            <Content tweet={tweet} />
          )}
        </div>

        {/* alt kısım */}
        <div>
          <Buttons
            isLiked={isLiked}
            handleLike={handleLike}
            likeCount={tweet.likes?.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
