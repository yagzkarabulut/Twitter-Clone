import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { db } from "../../firebase/config";
import { BsTrashFill } from "react-icons/bs";
import { IoMdReturnLeft } from "react-icons/io";

const EditMode = ({ tweet, close }) => {
  const [isPicDeleting, setIsPicDeleting] = useState(false);
  const inputRef = useRef();
  // kaydet butonuna tıklanınca
  const handleSave = async () => {
    // inputun içeriğine eriş
    const newText = inputRef.current.value;

    // güncellenicek dökümanın referansını al
    const tweetRef = doc(db, "tweets", tweet.id);

    // dökümanın içeriğini güncelle
    const updated = isPicDeleting
      ? {
          textContent: newText,
          isEdited: true,
          imageContent: null, // resmi kaldır
        }
      : {
          textContent: newText,
          isEdited: true,
        };

    await updateDoc(tweetRef, updated);
    // düzenleme modundan çık
    close();
  };
  return (
    <>
      <input
        ref={inputRef}
        type="text"
        className="rounded p-1 px-2 text-black"
        defaultValue={tweet.textContent}
      />
      <button
        onClick={handleSave}
        className="mx-5 p-1 text-green-400 rounded-lg shadow border transition hover:bg-zinc-800"
      >
        <BiSolidSave />
      </button>
      <button
        className=" p-1 text-red-400 rounded-lg shadow border transition hover:bg-zinc-800"
        onClick={close}
      >
        <ImCancelCircle />
      </button>

      {tweet.imageContent && (
        <div className="relative">
          <img
            className={`
            ${isPicDeleting ? "blur" : ""}
            my-2 rounded-lg w-full object-cover max-h-[400px]`}
            src={tweet.imageContent}
            alt=""
          />
          <button
            onClick={() => setIsPicDeleting(!isPicDeleting)}
            className=" absolute top-0 right-0 text-xl p-2 bg-white transition text-red-600 hover:scale-90 rounded-full"
          >
            {isPicDeleting ? <IoMdReturnLeft /> : <BsTrashFill />}
          </button>
        </div>
      )}
    </>
  );
};

export default EditMode;
