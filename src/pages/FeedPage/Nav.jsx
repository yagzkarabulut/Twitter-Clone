import { BiDoorOpen } from "react-icons/bi";
import { navSections } from "../../constans";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

const Nav = ({ user }) => {
  return (
    <div className="flex flex-col justify-between items-end px-2 py-4">
      <div>
        <img src="x-logo.webp" className="w-14 mb-4" />
        {navSections.map((i, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer rounded-lg hover:bg-[#505050b7] max-md:justify-center"
          >
            {i.icon}
            <span className=" whitespace-nowrap max-md:hidden">{i.title}</span>
          </div>
        ))}
      </div>
      {/* kullanıcı bilgileri alanı */}
      <div>
        {!user ? (
          <div className="w-12 h-12 bg-gray-400 rounded-full animate-bounce" />
        ) : (
          <div className="flex flex-col gap-5">
            <div>
              <img
                className="w-12 h-12 rounded-full"
                src={user.photoURL}
                alt=""
              />
              <p className="max-md:hidden mt-3">{user.displayName}</p>
            </div>
            <button
              onClick={() => signOut(auth)}
              className="flex justify-center gap-3 p-1 items-center bg-zinc-700 rounded text-2xl md:text-[15px] transition hover:bg-zinc-900"
            >
              <BiDoorOpen />
              <span className="max-md:hidden ">Çıkış Yap</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
