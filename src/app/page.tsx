"use client";
import Splashscreen from "@/(components)/splashscreen/splashscreen";
import { useData } from "@/context/ContextData";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const SecondHero = dynamic(() => import("./components/secondHero/secondHero"));
const ProgressBar = dynamic(
  () => import("./components/progressBar/ProgressBar")
);
const Hero = dynamic(() => import("./components/Hero/Hero"));
const ClaimReward = dynamic(
  () => import("./components/claimReward/ClaimReward")
);
const ClaimPoints = dynamic(
  () => import("./components/claimpoints/ClaimPoints")
);
const Loading = dynamic(() => import("../(components)/Loading/Loading"));

export default function Page() {
  const [stage, setStage] = useState("splash");
  const [home, setHome] = useState(false);
  const [claimNow, setClaimNow] = useState(false);
  const { showStreak, loadingStreak, pointId, completedTask, taskData, users } =
    useData();
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const params = new URLSearchParams(window.location.search);
  //     const referral = params.get("referralId");
  //     alert(referral);
  //     if (referral) {
  //       const filterUser = users.filter((usr: any) => usr.user_id === referral);
  //       const updateUserPoints = async (pointsToAdd: any) => {
  //         try {
  //           const updatedPoints =
  //             filterUser?.[0]?.user_points == null
  //               ? pointsToAdd
  //               : filterUser?.[0]?.user_points + pointsToAdd;

  //           const requestOptions = {
  //             method: "PUT",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify({ user_points: updatedPoints }),
  //           };

  //           const res2 = await fetch(
  //             `https://ccdtgminiapp-apis.vercel.app/api/users/${referral}`,
  //             requestOptions
  //           );

  //           if (!res2.ok) {
  //             alert(
  //               `Error updating user points: ${res2.status} - ${res2.statusText}`
  //             );
  //           }
  //         } catch (err: any) {
  //           alert(`Update User Points Failed: ${err.message}`);
  //         }
  //       };
  //       updateUserPoints(34);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const _mtm = ((window as any)._mtm = (window as any)._mtm || []);
    _mtm.push({ "mtm.startTime": new Date().getTime(), event: "mtm.Start" });
    var d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src =
      "https://cdn.matomo.cloud/ccdtgminiappzetavercelapp.matomo.cloud/container_FrIMAdMr.js";
    s.parentNode?.insertBefore(g, s);
  }, []);
  useEffect(() => {
    const loadingTimer = setTimeout(() => setStage("page"), 1000);
    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);
  const notCompletedQuizzes = taskData.filter(
    (task: any) =>
      !completedTask.some(
        (completed: any) =>
          completed.user_id === pointId && completed.task_id === task.task_id
      )
  );
  if (stage === "splash") {
    return <Splashscreen />;
  }
  const userCompletedTask = completedTask.filter(
    (item: any) => item.user_id === pointId
  );
  const progressPercentage =
    taskData?.length > 0
      ? (userCompletedTask.length / taskData.length) * 100
      : 0;

  if (loadingStreak) {
    return <Loading />;
  }
  return (
    <>
      {home ? (
        <div>
          <Hero />
          <div className="flex justify-center items-center  mt-[24px]">
            <div className="bg-gradient-to-r from-[#EDDABF] rounded-[4px] p-[1px] via-[#A49AE3] to-[#9EF2EB] w-[90%]">
              <div
                style={{ backgroundColor: "rgba(25, 27, 27, 1)" }}
                className="h-[176px]  pt-[20px] px-4 w-[100%] rounded-[4px] sm:px-6 lg:px-8"
              >
                <h1 className="text-center">Your progress</h1>
                <div className="max-w-3xl pt-[25px] mx-auto  space-y-2">
                  <div className="mb-[20px]">
                    <ProgressBar progress={progressPercentage} />
                    <div className="py-[15px]">
                      <div className="flex flex-wrap justify-center gap-[1px] items-center ">
                        {taskData.map((task: any, i: any) => {
                          return (
                            <div key={i} className="relative w-4 h-4 mx-auto">
                              <div
                                className={`
                              absolute inset-0
                              bg-gradient-to-r from-blue-400 to-purple-400
                              clip-path-pentagon
                            `}
                              >
                                {notCompletedQuizzes.some(
                                  (quiz: any) => quiz.task_id === task.task_id
                                ) && (
                                  <div className="absolute inset-[1.5px] bg-[#191B1B] clip-path-pentagon"></div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-[16px] mt-[30px] mb-[24px] font-normal text-center  text-white">
                        Tap to see your profile
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SecondHero />
          <style jsx>{`
            .clip-path-pentagon {
              clip-path: polygon(50% 95%, 100% 70%, 100% 0%, 0% 0%, 0% 70%);
            }
          `}</style>
        </div>
      ) : (
        <>
          {showStreak ? (
            <>
              <ClaimReward setClaimNow={setHome} claimNow={home} />
            </>
          ) : (
            <ClaimPoints setHome={setClaimNow} home={claimNow} />
          )}
        </>
      )}
    </>
  );
}
