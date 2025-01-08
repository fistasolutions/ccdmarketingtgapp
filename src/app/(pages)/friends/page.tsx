"use client";
import { useState } from "react";

import { Search } from "lucide-react";
import Image from "next/image";
import image9 from "../../../../public/svg/Leaderboard Item Image (3).svg";

import image7 from "../../../../public/svg/Leaderboard Item Image (8).png";
import image6 from "../../../../public/svg/Leaderboard Item Image (8).svg";
import image8 from "../../../../public/svg/Leaderboard Item Image (9).svg";
import image10 from "../../../../public/svg/Mask group.svg";
import { useData } from "@/context/ContextData";
import Link from "next/link";
export default function Page() {
  const [selectedDiv, setSelectedDiv] = useState<number|null>(null);
  const [changeComponent, setChangeComponents] = useState(false);
  const {pointId}=useData()
  const handleClick = (id: number) => {
    setSelectedDiv(id);
  };const userReferralId = pointId; // Replace with the actual user ID
  const referralLink = `https://t.me/fistaapp000001ccd_bot/?referralId=${userReferralId}`;
  const telegramShareLink = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Join our app using this link!`;
  

  // const telegramShareLink = `https://t.me/share/url?url=${encodeURIComponent("https://t.me/fistaapp000001ccd_bot")}&text=Join our app using this link!`;
  const [openModal, setOPenModal] = useState(false);
  const handleOpenModal = () => {
    setOPenModal(!openModal);
  };
  const data = [
    { id: 3, image: image6, title: "moonbae", btn: "accept" },
    { id: 4, image: image7, title: "smolbag", btn: "pending" },
    { id: 5, image: image8, title: "l3v3r4ge", btn: "pending" },
  ];
  const data2 = [
    { id: 3, image: image10, title: "Send Message", btn: "accept" },
    { id: 4, image: image7, title: "smolbag", btn: "pending" },
    { id: 5, image: image8, title: "l3v3r4ge", btn: "pending" },
  ];
  const handleChangeComponent = () => {
    setChangeComponents(!changeComponent);
  };
  return (
    <div className="relative h-[100vh]">
      <h1 className="text-[32px] mt-[12px] font-normal text-center bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] bg-clip-text leading-[56px] text-transparent">
        Friends
      </h1>
      <div className="flex justify-center items-center mt-[41px]">
        <div
          // onClick={()=>handleOpenModal}
          className="text-[#101010] text-[16px] font-bold w-[90%] h-[56px] rounded-[50px] mb-[24px] bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] flex justify-center items-center"
        >
          <Link href={telegramShareLink}>Invite friends and earn points</Link>
        </div>
      </div>
      {changeComponent ? (
        <div>
          <div className="flex justify-center mt-[48px] items-center flex-col w-full">
            {data.map((item) => (
              <div key={item.id} className="w-[90%]">
                <div
                  className="h-[0.8px] pt-[2px] w-full bg-white"
                  style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}
                />
                <div
                  onClick={() => handleClick(item.id)}
                  className={`flex relative justify-between items-center  h-[80px] p-2 ${
                    selectedDiv === item.id ? "" : ""
                  }`}
                >
                  {item.btn === "pending" ? (
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                  ) : (
                    ""
                  )}

                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt="logo"
                      className="w-[56px] h-[56px] mr-[16px]"
                    />
                    <div>
                      <h1 className="text-[12px] font-bold">{item.title}</h1>
                    </div>
                  </div>

                  {item.btn === "pending" ? (
                    <div className="text-[#101010] mt-[13px] flex-col text-[10px]  font-bold w-[103px] h-[40px]  rounded-[50px] mb-[24px] border border-1 flex justify-center items-center">
                      <div className="bg-black flex justify-center items-center flex-col w-full h-full rounded-[50px]">
                        <button className="text-white">Pending </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[#101010] mt-[13px] flex-col text-[10px] p-[1.5px] font-bold w-[103px] h-[40px]  rounded-[50px] mb-[24px] bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] flex justify-center items-center">
                      <div className="bg-black flex justify-center items-center flex-col w-full h-full rounded-[50px]">
                        <button className="text-white">
                          Accepted <br />
                          +3000 points
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[600px]">
          <div className="flex justify-center mt-[29px] flex-col items-center">
            <p className="text-[16px] font-normal text-[#FFFFFF]">
              No friends added.
            </p>
            <p
              className="text-[16px] mt-[16px]  font-normal text-[#FFFFFF] w-[209px] text-center"
              // id="para"
            >
              Earn 3000 point when one of your friends join
            </p>
          </div>
          <div className="flex justify-center">
            <div
              className="h-[0.8px] mt-[136px] w-[90%] bg-white"
              style={{
                backgroundColor: "rgba(217, 217, 217, 1)",
              }}
            />
          </div>
          <div className="flex justify-center items-center " >
            <div className="flex flex-col ">
              <h1 className="mt-[3px] mb-[10px]">Recent chats</h1>
              <div className="flex gap-10 w-[100%]">
                <div onClick={handleChangeComponent}>
                  <Image src={image6} alt="logo" />
                  <h1 className="text-[10px] mt-[3px] font-normal">
                    liquidgang
                  </h1>
                </div>
                <div onClick={handleChangeComponent}>
                  <Image src={image7} alt="logo" />
                  <h1 className="text-[10px] font-normal mt-[3px]">
                    liquidgang
                  </h1>
                </div>
                <div onClick={handleChangeComponent}>
                  <Image src={image8} alt="logo" />
                  <h1 className="text-[10px] font-normal mt-[3px]">
                    liquidgang
                  </h1>
                </div>
                <div onClick={handleChangeComponent}>
                  <Image src={image9} alt="logo" />
                  <h1 className="text-[10px] font-normal mt-[3px]">
                    liquidgang
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {openModal && (
  <div
    className={`absolute flex justify-center w-full z-50 transition-transform duration-500 ease-in-out ${
      openModal ? "translate-y-0" : "translate-y-full"
    }`}
    style={{ bottom: 0 }}
  >
    <div className="h-[500px] w-[97%]">
      <div className="bg-[#1C1C1E] h-[80%] p-[20px] rounded-lg">
        <div className="bg-[#1C1C1E] flex">
          <Search className="text-[#3F88F7]" size={30} />
          <div className="w-full flex flex-col mb-[20px] justify-center items-center">
            <h1 className="text-[20px] font-semibold">Share With</h1>
            <h1 className="text-[12px] font-semibold">Select chat</h1>
          </div>
        </div>
        <div className="flex flex-row w-full h-[70%]">
          {data2.map((item) => (
            <div key={item.id} className="mr-[30px]">
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={item.image}
                  alt="logo"
                  className="w-[61px] h-[61px]"
                />
                <div>
                  <h1 className="text-[12px] font-bold w-[52px] text-center">
                    {item.title}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="text-[#4D4D4D] text-[20px] font-semibold"
            onClick={handleOpenModal}
          >
            Send
          </button>
        </div>
      </div>
      <div
        className="bg-[#1C1C1E] h-[57px] mt-[7px] flex justify-center items-center p-[20px] rounded-lg"
        onClick={handleOpenModal}
      >
        <button className="text-[#3F88F7] text-[20px] font-semibold">
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
