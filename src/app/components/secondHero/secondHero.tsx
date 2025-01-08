import Image from "next/image";
import React, { useState } from "react";
import image from "../../../../public/svg/Vector (2).svg";
import image5 from "../../../../public/svg/tele.svg"
import image4 from "../../../../public/assets/Image/Button.svg";
import image2 from "../../../../public/svg/icons8-discord (2).svg";
import Link from "next/link";
import { useData } from "@/context/ContextData";
import axios from "axios";
import cross from "../../../../public/svg/cross.svg";
import { useCurrentData } from "@/context/CurrentUser";

export default function SecondHero() {
  const { taskData, fetchUsers, completedTask, pointId, fetchCompletedTask } =
    useData();
  const { currentUsers, fun } = useCurrentData();
  const [selectedTask, setSelectedTask] = useState({
    points: "",
    task_id: "",
  });
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (points: any, task_id: any, platform: any) => {
    setSelectedTask({
      points,
      task_id,
    });
    setSelectedPlatform(platform);
    setOpenModal(true);
  };
  const notCompletedQuizzes = taskData.filter((task: any) =>
    completedTask.some(
      (completed: any) =>
        completed.user_id === pointId && completed.task_id === task.task_id
    )
  );

  const [discordId, setDiscordId] = useState("");
  const [twitterId, setTwitterId] = useState("");

  const checkDiscordMember = async () => {
    try {
      setLoading(true);

      // Check Discord Member
      const res = await axios.get(
        `https://ccdtgminiapp-apis.vercel.app/api/check-discord-member?discord_id=${discordId}`
      );

      if (res.status !== 200) {
        throw new Error(`Error checking Discord member: ${res.statusText}`);
      }

      // Function to update user points
      const updateUserPoints = async (pointsToAdd: any) => {
        try {
          const updatedPoints =
            currentUsers?.[0]?.user_points == null
              ? pointsToAdd
              : currentUsers?.[0]?.user_points + pointsToAdd;

          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_points: updatedPoints }),
          };

          const res2 = await fetch(
            `https://ccdtgminiapp-apis.vercel.app/api/users/${pointId}`,
            requestOptions
          );

          if (!res2.ok) {
            throw new Error(
              `Error updating user points: ${res2.status} - ${res2.statusText}`
            );
          }
        } catch (err: any) {
          throw new Error(`Update User Points Failed: ${err.message}`);
        }
      };

      // Update user points
      await updateUserPoints(selectedTask?.points);

      // Add completed task
      const res3 = await fetch(
        "https://ccdtgminiapp-apis.vercel.app/api/completedTask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: pointId,
            task_id: selectedTask.task_id,
            task_points: selectedTask.points,
          }),
        }
      );

      if (!res3.ok) {
        throw new Error(
          `Error adding completed task: ${res3.status} - ${res3.statusText}`
        );
      }

      // Refresh data
      fetchCompletedTask();
      fetchUsers();
      fun();

      // Close modal
      setLoading(false);
      setOpenModal(false);
    } catch (error: any) {
      alert("Your are not the member ");
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };

  const checkTwitterMention = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ccdtgminiapp-apis.vercel.app/api/twitter?id=${twitterId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.warn("Failed to fetch tweet data. Check the Twitter ID.");
        if (response.status === 429) {
          alert(
            "You have exceeded the rate limit for this endpoint. Please try again later."
          );
        }
        return;
      }

      const tweetData = await response.json();

      if (tweetData && tweetData.length > 0) {
        const tweetMentions = tweetData[0].mentions;
        if (!tweetMentions.includes("@Concordium")) {
          alert("Not mentioned  found in tweet.");
          return;
        }
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const updatedPoints =
            currentUsers?.[0]?.user_points == null
              ? selectedTask.points
              : currentUsers?.[0]?.user_points + selectedTask.points;

          const raw = JSON.stringify({
            user_points: updatedPoints,
          });

          const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
          };

          await fetch(
            `https://ccdtgminiapp-apis.vercel.app/api/users/${pointId}`,
            requestOptions
          );
          try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
              user_id: pointId,
              task_id: selectedTask.task_id,
              task_points: selectedTask.points,
            });

            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
            };

            await fetch(
              "https://ccdtgminiapp-apis.vercel.app/api/completedTask",
              requestOptions
            );
          } catch (error) {
            console.error("Error updating user points:", error);
          }
        } catch (error) {
          alert(error);
        }
      } else {
        console.warn("No tweets found for the provided ID.");
        alert("No tweet found for the provided Twitter ID.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tweet data:", error);
      alert(error);
    } finally {
      setLoading(false);
      setOpenModal(false);
      await fetchCompletedTask();
      await fetchUsers();
      await fun();
    }
  };

  const checkTelegramMember = () => {
    const BOT_TOKEN = "7589469392:AAF28lrfcF-iK9I7KFJE4nEKcDBPfa3F6q0";
    const CHANNEL_USERNAME = "@fistatesting";

    async function checkMembership() {
      setLoading(true);
      try {
        setLoading(true);
        const membershipResponse = await axios.get(
          `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember`,
          {
            params: {
              chat_id: CHANNEL_USERNAME,
              user_id: currentUsers?.[0]?.telegram_id,
            },
          }
        );

        const { status } = membershipResponse.data.result;
        if (
          status === "member" ||
          status === "administrator" ||
          status === "creator"
        ) {
          const updateUserPoints = async (pointsToAdd: any) => {
            try {
              const updatedPoints =
                currentUsers?.[0]?.user_points == null
                  ? pointsToAdd
                  : currentUsers?.[0]?.user_points + pointsToAdd;

              const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_points: updatedPoints }),
              };

              const res2 = await fetch(
                `https://ccdtgminiapp-apis.vercel.app/api/users/${pointId}`,
                requestOptions
              );

              if (!res2.ok) {
                throw new Error(
                  `Error updating user points: ${res2.status} - ${res2.statusText}`
                );
              }
            } catch (err: any) {
              throw new Error(`Update User Points Failed: ${err.message}`);
            }
          };

          // Update user points
          await updateUserPoints(selectedTask?.points);

          // Add completed task
          const res3 = await fetch(
            "https://ccdtgminiapp-apis.vercel.app/api/completedTask",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: pointId,
                task_id: selectedTask.task_id,
                task_points: selectedTask.points,
              }),
            }
          );

          if (!res3.ok) {
            throw new Error(
              `Error adding completed task: ${res3.status} - ${res3.statusText}`
            );
          }

          // Refresh data
          fetchCompletedTask();
          fetchUsers();
          fun();

          // Close modal
          setLoading(false);
          setOpenModal(false);
        } else {
          alert("User is not a member of the channel.");
        }
      } catch (error: any) {
        alert(`error`);
      }finally{
         setLoading(false);
      }
    }

    checkMembership();
  };

  return (
    <>
      <div className="flex flex-col justify-center mt-[46px] overflow-y-auto">
        <div className="flex justify-center  text-center">
          <p className="text-[24px] font-normal  w-[280px]">
            Complete all tasks to recieve 2 x lottery tickets
          </p>
        </div>
        <div className="flex  justify-center">
          <div
            className="h-[0.8px] mt-[20px] w-[90%] bg-white"
            style={{
              backgroundColor: "rgba(217, 217, 217, 1)",
            }}
          />
        </div>
        <div className="flex flex-col items-center mb-[100px]">
          {taskData.map((task: any, index: any) => (
            <div key={index} className="flex flex-col w-[90%]  justify-between">
              <div className="flex flex-row  items-center justify-between ">
                <div className="flex flex-row gap-2">
                  {
                    task.platform === "twitter"&&
                  <Image
                    src={image }
                    alt="logo"
                    width={35}
                    height={35}
                    style={{ marginRight: 15 }}
                  />
                  }
                  {
                    task.platform === "discord"&&
                  <Image
                    src={image2 }
                    alt="logo"
                    width={35}
                    height={35}
                    style={{ marginRight: 15 }}
                  />
                  }
                  {
                    task.platform === "telegram"&&
                  <Image
                    src={image5 }
                    alt="logo"
                    width={35}
                    height={35}
                    style={{ marginRight: 15 }}
                  />
                  }
                  <div>
                    <p className="text-[12px] font-satoshi leading-[16px] font-normal w-[158px]">
                      {task.task_title.length > 28
                        ? `${task.task_title.slice(0, 28)}...`
                        : task.task_title}
                    </p>
                    <p className="text-[12px] font-normal w-[158px] ">
                      {`${
                        task.task_type.charAt(0).toUpperCase() +
                        task.task_type.slice(1)
                      } on ${
                        task.platform.charAt(0).toUpperCase() +
                        task.platform.slice(1)
                      }`}
                    </p>
                    <p className="text-[12px] mt-[10px] font-bold">
                      {task.points.toLocaleString()}
                    </p>
                  </div>
                </div>
                {notCompletedQuizzes.some(
                  (quiz: any) => quiz.task_id === task.task_id
                ) ? (
                  <div className="my-5">
                    <Image src={image4} alt="arrow" width={45} height={45} />
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      handleOpenModal(task.points, task.task_id, task.platform)
                    }
                    className="text-[#101010] mt-[25px] w-[103px] text-[16px] font-bold  h-[50px] rounded-[50px] mb-[24px] bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] flex justify-center items-center"
                  >
                    <button className="">Start</button>
                  </div>
                )}
              </div>
              <div
                className="h-[0.8px]   bg-white"
                style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}
              />
            </div>
          ))}
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 flex  justify-center items-center">
          <div className="absolute inset-0 bg-black z-0 opacity-50"></div>
          <div className="flex justify-center items-center z-20   w-[90%]">
            <div className=" rounded-[4px] p-[1px] bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB]  w-[90%]">
              <div
                style={{ backgroundColor: "rgba(25, 27, 27, 1)" }}
                className=" p-3  w-[100%] rounded-[4px] sm:px-6 lg:px-8"
              >
                <div className="flex justify-between items-center">
                  {selectedPlatform === "twitter" && (
                    <h1 className="pb-3">Mention in Twitter Post</h1>
                  )}
                  {selectedPlatform === "discord" && (
                    <h1 className="pb-3">Join on Discord</h1>
                  )}
                  {selectedPlatform === "telegram" && (
                    <p className="text-base mt-[10px] ">
                      Telegram Channel Link :{" "}
                      <Link
                        className="text-blue-600"
                        href={"https://t.me/fistatesting"}
                        target="_blank"
                      >
                        https://t.me/fistatesting
                      </Link>
                    </p>
                  )}
                  {selectedPlatform === "linkedin" && (
                    <h1 className="pb-3">Follow on LinkedIn</h1>
                  )}
                  {selectedPlatform === "youtube" && (
                    <h1 className="pb-3">Follow on Youtube</h1>
                  )}

                  <Image
                    src={cross}
                    width={20}
                    height={20}
                    alt="cross"
                    onClick={() => setOpenModal(false)}
                  />
                </div>
                <div className="max-w-3xl  mx-auto  ]">
                  {selectedPlatform === "twitter" && (
                    <input
                      type="text" 
                      placeholder="Enter Tweet URL"
                      onChange={(e: any) => {
                        const url = e.target.value;
                        const match = url.match(/status\/(\d+)/);
                        if (match) {
                          const tweetId = match[1];
                          setTwitterId(tweetId);
                        } else {
                          console.warn("Invalid Twitter URL");
                          setTwitterId("");
                        }
                      }}
                      className="pl-2 placeholder:text-white w-[100%] bg-transparent h-[40px] rounded-[4px] border-[1px] border-[#EDDABF]"
                    />
                  )}
                  {selectedPlatform === "discord" && (
                    <input
                      type="text"
                      placeholder="Enter Discord Your Id"
                      onChange={(e: any) => setDiscordId(e.target.value)}
                      className=" pl-2 placeholder:text-white w-[100%] bg-transparent h-[40px] rounded-[4px] border-[1px] border-[#EDDABF]"
                    />
                  )}
                  {selectedPlatform === "telegram" && <></>}
                </div>
                <div className="flex justify-end items-center w-full">
                  {loading ? (
                    <div className="text-[#101010] py-[2px] w-fit  px-2  mt-2  text-[16px] font-medium   rounded-[50px]  bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] ">
                      Loading...
                    </div>
                  ) : (
                    <>
                      {selectedPlatform === "twitter" && (
                        <div
                          onClick={checkTwitterMention}
                          className="text-[#101010] py-[2px] w-fit  px-2  mt-2  text-[16px] font-medium   rounded-[50px]  bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] "
                        >
                          <button className="">Submit</button>
                        </div>
                      )}
                      {selectedPlatform === "discord" && (
                        <div
                          onClick={checkDiscordMember}
                          className="text-[#101010] py-[2px] w-fit  px-2  mt-2  text-[16px] font-medium   rounded-[50px]  bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] "
                        >
                          <button className="">Submit</button>
                        </div>
                      )}
                      {selectedPlatform === "telegram" && (
                        <div
                          onClick={checkTelegramMember}
                          className="text-[#101010] py-[2px] w-fit  px-2  mt-2  text-[16px] font-medium   rounded-[50px]  bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] "
                        >
                          <button>Join </button>
                        </div>
                      )}

                      {selectedPlatform === "linkedin" && (
                        <div
                          onClick={checkTelegramMember}
                          className="text-[#101010] py-[2px] w-fit  px-2  mt-2  text-[16px] font-medium   rounded-[50px]  bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] "
                        >
                          <button className="">Submit</button>
                        </div>
                      )}
                      {selectedPlatform === "youtube" && (
                        <div
                          onClick={checkTelegramMember}
                          className="text-[#101010] py-[2px] w-fit  px-2  mt-2  text-[16px] font-medium   rounded-[50px]  bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] "
                        >
                          <button className="">Submit</button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {selectedPlatform === "twitter" && (
                  <p className="text-xs mt-[20px]">
                    Mention in Tweet :{" "}
                    <Link
                      className="text-blue-600"
                      href={"https://discord.gg/CVnJFg9C"}
                      target="_blank"
                    >
                      Concordium
                    </Link>
                  </p>
                )}
                {selectedPlatform === "discord" && (
                  <p className="text-xs mt-[20px]">
                    Discord Server Link :{" "}
                    <Link
                      className="text-blue-600"
                      href={"https://discord.gg/CVnJFg9C"}
                      target="_blank"
                    >
                      https://discord.gg/CVnJFg9C
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// import Image from "next/image";
// import React, { useState } from "react";
// import image from "../../../../public/svg/Vector (2).svg";
// import image4 from "../../../../public/assets/Image/Button.svg";
// import image2 from "../../../../public/svg/icons8-discord (2).svg";
// import Link from "next/link";
// import { useData } from "@/context/ContextData";
// import axios from "axios";
// import cross from "../../../../public/svg/cross.svg";
// import { useCurrentData } from "@/context/CurrentUser";

// export default function SecondHero() {
//   const { taskData, fetchUsers, completedTask, pointId, fetchCompletedTask } =
//     useData();
//   const { currentUsers, fun } = useCurrentData();
//   const [selectedTask, setSelectedTask] = useState({
//     points: "",
//     task_id: "",
//   });
//   const [selectedPlatform, setSelectedPlatform] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const handleOpenModal = (points: any, task_id: any, platform: any) => {
//     setSelectedTask({
//       points,
//       task_id,
//     });
//     setSelectedPlatform(platform);
//     setOpenModal(true);
//   };
//   const notCompletedQuizzes = taskData.filter((task: any) =>
//     completedTask.some(
//       (completed: any) =>
//         completed.user_id === pointId && completed.task_id === task.task_id
//     )
//   );

//   const [discordId, setDiscordId] = useState("");
//   const [twitterId, setTwitterId] = useState("");

//   const checkDiscordMember = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `https://ccdtgminiapp-apis.vercel.app/api/check-discord-member?discord_id=${discordId}`
//       );

//       try {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const updatedPoints =
//           currentUsers?.[0]?.user_points == null
//             ? selectedTask.points
//             : currentUsers?.[0]?.user_points + selectedTask.points;

//         const raw = JSON.stringify({
//           user_points: updatedPoints,
//         });

//         const requestOptions = {
//           method: "PUT",
//           headers: myHeaders,
//           body: raw,
//         };

//         await fetch(
//           `https://ccdtgminiapp-apis.vercel.app/api/users/${pointId}`,
//           requestOptions
//         );
//         try {
//           const myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/json");

//           const raw = JSON.stringify({
//             user_id: pointId,
//             task_id: selectedTask.task_id,
//             task_points: selectedTask.points,
//           });

//           const requestOptions = {
//             method: "POST",
//             headers: myHeaders,
//             body: raw,
//           };

//           await fetch(
//             "https://ccdtgminiapp-apis.vercel.app/api/completedTask",
//             requestOptions
//           );
//         } catch (error) {}
//       } catch (error) {
//         console.error("Error updating user points:", error);
//       }
//       setLoading(false);
//       setOpenModal(false);
//       fetchCompletedTask();
//       fetchUsers();
//       fun();
//       const progressPercentage =
//         taskData?.length > 0
//           ? (completedTask.length / taskData.length) * 100
//           : 0;
//       if (progressPercentage > 19) {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const updatedPoints =
//           currentUsers?.[0]?.user_points == null
//             ? selectedTask.points
//             : currentUsers?.[0]?.user_points + 6000;

//         const raw = JSON.stringify({
//           user_points: updatedPoints,
//         });

//         const requestOptions = {
//           method: "PUT",
//           headers: myHeaders,
//           body: raw,
//         };

//         await fetch(
//           `https://ccdtgminiapp-apis.vercel.app/api/users/${pointId}`,
//           requestOptions
//         );
//       } else if (progressPercentage > 49) {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const updatedPoints =
//           currentUsers?.[0]?.user_points == null
//             ? selectedTask.points
//             : currentUsers?.[0]?.user_points + 12000;

//         const raw = JSON.stringify({
//           user_points: updatedPoints,
//         });

//         const requestOptions = {
//           method: "PUT",
//           headers: myHeaders,
//           body: raw,
//         };

//         await fetch(
//           `https://ccdtgminiapp-apis.vercel.app/api/users/${pointId}`,
//           requestOptions
//         );
//       } else if (progressPercentage > 79) {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const updatedPoints =
//           currentUsers?.[0]?.user_points == null
//             ? selectedTask.points
//             : currentUsers?.[0]?.user_points + 20000;

//         const raw = JSON.stringify({
//           user_points: updatedPoints,
//         });

//         const requestOptions = {
//           method: "PUT",
//           headers: myHeaders,
//           body: raw,
//         };

//         await fetch(
//           `https://ccdtgminiapp-apis.vercel.app/api/users/${pointId}`,
//           requestOptions
//         );
//       }
//     } catch (error: any) {
//       alert("Your Are Not A Member Of Our Discord Server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkTwitterMention = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://ccdtgminiapp-apis.vercel.app/api/twitter?id=${twitterId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         console.warn("Failed to fetch tweet data. Check the Twitter ID.");
//         if (response.status === 429) {
//           alert(
//             "You have exceeded the rate limit for this endpoint. Please try again later."
//           );
//         }
//         return;
//       }

//       const tweetData = await response.json();

//       if (tweetData && tweetData.length > 0) {
//         const tweetMentions = tweetData[0].mentions;
//         if (!tweetMentions.includes("@ConcordiumNet")) {
//           alert("Not mentioned  found in tweet.");
//           return;
//         }
//         try {
//           const myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/json");

//           const updatedPoints =
//             currentUsers?.[0]?.user_points == null
//               ? selectedTask.points
//               : currentUsers?.[0]?.user_points + selectedTask.points;

//           const raw = JSON.stringify({
//             user_points: updatedPoints,
//           });

//           const requestOptions = {
//             method: "PUT",
//             headers: myHeaders,
//             body: raw,
//           };

//           await fetch(
//             `https://ccdtgminiapp-apis.vercel.app/api/users/${pointId}`,
//             requestOptions
//           );
//           try {
//             const myHeaders = new Headers();
//             myHeaders.append("Content-Type", "application/json");

//             const raw = JSON.stringify({
//               user_id: pointId,
//               task_id: selectedTask.task_id,
//               task_points: selectedTask.points,
//             });

//             const requestOptions = {
//               method: "POST",
//               headers: myHeaders,
//               body: raw,
//             };

//             await fetch(
//               "https://ccdtgminiapp-apis.vercel.app/api/completedTask",
//               requestOptions
//             );
//           } catch (error) {
//             console.error("Error updating user points:", error);
//           }
//         } catch (error) {
//           alert(error);
//         }
//       } else {
//         console.warn("No tweets found for the provided ID.");
//         alert("No tweet found for the provided Twitter ID.");
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching tweet data:", error);
//       alert(error);
//     } finally {
//       setLoading(false);
//       setOpenModal(false);
//       fetchCompletedTask();
//       fetchUsers();
//       fun();
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col justify-center mt-[46px] overflow-y-auto">
//         <div className="flex justify-center  text-center">
//           <p className="text-[24px] font-normal  w-[280px]">
//             Complete all tasks to recieve 2 x lottery tickets
//           </p>
//         </div>
//         <div className="flex  justify-center">
//           <div
//             className="h-[0.8px] mt-[20px] w-[90%] bg-white"
//             style={{
//               backgroundColor: "rgba(217, 217, 217, 1)",
//             }}
//           />
//         </div>
//         <div className="flex flex-col items-center mb-[100px]">
//           {taskData.map((task: any, index: any) => (
//             <div key={index} className="flex flex-col w-[90%]  justify-between">
//               <div className="flex flex-row  items-center justify-between ">
//                 <div className="flex flex-row gap-2">
//                   <Image
//                     src={task.platform === "twitter" ? image : image2}
//                     alt="logo"
//                     width={35}
//                     height={35}
//                     style={{ marginRight: 15 }}
//                   />
//                   <div>
//                     <p className="text-[12px] font-satoshi leading-[16px] font-normal w-[158px]">
//                       {task.task_title.length > 28
//                         ? `${task.task_title.slice(0, 28)}...`
//                         : task.task_title}
//                     </p>
//                     <p className="text-[12px] font-normal w-[158px] ">
//                       {`${
//                         task.task_type.charAt(0).toUpperCase() +
//                         task.task_type.slice(1)
//                       } on ${
//                         task.platform.charAt(0).toUpperCase() +
//                         task.platform.slice(1)
//                       }`}
//                     </p>
//                     <p className="text-[12px] mt-[10px] font-bold">
//                       {task.points.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//                 {notCompletedQuizzes.some(
//                   (quiz: any) => quiz.task_id === task.task_id
//                 ) ? (
//                   <div className="my-5">
//                     <Image src={image4} alt="arrow" width={45} height={45} />
//                   </div>
//                 ) : (
//                   <div
//                     onClick={() =>
//                       handleOpenModal(task.points, task.task_id, task.platform)
//                     }
//                     className="text-[#101010] mt-[25px] w-[103px] text-[16px] font-bold  h-[50px] rounded-[50px] mb-[24px] bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] flex justify-center items-center"
//                   >
//                     <button className="">Start</button>
//                   </div>
//                 )}
//               </div>
//               <div
//                 className="h-[0.8px]   bg-white"
//                 style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       {openModal && (
//         <div className="fixed inset-0 flex  justify-center items-center">
//           <div className="absolute inset-0 bg-black z-0 opacity-50"></div>
//           <div className="flex justify-center items-center z-20   w-[90%]">
//             <div className=" rounded-[4px] p-[1px] bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB]  w-[90%]">
//               <div
//                 style={{ backgroundColor: "rgba(25, 27, 27, 1)" }}
//                 className=" p-3  w-[100%] rounded-[4px] sm:px-6 lg:px-8"
//               >
//                 <div className="flex justify-between items-center">
//                   {selectedPlatform === "twitter" ? (
//                     <h1 className="pb-3">Mention in Twitter Post</h1>
//                   ) : (
//                     <h1 className="pb-3">Join Discord Server</h1>
//                   )}
//                   <Image
//                     src={cross}
//                     width={20}
//                     height={20}
//                     alt="cross"
//                     onClick={() => setOpenModal(false)}
//                   />
//                 </div>
//                 <div className="max-w-3xl  mx-auto  ]">
//                   {selectedPlatform === "twitter" ? (
//                     <input
//                       type="text"
//                       placeholder="Enter Tweet URL"
//                       onChange={(e: any) => {
//                         const url = e.target.value;
//                         const match = url.match(/status\/(\d+)/);
//                         if (match) {
//                           const tweetId = match[1];
//                           setTwitterId(tweetId);
//                         } else {
//                           console.warn("Invalid Twitter URL");
//                           setTwitterId("");
//                         }
//                       }}
//                       className="pl-2 placeholder:text-white w-[100%] bg-transparent h-[40px] rounded-[4px] border-[1px] border-[#EDDABF]"
//                     />
//                   ) : (
//                     <input
//                       type="text"
//                       placeholder="Enter Discord Your Id"
//                       onChange={(e: any) => setDiscordId(e.target.value)}
//                       className=" pl-2 placeholder:text-white w-[100%] bg-transparent h-[40px] rounded-[4px] border-[1px] border-[#EDDABF]"
//                     />
//                   )}
//                 </div>
//                 <div className="flex justify-end items-center w-full">
//                   {loading ? (
//                     <div className="text-[#101010] py-[2px] w-fit  px-2  mt-2  text-[16px] font-medium   rounded-[50px]  bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] ">
//                       Loading...
//                     </div>
//                   ) : (
//                     <>
//                       {selectedPlatform === "twitter" ? (
//                         <div
//                           onClick={checkTwitterMention}
//                           className="text-[#101010] py-[2px] w-fit  px-2  mt-2  text-[16px] font-medium   rounded-[50px]  bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] "
//                         >
//                           <button className="">Submit</button>
//                         </div>
//                       ) : (
//                         <div
//                           onClick={checkDiscordMember}
//                           className="text-[#101010] py-[2px] w-fit  px-2  mt-2  text-[16px] font-medium   rounded-[50px]  bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] "
//                         >
//                           <button className="">Submit</button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//                 {selectedPlatform === "twitter" ? (
//                   <p className="text-xs mt-[20px]">
//                     Mention in Tweet :{" "}
//                     <Link
//                       className="text-blue-600"
//                       href={"https://discord.gg/CVnJFg9C"}
//                       target="_blank"
//                     >
//                       CDD
//                     </Link>
//                   </p>
//                 ) : (
//                   <p className="text-xs mt-[20px]">
//                     Discord Server Link :{" "}
//                     <Link
//                       className="text-blue-600"
//                       href={"https://discord.gg/CVnJFg9C"}
//                       target="_blank"
//                     >
//                       https://discord.gg/CVnJFg9C
//                     </Link>
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
