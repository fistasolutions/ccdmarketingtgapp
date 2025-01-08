"use client";
import Loading from "@/app/components/Loading/Loading";
import { useData } from "@/context/ContextData";
import { useCurrentData } from "@/context/CurrentUser";
import Image from "next/image";
import { useState } from "react";
import image5 from "../../../../public/assets/Image/boy.png";
import image4 from "../../../../public/svg/Leaderboard Item Image.svg";
import logo from "../../../../public/svg/Vector.svg";

export default function Page() {
  const [selectedDiv, setSelectedDiv] = useState<number | null>(null);
  const { users, pointId ,loading} = useData();
  const { currentUsers } = useCurrentData();
  const topThreeUsers = users
    ?.sort((a: any, b: any) => b.user_points - a.user_points)
    .slice(0, 3);
  const handleClick = (id: number) => {
    setSelectedDiv(id);
  };

  const currentU = users?.filter((item: any) => item.user_id === pointId);

  if(loading){
    return<><Loading /></>
  }

  return (
    <div>
      <div className="flex justify-center mt-[49px] items-center flex-col ">
        <Image  src={logo} alt="logo" loading="lazy" />
        <h1 className="text-[32px] font-ibm mt-[10px] font-normal text-center bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] bg-clip-text leading-[56px] text-transparent">
          Leaderboard
        </h1>
      </div>
      <div className="flex flex-row items-end mt-[41px] justify-evenly">
        <div className="relative flex flex-col items-center">
          <div className="bg-gradient-to-r h-fit from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] w-fit rounded-full p-[.8px]">
            <Image loading="lazy" src={topThreeUsers?.[1]?.image_url||image5} alt="logo" width={88} height={88}  className="rounded-full" />
          </div>
          <h1 className="bg-gradient-to-r h-[32px] text-center font-bold absolute bottom-[43px] left-[35%] from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] w-[32px] text-black flex justify-center items-center rounded-full">
            2
          </h1>

          <h1 className="text-[12px] my-1 font-satoshi-bold font-bold mt-[10px]">
            {topThreeUsers?.[1]?.username || "Unknown"}
          </h1>
          <h1 className="text-[12px]">
            {topThreeUsers?.[1]?.user_points?new Intl.NumberFormat().format(topThreeUsers?.[1]?.user_points) : 0}
          </h1>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] w-fit rounded-full p-[.8px]">
            <Image loading="lazy" src={topThreeUsers?.[0]?.image_url||image5} alt="logo" width={128} height={128} className="rounded-full" />
          </div>

          <h1 className="bg-gradient-to-r h-[32px] font-bold text-center absolute bottom-10 left-[38%] from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] w-[32px] text-black flex justify-center items-center rounded-full">
            1
          </h1>

          <h1 className="text-[12px]  font-satoshi-bold font-bold mt-[10px]">
            {topThreeUsers?.[0]?.username || "Unknown"}
          </h1>
          <h1 className="text-[12px]">{topThreeUsers?.[0]?.user_points?new Intl.NumberFormat().format(topThreeUsers?.[0]?.user_points) : 0}</h1>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="bg-gradient-to-r h-fit from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] w-fit rounded-full p-[.8px]">
            <Image loading="lazy" src={topThreeUsers?.[2]?.image_url||image5} alt="logo" width={88} height={88} className="rounded-full" />
          </div>
          <h1 className="bg-gradient-to-r font-bold h-[32px] text-center absolute bottom-10 left-[35%] from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] w-[32px] text-black flex justify-center items-center rounded-full">
            3
          </h1>

          <h1 className="text-[12px] font-satoshi-bold mt-[10px]">
            {topThreeUsers?.[2]?.username || "Unknown"}
          </h1>
          <h1 className="text-[12px]">
            {topThreeUsers?.[2]?.user_points || 0}
          </h1>
        </div>
      </div>
      <div className="flex justify-center mt-[40px]">
        <div className="bg-gradient-to-r p-[2px] from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] h-[88px] w-[90%] rounded-[4px]">
          <div className="bg-[#191B1B] p-[16px] w-full h-full flex justify-between items-center">
            <div>
              <h1 className="text-[16px] font-bold">Your current rank</h1>
              <h1 className="text-[12px] font-normal  ">
                {currentU?.[0]?.user_points?new Intl.NumberFormat().format(currentU?.[0]?.user_points) : 0}
              </h1>
            </div>
            <div className="flex items-center">
              <h1 className="text-[16px] font-bold mr-1">{currentU?.[0]?.user_points?new Intl.NumberFormat().format(currentU?.[0]?.user_points) : 0}</h1>
              <div>
                <div className="triangle"></div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex justify-center">
        <div
          className="h-[0.8px] mt-[24px] w-[90%] bg-white"
          style={{
            backgroundColor: "rgba(217, 217, 217, 1)",
          }}
        />
      </div>
      <div className="flex justify-center items-center flex-col mb-[80px] w-full">
        {users
          ?.sort((a: any, b: any) => b.user_points - a.user_points)
          .slice(3)
          .map((item: any, i: any) => (
            <div key={i} className="w-[90%]">
              <div
                onClick={() => handleClick(item.user_id)}
                className={`flex justify-between  h-[80px] p-2 ${
                  selectedDiv === item.user_id
                    ? "bg-gradient-to-r from-[#9EF2EB80] via-[#A49AE380] to-[#EDDABF80]"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <Image loading="lazy"
                    src={item.image_url||image4}
                    alt="logo"
                    width={56}
                    height={56}
                    className="rounded-full mr-[16px]"
                  />
                  <div>
                    <h1 className="text-[12px] font-bold">{item.username}</h1>
                    <h1 className="text-[10px] font-normal">
                      {item.user_points?new Intl.NumberFormat().format(item.user_points) : 0}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center">
                  <h1 className="text-[16px] font-bold mr-1">{4+i}</h1>
                  <div>
                    <div className="triangle"></div>
                  </div>
                </div>
              </div>
              <div
                className="h-[0.8px] pt-[2px] w-full bg-white"
                style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
