import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/config";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // kayıt olma modundaysa
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Hesabınız Oluşturuldu.");
          navigate("/home");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      // giriş yap modundaysa
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Hesabınıza Giriş Yapıldı");
          navigate("/home");
        })
        .catch((err) => {
          toast.error(err.message);
          setIsError(true);
        });
    }
  };

  //  şifre sıfırlama maili gönder
  const sendEmail = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      toast.info("Epostanıza şifre sıfırlama bağlantısı gönderilmiştir..");
    });
  };

  //   google ile gir
  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      toast.success("Hesabınıza giriş yapıldı");
      navigate("/home");
    });
  };
  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="x-logo.webp" alt="x" />
        </div>

        <h1 className="text-center font-bold text-xl">Twittet'a giriş yap</h1>
        <button
          onClick={handleGoogle}
          className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logo.svg" alt="google" />
          <span className="text-black whitespace-nowrap">
            Google ile Giriş Yap
          </span>
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="">Email</label>
          <input
            className="text-black rounded-md mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-5">Şifre</label>
          <input
            className="text-black rounded-md mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300"
            type="submit"
          >
            {isSignUp ? "Kayıt Ol" : "Giriş Yap"}
          </button>

          <p
            onClick={() => {
              setIsSignUp(!isSignUp);
            }}
            className="mt-5"
          >
            <span className="text-gray-500 ">
              {isSignUp ? "Hesabınız Varsa" : "Hesabınız yoksa"}
            </span>
            <span className="ms-2 text-blue-500 cursor-pointer">
              {isSignUp ? "Giriş Yap" : "Kayıt Ol"}
            </span>
          </p>
        </form>
        {!isSignUp && isError && (
          <button
            onClick={sendEmail}
            className=" text-center text-red-500 cursor-pointer"
          >
            Şifrenizi mi unuttunuz?
          </button>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
