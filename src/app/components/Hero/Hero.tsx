import { useCurrentData } from "@/context/CurrentUser";
import React from "react";

export default function Hero() {
  const { currentUsers } = useCurrentData();
  return (
    <div
      className="h-[224px] w-full bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] flex flex-col items-center justify-center
     "
    >
      <h1 className="text-black text-[16px] font-medium">Daily Streak</h1>
      <h1 className="text-black text-[56px] font-normal">
        {currentUsers?.[0]?.user_points
          ? new Intl.NumberFormat().format(currentUsers[0].user_points)
          : "0"}
      </h1>
      <h1 className="text-black text-[16px] font-medium">Points</h1>
    </div>
  );
}
