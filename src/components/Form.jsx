import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { db, storage } from "./../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Loader from "./Loader";

const Form = ({ user }) => {
  const [isLoadind, setIsLoading] = useState(false);
  // tweetler kolleksiyonun referansını al
  const tweetsCol = collection(db, "tweets");

  // dosya resim ise resmi storage'a yükle ve resmin urline fonksiyonun çağırıldığı yere döndürür

  const uploadImage = async (file) => {
    // 1-dosya resim değilse fonksiyonu durdur
    if (!file || !file.type.startsWith("image")) return null;

    // 2-dosyanın yükleneceği konumun referansını al
    const fileRef = ref(storage, v4() + file.name);

    // 3-referansını oluşturduğumuz konuma doyayı yükle
    await uploadBytes(fileRef, file);
    // 4-yüklenen dosyanın dosyanın url eriş ve döndür
    return await getDownloadURL(fileRef);
  };

  // form gönderildiğinde
  const handleSubmit = async (e) => {
    e.preventDefault();

    // inputlardaki verileri erişmek
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];
    // yazı ve resim içeriği var mı yoksa uyarı ver
    if (!textContent && !imageContent) {
      toast.info("Lütfen içerik giriniz.");
    }
    // yüklenme statini true'a çek
    setIsLoading(true);
    try {
      // resmi storage'a yükle
      const url = await uploadImage(imageContent);

      // tweet dökümanını kolleksiyona ekle
      await addDoc(tweetsCol, {
        textContent,
        imageContent: url,
        createdAt: serverTimestamp(),
        likes: [],
        isEdited: false,
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });
    } catch {
      console.log(err);
    }
    // yüklenme satat'ini false'a çek
    setIsLoading(false);
    // formu temizle
    e.target.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-zinc-700 p-4"
    >
      <img
        className=" rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
        alt={user?.displayName}
      />
      <div className="w-full">
        <input
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          placeholder="Neler Oluyor?"
          type="text"
        />
        <div className="flex justify-between items-center">
          <label
            className="text-lg transition p-4 cursor-pointer rounded-full hover:bg-gray-800"
            htmlFor="image"
          >
            <BsCardImage />
          </label>

          <input className="hidden" id="image" type="file" />

          <button
            type="submit"
            className="bg-blue-600 place-items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800"
          >
            {isLoadind ? <Loader /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
