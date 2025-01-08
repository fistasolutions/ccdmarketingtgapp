"use client";
import Image from "next/image";
import logo from "../../../../public/svg/Vector.svg";
interface TypePage{
  winningValue:number|null;
  setSpineWinner:any
}
export function LotteryWin({winningValue,setSpineWinner}:TypePage) {
  return (
    <div className=" w-full h-[85vh] mb-20 bg-transparent flex justify-between bg-[#101010]  flex-col  z-50">
      <div className="w-full h-full  bg-[#101010]  flex flex-col rounded-2xl justify-between items-center text-white text-sm">
        <div className="flex mt-[19px] ">
          <Image src={logo} width={40} height={40} alt="logo" />
        </div>
        <div className="h-full flex flex-col items-center  w-full max-w-sm ">
          <div className=" text-center mt-[19px]">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Congratulations!
            </h2>
            <p className="text-xl text-[#8BB4E7]">You won {winningValue} tickets!</p>
            <p className="text-gray-400 text-sm">
              Come back next week and try
              <br />
              your luck again!
            </p>
          </div>
          <div className="relative mt-[37px]  w-[176px] h-[176px]">
            <svg className=" -rotate-180" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-[#101010]"
              />
              {[...Array(12)].map((_, i) => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="15"
                  strokeDasharray="23.562 259.18"
                  strokeDashoffset={-i * 24.562}
                  className="opacity-100"
                />
              ))}
              <defs>
                <linearGradient id="gradient" x1="1%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EDDABF" />
                  <stop offset="40%" stopColor="#A49AE3" />
                  <stop offset="100%" stopColor="#9EF2EB" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">{winningValue}</span>
            </div>
          </div>

        </div>
      </div>
      <div className="flex justify-center">

          <button
          onClick={()=>setSpineWinner(false)}
            className="  text-black w-[90%]  py-3.5 px-4 rounded-full bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] font-medium hover:opacity-90 transition-opacity text-base"
            >
            Explore more
          </button>
            </div>
    </div>
  );
}
