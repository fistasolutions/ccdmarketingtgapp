"use client";
import BadgeGrid from "@/app/components/badgeGrid/BadgeGrid";
import ProgressBar from "@/app/components/progressBarProfile/ProgressBar";
import { useData } from "@/context/ContextData";
import { useCurrentData } from "@/context/CurrentUser";
import Image from "next/image";
import image1 from "../../../../public/assets/Image/Leaderboard Item Image (2).png";

export default function ProfilePage() {

const {currentUsers}=useCurrentData()
const {taskData}=useData()

  const progressPercentage = taskData?.length > 0 ? (() => {
    const points = currentUsers?.[0]?.user_points ||0;
  
    if (points <= 6000) {
      return (points / 6000) * 20; // 0 to 6000 points → 0% to 20%
    } else if (points <= 12000) {
      return 20 + ((points - 6000) / 6000) * 30; // 6000 to 12000 points → 20% to 50%
    } else if (points <= 20000) {
      return 50 + ((points - 12000) / 6000) * 30; // 12000 to 20000 points → 50% to 80%
    }else{
      return 100;
    }
  
  })() : 0;
  

return (
    <div className="min-h-screen bg-[#101010] text-white p-6">
      <div className="flex flex-col items-center ">
        <div className="mx-auto rounded-full flex items-center justify-center">
          <div className="rounded-full overflow-hidden mt-[19px]">
            <Image src={currentUsers?.[0]?.image_url||image1} width={120} height={120} alt="profile"  />
          </div>
        </div>
        <h2 className="text-[#FFFFFF] text-xl mt-[19px]">{currentUsers?.[0]?.username}</h2>
        <div className="text-center">
          <div className="text-[48px] font-light mt-[10px] bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] bg-clip-text text-transparent">
          {currentUsers?.[0]?.user_points}
          </div>
          <div className="bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] bg-clip-text text-transparent text-[16px] mt-[0px]">Points</div>
        </div>
      </div>

      <div className="mt-[56px] ">
        <hr className="w-full mb-2 " />
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[24px] font-normal">Weekly progress</h3>
          <p className="text-xs text-[#FFFFFF] max-w-[120px] text-left">
            Earn up to 3 tickets by completing tasks!
          </p>
        </div>
      </div>

      <div className="text-[32px] font-normal mt-[33px] bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] bg-clip-text text-transparent mb-4 ">{currentUsers?.[0]?.user_points} points</div>
      <div className="relative mb-2">
        <div className="flex justify-center">
          <div className="space-y-4 w-full">
            <ProgressBar progress={progressPercentage} height="h-6" />
            <div className="h-[40px] w-[1px] absolute top-0 right-[10%] bg-white" />
            <div className="h-[40px] w-[1px] absolute top-0 right-[50%] bg-white" />
            <div className="h-[40px] w-[1px] absolute top-0 right-[80%] bg-white" />
          </div>
        </div>
      </div>

      <div className="flex justify-between  relative">
        <div className="absolute left-[6%] top-3 text-center">
          <div className="text-[12px] text-[#FFFFFF]">1 ticket</div>
        </div>
        <div className="absolute left-[35%] top-3 text-center">
          <div className="text-[12px] text-[#FFFFFF]">2 tickets</div>
        </div>
        <div className="absolute left-[76%] top-3 text-center">
          <div className="text-[12px] text-[#FFFFFF]">3 tickets</div>
        </div>
      </div>

      <div className="leading-[16px] text-[12px] text-[#A9AFB199] mt-[55px]">
        <p className=" mt-0 mb-0">6,000 Points = 1 Ticket</p>
        <p className="">12,000 Points = 2 Tickets</p>
        <p className="">
          20,000 Points = 3 Tickets (Badge Awarded)
        </p>
        <p className="mt-4 text-xs">
          Each ticket gives you one more chance to win a share of the weekly
          prize pool of 1,200,000 $CCD.
        </p>
      </div>
      <BadgeGrid />
    </div>
  );
}
