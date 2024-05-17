import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FiShare2 } from "react-icons/fi";

const Buttons = ({ likeCount, handleLike, isLiked }) => {
  return (
    <div className="flex justify-between">
      <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#4069db49]">
        <BiMessageRounded />
      </div>
      <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#6df17849]">
        <FaRetweet />
      </div>
      <div
        onClick={handleLike}
        className="flex justify-center items-center gap-2 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#d35db549]"
      >
        {isLiked ? <FcLike /> : <AiOutlineHeart />}

        <span>{likeCount}</span>
      </div>
      <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#4f4f5049]">
        <FiShare2 />
      </div>
    </div>
  );
};

export default Buttons;
