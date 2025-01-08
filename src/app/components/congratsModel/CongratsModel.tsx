  "use client";

  import Image from "next/image";
  import { Dispatch, SetStateAction, useEffect, useState } from "react";
  import profile from "../../../../public/svg/congratsImage.svg";
  import logo from "../../../../public/svg/newImage.svg";
  import poly from "../../../../public/svg/PolygonShape.svg";
  import ProgressBar from "../progressBar/ProgressBar";
  import { useCurrentData } from "@/context/CurrentUser";
  import { useData } from "@/context/ContextData";
  interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    winningValue: any;
    setSpiner: Dispatch<SetStateAction<boolean>>;
  }

  export function CongratsModel({ isOpen, onClose,setSpiner,winningValue }: QuizModalProps) {
    const [progress, setProgress] = useState(0);
    const [isPolyRotated, setIsPolyRotated] = useState(false);
  const {currentUsers}=useCurrentData()
  const { taskData, fetchUsers, completedTask, pointId, fetchCompletedTask } =
      useData();
    if (!isOpen) return null;
    const progressPercentage =
    taskData?.length > 0 ? (completedTask.length / taskData.length) * 100 : 0;

    return (
      <div className="fixed top-2 left-2  bg-transparent  flex items-center justify-center z-50 w-[95%] h-[90vh]">
        <div className="bg-[#191B1B] h-[90vh] border border-1 border-white rounded-xl  w-full max-w-sm  text-white flex flex-col">
          <div className="flex justify-center mt-[24px]  min-h-738:mb-[16px] items-center">
            <Image src={logo} width={40} height={40} alt="logo" />
          </div>

          <div className=" text-center flex flex-col w-full min-h-738:h-full h-[80%] space-y-2">
            <div className="text-center flex justify-center items-center">
              <h2
                className="text-2xl  w-[268px] text-center font-normal bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] 
        bg-clip-text text-transparent"
              >
                Congratulations!
                You completed this quiz
              </h2>
            </div>

            <p className="text-gray-300 min-h-738:text-2xl text-sm ">You earned {winningValue} points</p>

            <div className="mx-auto rounded-full mt-[32px] flex  items-center justify-center">
              <div className="rounded-full overflow-hidden mt-[32px]">
                <Image src={currentUsers?.[0]?.image_url} width={120} height={120} alt="profile" className="  " />
              </div>
            </div>  

            <div className="space-y-1">
              <p className="text-sm text-white mt-[20px] leading-tight">{currentUsers?.[0]?.username}</p>
              <p className="text-gray-400 text-sm leading-tight">{currentUsers?.[0]?.user_points}</p>
              <div className="flex flex-row justify-center  items-center">
                <p className="text-3xl font-bold text-white mt-[25px] ">{winningValue}</p>
                <Image
                  src={poly}
                  width={11}
                  height={11}
                  alt="toggle"
                  className={`transform transition-transform duration-300 mt-[25px]  cursor-pointer ${
                    isPolyRotated ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => setIsPolyRotated(!isPolyRotated)}
                />
              </div>
            </div>

            <div  className="flex justify-center">
              <div className=" mt-[33px] w-2/3">
                <ProgressBar progress={progressPercentage} />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => {
                onClose();
              }}
              className="w-[90%] py-3.5 px-4 mb-[31px]  text-black rounded-full bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] font-medium hover:opacity-90 transition-opacity text-base"
            >
              Explore more
            </button>
          </div>
        </div>
      </div>
    );
  }
