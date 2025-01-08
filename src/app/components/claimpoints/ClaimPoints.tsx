"use client";
import Image from "next/image";
import logo from "../../../../public/assets/Image/Vector (1).png";
import { Dispatch, SetStateAction, useState } from "react";
import { useData } from "@/context/ContextData";
import { useCurrentData } from "@/context/CurrentUser";
import Loading from "@/(components)/Loading/Loading";
interface QuizModalProps {
  setHome: Dispatch<SetStateAction<boolean>>;
  home: boolean;
}
const dayMap = {
  sunday_points: "Sunday",
  monday_points: "Monday",
  tuesday_points: "Tuesday",
  wednesday_points: "Wednesday",
  thursday_points: "Thursday",
  friday_points: "Friday",
  saturday_points: "Saturday",
};
type WeeklyPoint = {
  earned_at: string;
  point_day: keyof typeof dayMap;
};

export default function ClaimPoints({ setHome, home }: QuizModalProps) {
  const {
    weeklyData,
    weeklyPoint,
    fetchWeeklyPoint,
    loading,
    pointId,
    fetchUsers,
  } = useData();
  const { currentUsers } = useCurrentData();
  const [loading2, setLoading2] = useState(false);
  const handleClaimPoints = async (day: string) => {
    try {
      setLoading2(true);
      const nowTime = new Date();
      const daysOfWeek = [
        { day: "sunday_points", points: weeklyData?.[0].sunday_points },
        { day: "monday_points", points: weeklyData?.[0].monday_points },
        { day: "tuesday_points", points: weeklyData?.[0].tuesday_points },
        { day: "wednesday_points", points: weeklyData?.[0].wednesday_points },
        { day: "thursday_points", points: weeklyData?.[0].thursday_points },
        { day: "friday_points", points: weeklyData?.[0].friday_points },
        { day: "saturday_points", points: weeklyData?.[0].saturday_points },
      ];
      const todayIndex = nowTime.getDay();
      const todayDate = nowTime.getDate();
      const todayMon = nowTime.getMonth();
      const today = daysOfWeek[todayIndex].day;
      const points = daysOfWeek[todayIndex].points;
      const hasClaimedToday = weeklyPoint.some((point: any) => {
        const earnedDate = new Date(point.earned_at);
        return (
          earnedDate.getDate() === todayDate &&
          earnedDate.getMonth() === todayMon &&
          earnedDate.getFullYear() === nowTime.getFullYear()
        );
      });
      if (hasClaimedToday) {
        alert("You have already claimed your points for today!");
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        points: points, // Dynamically use today's points
        earned_at: new Date(),
        point_day: today,
        user_id: pointId,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const res = await fetch(
        "https://ccdtgminiapp-apis.vercel.app/api/user_weekly_points",
        requestOptions
      );
      if (res.ok) {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const updatedPoints =
            currentUsers?.[0]?.user_points == null
              ? points
              : currentUsers?.[0]?.user_points + points;

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
          fetchUsers();
        } catch (error) {
          console.error("Error updating user points:", error);
        }
      }
      setHome(!home);
      await fetchWeeklyPoint();
      setLoading2(false);
    } catch (error) {
      console.error("Error claiming points:", error);
    } finally {
      setLoading2(false);
    }
  };

  const getEarnedDaysForThisWeek = (weeklyPoint: WeeklyPoint[]) => {
    const now = new Date();
    const currentDay = now.getDay();
    const diffToMonday = currentDay === 0 ? 6 : currentDay - 1; // Adjust for Sunday (0)
    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0); // Set to start of the day

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999); // Set to end of the day

    const filteredPoints = weeklyPoint.filter((point: any) => {
      const earnedDate = new Date(point.earned_at);
      return earnedDate >= monday && earnedDate <= sunday;
    });

    const earnedDays = filteredPoints.map((point) => dayMap[point.point_day]);

    return earnedDays;
  };

  const earnedDays = getEarnedDaysForThisWeek(weeklyPoint);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        zIndex: "1000",
        position: "relative",
      }}
    >
      <div
        className="bg-gradient-to-tr from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF]"
        style={{
          width: "95%",
          height: "95vh",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="w-full justify-center items-center flex flex-col ">
          <Image
            src={logo}
            alt="logo"
            style={{
              width: "56px",
              height: "56px",
              marginBottom: 16,
            }}
            className="min-h-660:mt-[32px] mt-[10px]"
          />
          <h1
            style={{
              fontWeight: "normal",
              color: "#101010",
              lineHeight: "56px",
            }}
            className="min-h-660:text-[56px] text-[40px]"
          >
            4 days <br />
            Stake!
          </h1>
          <p
            style={{
              marginTop: "16px",
              fontSize: "24px",
              fontWeight: "normal",
              color: "#101010",
              lineHeight: "56px",
            }}
          >
            Almost a 7 days streak
          </p>
          <div className="w-full">
            {weeklyData.map((item: any, i: any) => {
              return (
                <div
                  key={i}
                  className="flex flex-wrap  min-h-660:mt-[54px] justify-center"
                >
                  <div className="w-[12%] mr-[3px]     flex flex-col justify-center items-center ">
                    <h1
                      style={{
                        fontSize: "12px",
                        fontWeight: "normal",
                        color: "rgba(16, 16, 16, 0.5)",
                      }}
                    >
                      M
                    </h1>
                    <div
                      className={`w-full ${
                        earnedDays.includes("Monday")
                          ? "bg-transparent"
                          : "bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB]"
                      }  rounded-[4px] p-[1px] cursor-pointer`}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          width: "100%",
                          height: 96,
                          border: "1px solid rgba(16, 16, 16, 0.5)",
                          borderRadius: 4,
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)",
                          backgroundColor: earnedDays.includes("Monday")
                            ? "transparent"
                            : "#444554",
                          color: "white",
                        }}
                      >
                        <h1
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "white",
                            lineHeight: "12px",
                          }}
                        >
                          {item.monday_points}
                        </h1>
                        <h1
                          style={{
                            fontSize: "8px",
                            fontWeight: "normal",
                            color: "white",
                            lineHeight: "12px",
                          }}
                        >
                          Points
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="w-[12%] mr-[3px]     flex flex-col justify-center items-center ">
                    <h1
                      style={{
                        fontSize: "12px",
                        fontWeight: "normal",
                        color: "rgba(16, 16, 16, 0.5)",
                      }}
                    >
                      T
                    </h1>
                    <div
                      className={`w-full ${
                        earnedDays.includes("Tuesday")
                          ? "bg-transparent"
                          : "bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB]"
                      }  rounded-[4px] p-[1px] cursor-pointer`}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          width: "100%",
                          height: 96,
                          border: "1px solid rgba(16, 16, 16, 0.5)",
                          borderRadius: 4,
                          backgroundColor: earnedDays.includes("Tuesday")
                            ? "transparent"
                            : "#444554",
                          color: "white",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)",
                        }}
                      >
                        <h1
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "white",

                            lineHeight: "12px",
                          }}
                        >
                          {item.tuesday_points}
                        </h1>
                        <h1
                          style={{
                            fontSize: "8px",
                            fontWeight: "normal",
                            color: "white",

                            lineHeight: "12px",
                          }}
                        >
                          Points
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="w-[12%] mr-[3px]     flex flex-col justify-center items-center ">
                    <h1
                      style={{
                        fontSize: "12px",
                        fontWeight: "normal",
                        color: "rgba(16, 16, 16, 0.5)",
                      }}
                    >
                      W
                    </h1>
                    <div
                      className={`w-full ${
                        earnedDays.includes("Wednesday")
                          ? "bg-transparent"
                          : "bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB]"
                      }  rounded-[4px] p-[1px] cursor-pointer`}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          width: "100%",
                          height: 96,
                          border: "1px solid rgba(16, 16, 16, 0.5)",
                          backgroundColor: earnedDays.includes("Wednesday")
                            ? "transparent"
                            : "#444554",
                          color: "white",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)",

                          borderRadius: 4,
                        }}
                      >
                        <h1
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "white",

                            lineHeight: "12px",
                          }}
                        >
                          {item.wednesday_points}
                        </h1>
                        <h1
                          style={{
                            fontSize: "8px",
                            fontWeight: "normal",
                            color: "white",

                            lineHeight: "12px",
                          }}
                        >
                          Points
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="w-[12%] mr-[3px]     flex flex-col justify-center items-center ">
                    <h1
                      style={{
                        fontSize: "12px",
                        fontWeight: "normal",
                        color: "rgba(16, 16, 16, 0.5)",
                      }}
                    >
                      T
                    </h1>
                    <div
                      className={`w-full ${
                        earnedDays.includes("Thursday")
                          ? "bg-transparent"
                          : "bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB]"
                      }  p-[1px] cursor-pointer rounded-md`}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          width: "100%",
                          height: 96,
                          backgroundColor: earnedDays.includes("Thursday")
                            ? "transparent"
                            : "#444554",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)",
                          borderRadius: 4,
                          border: "1px solid rgba(16, 16, 16, 0.5)",
                        }}
                      >
                        <h1
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "white",
                            lineHeight: "12px",
                          }}
                        >
                          {item.thursday_points}
                        </h1>
                        <h1
                          style={{
                            fontSize: "8px",
                            fontWeight: "normal",
                            color: "white",
                            lineHeight: "12px",
                          }}
                        >
                          Points
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="w-[12%] mr-[3px]     flex flex-col justify-center items-center ">
                    <h1
                      style={{
                        fontSize: "12px",
                        fontWeight: "normal",
                        color: "rgba(16, 16, 16, 0.5)",
                      }}
                    >
                      F
                    </h1>
                    <div
                      className={`w-full ${
                        earnedDays.includes("Friday")
                          ? "bg-transparent"
                          : "bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB]"
                      }  rounded-[4px] p-[1px] cursor-pointer`}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          width: "100%",
                          height: 96,
                          border: "1px solid rgba(16, 16, 16, 0.5)",
                          borderRadius: 4,
                          backgroundColor: earnedDays.includes("Friday")
                            ? "transparent"
                            : "#444554",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)",
                        }}
                      >
                        <h1
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "white",
                            lineHeight: "12px",
                          }}
                        >
                          {item.friday_points}
                        </h1>
                        <h1
                          style={{
                            fontSize: "8px",
                            fontWeight: "normal",
                            color: "white",
                            lineHeight: "12px",
                          }}
                        >
                          Points
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="w-[12%] mr-[3px]     flex flex-col justify-center items-center ">
                    <h1
                      style={{
                        fontSize: "12px",
                        fontWeight: "normal",
                        color: "rgba(16, 16, 16, 0.5)",
                      }}
                    >
                      S
                    </h1>
                    <div
                      className={`w-full ${
                        earnedDays.includes("Saturday")
                          ? "bg-transparent"
                          : "bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB]"
                      }  rounded-[4px] p-[1px] cursor-pointer`}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          width: "100%",
                          height: 96,
                          border: "1px solid rgba(16, 16, 16, 0.5)",
                          borderRadius: 4,
                          backgroundColor: earnedDays.includes("Saturday")
                            ? "transparent"
                            : "#444554",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)",
                        }}
                      >
                        <h1
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "white",
                            lineHeight: "12px",
                          }}
                        >
                          {item.saturday_points}
                        </h1>
                        <h1
                          style={{
                            fontSize: "8px",
                            fontWeight: "normal",
                            color: "white",
                            lineHeight: "12px",
                          }}
                        >
                          Points
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="w-[12%] mr-[3px]     flex flex-col justify-center items-center ">
                    <h1
                      style={{
                        fontSize: "12px",
                        fontWeight: "normal",
                        color: "rgba(16, 16, 16, 0.5)",
                      }}
                    >
                      S
                    </h1>
                    <div
                      className={`w-full ${
                        earnedDays.includes("Sunday")
                          ? "bg-transparent"
                          : "bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB]"
                      }  rounded-[4px] p-[1px] cursor-pointer`}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          width: "100%",
                          height: 96,
                          backgroundColor: earnedDays.includes("Sunday")
                            ? "transparent"
                            : "#444554",
                          border: "1px solid rgba(16, 16, 16, 0.5)",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)",

                          borderRadius: 4,
                        }}
                      >
                        <h1
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "white",
                            lineHeight: "12px",
                          }}
                        >
                          {item.sunday_points}
                        </h1>
                        <h1
                          style={{
                            fontSize: "8px",
                            fontWeight: "normal",
                            color: "white",
                            lineHeight: "12px",
                          }}
                        >
                          Points
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="w-[198px] text-[16px]  text-[#101010] font-normal text-center mt-[30px]">
            Your streak will reset at the start of each new week
          </p>
        </div>
        {loading2 ? (
          <button
            onClick={() =>
              handleClaimPoints(
                new Date()
                  .toLocaleDateString("en-US", { weekday: "long" })
                  .toLowerCase() + "_points"
              )
            }
            className="w-[90%] flex justify-center items-center h-[56px] bg-[#101010] text-[16px] font-bold  rounded-[50px] mb-[24px]"
          >
            Loading...
          </button>
        ) : (
          <button
            onClick={() =>
              handleClaimPoints(
                new Date()
                  .toLocaleDateString("en-US", { weekday: "long" })
                  .toLowerCase() + "_points"
              )
            }
            className="w-[90%] flex justify-center items-center h-[56px] bg-[#101010] text-[16px] font-bold  rounded-[50px] mb-[24px]"
          >
            Claim your Points
          </button>
        )}
      </div>
    </div>
  );
}
