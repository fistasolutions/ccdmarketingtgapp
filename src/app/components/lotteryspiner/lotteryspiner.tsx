// "use client";
// import { useData } from "@/context/ContextData";
// import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
// import Loading from "../Loading/Loading";
// interface WheelSegment {
//   label: string;
//   isJackpot?: boolean;
// }
// interface QuizModalProps {
//   setSpineWinner: Dispatch<SetStateAction<boolean>>;
// }

// export default function LotteryWheel({setSpineWinner}:QuizModalProps) {
//   const {lottery,loading}=useData()
//   console.log(lottery)
//   const SEGMENTS: WheelSegment[] = (lottery && lottery.length >= 11)
//     ? [
//         { label: `${lottery[0]?.rewardValue || "0"} ticket` },
//         { label: `${lottery[1]?.rewardValue || "0"} ticket` },
//         { label: `${lottery[2]?.rewardValue || "0"} ticket` },
//         { label: `${lottery[3]?.rewardValue || "0"} ticket` },
//         { label: `${lottery[4]?.rewardValue || "0"} ticket` },
//         { label: `${lottery[5]?.rewardValue || "0"} ticket` },
//         { label: `${lottery[6]?.rewardValue || "0"} ticket` },
//         { label: `${lottery[7]?.rewardValue || "0"} ticket` },
//         { label: `${lottery[8]?.rewardValue || "0"} ticket` },
//         { label: `${lottery[9]?.rewardValue || "0"} ticket` },
//         { label: `${lottery[10]?.rewardValue || "0"} ticket` },
//         { label: "Jackpot", isJackpot: true },
//       ]
//     : [{ label: "Loading..." }];
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [rotation, setRotation] = useState(0);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [spinsLeft, setSpinsLeft] = useState(2);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     const centerX = canvas.width / 2;
//     const centerY = canvas.height / 2;
//     const radius = Math.min(centerX, centerY) - 40;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// const gradient = ctx.createLinearGradient(
//   0,
//   0,
//   canvas.width,
//   canvas.height
// );
// gradient.addColorStop(0, "rgba(125, 125, 255, 0.2)");
// gradient.addColorStop(1, "rgba(125, 125, 255, 0.1)");
// ctx.beginPath();
// ctx.arc(centerX, centerY, radius + 4, 0, Math.PI * 2);
//     const segmentAngle = (Math.PI * 2) / SEGMENTS.length;
//     const gradient2 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
// gradient2.addColorStop(0, '#EDDABF');
// gradient2.addColorStop(1, '#9EF2EBCC');
// ctx.strokeStyle = gradient2;
// ctx.lineWidth = 2;
// ctx.stroke();
//     SEGMENTS.forEach((segment, index) => {
//       const startAngle = index * segmentAngle + rotation;
//       const endAngle = startAngle + segmentAngle;
//       ctx.beginPath();
//       ctx.moveTo(centerX, centerY);
//       ctx.arc(centerX, centerY, radius, startAngle, endAngle);
//       ctx.closePath();
//       ctx.fillStyle = "rgba(32, 32, 32, 0.8)";
//       ctx.fill();
//       ctx.strokeStyle = "black";
//       ctx.stroke();
//       ctx.lineWidth = 0;
// ctx.stroke();
//   ctx.save();
//       ctx.translate(centerX, centerY);
//       ctx.rotate(startAngle + segmentAngle / 2);
//       ctx.rotate(Math.PI / 2);
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       const textRadius = radius - 20;
//       const topPadding = 5;
//       ctx.font = "14px Inter";
//       ctx.fillStyle = "white";
//       const [upperText, lowerText] = segment.label.split(" ");
//       ctx.fillText(upperText, 0, -textRadius + topPadding);
//       ctx.fillText(lowerText, 0, -textRadius + topPadding + 25);
//       if (segment.isJackpot) {
//         const starX = 8;
//         const starY = -textRadius + topPadding + 2;
//         ctx.font = "24px Inter";
//         ctx.fillText("⭐", starX, starY);
//       }
//       ctx.restore();
//     });
//     const centerRadius = radius * 0.6;
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
//     ctx.fillStyle = "black";
//     ctx.fill();
//     ctx.strokeStyle = "black";
//     ctx.stroke();
//     ctx.fillStyle = "white";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.font = "30px Inter";
//     ctx.fillText(`${spinsLeft} spins left`, centerX, centerY);
//     const pointerHeight = 42;
//     const pointerWidth = 36;
//     const pointerY = centerY - 0.8 - 150;
//     ctx.beginPath();
//     ctx.moveTo(centerX - pointerWidth / 2, pointerY);
//     ctx.lineTo(centerX + pointerWidth / 2, pointerY);
//     ctx.lineTo(centerX, pointerY - pointerHeight);
//     ctx.closePath();
//     ctx.fillStyle = "#8b5cf6";
//     ctx.fill();
//   }, [rotation, spinsLeft]);
//   const spin = () => {
//     if (isSpinning || spinsLeft <= 0) return;
//     setIsSpinning(true);
//     setSpinsLeft((prev) => prev - 1);
//     const spinCount = 5 + Math.random() * 5;
//     const targetRotation = rotation - Math.PI * 2 * spinCount;
//     let startTime: number | null = null;
//     const duration = 4000;
//     const animate = (currentTime: number) => {
//       if (!startTime) startTime = currentTime;
//       const elapsed = currentTime - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
//       const currentRotation =
//         rotation + (targetRotation - rotation) * easeOut(progress);
//       setRotation(currentRotation);
//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       } else {
//         const finalRotation = targetRotation % (Math.PI * 2);
//         setRotation(finalRotation);
//         setIsSpinning(false);
//         setSpineWinner(true)
//       }
//     };
//     requestAnimationFrame(animate);
//   };
//   if (loading || !lottery || lottery.length === 0) {
//     return <div><Loading /></div>;
//   }

//   return (
//     <div className="flex  flex-col justify-between h-full items-center gap-4 w-full">
//       <canvas
//         ref={canvasRef}
//         width={650}
//         height={650}
//         className="w-full h-full   rounded-full "
//         />
//       <div className="flex justify-center  min-h-780:w-[90%] w-[70%]">
//         <div className="bg-gradient-to-r p-[2px] from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] h-[105px] w-full rounded-[4px]">
//           <div className="bg-[#191B1B]  w-full h-full  py-[10px]  flex flex-col justify-between items-center">
//             <p className="text-[16px] font-normal w-[230px]  leading-[19px] text-center">
//               Double your lottery ticket by completing all tasks every week
//             </p>
//             <p className="text-[12px] font-medium w-[220px]  text-center">
//               Tap to get 2 x Boost
//             </p>
//           </div>
//         </div>
//         <div></div>
//       </div>
//       <div className="flex justify-center items-center w-full">
//         <button
//           onClick={spin}
//           className="text-[#101010]  text-[16px] font-bold min-h-780:w-[90%]  h-[56px] w-[70%] mt-[10px] rounded-[50px] mb-[100px] bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] flex justify-center items-center"
//         >
//           {isSpinning ? "Spinning..." : "Spin the Wheel!"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import { useData } from "@/context/ContextData";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Loading from "../Loading/Loading";
import { useCurrentData } from "@/context/CurrentUser";

interface WheelSegment {
  label: string;
  isJackpot?: boolean;
}

interface QuizModalProps {
  setSpineWinner: Dispatch<SetStateAction<boolean>>;
  setWinningValue: Dispatch<SetStateAction<number | null>>;
}

export default function LotteryWheel({
  setSpineWinner,
  setWinningValue,
}: QuizModalProps) {
  const {
    lottery,
    loading,
    fetchSpin,
    remainingSpin,
    fetchSpinRewards,
    fetchLottery,
    spinData,
    fetchUsers,
  } = useData();
  const SEGMENTS: WheelSegment[] =
    lottery && lottery.length >= 11
      ? [
          { label: `${lottery[0]?.rewardName || "0"}` },
          { label: `${lottery[1]?.rewardName || "0"}` },
          { label: `${lottery[2]?.rewardName || "0"}` },
          { label: `${lottery[3]?.rewardName || "0"}` },
          { label: `${lottery[4]?.rewardName || "0"}` },
          { label: `${lottery[5]?.rewardName || "0"}` },
          { label: `${lottery[6]?.rewardName || "0"}` },
          { label: `${lottery[7]?.rewardName || "0"}` },
          { label: `${lottery[8]?.rewardName || "0"}` },
          { label: `${lottery[9]?.rewardName || "0"}` },
          { label: `${lottery[10]?.rewardName || "0"}` },
          { label: "Jackpot", isJackpot: true },
        ]
      : [{ label: "Loading..." }];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const { pointId } = useData();
  const { fun, currentUsers } = useCurrentData();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || SEGMENTS.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#9EF2EB");
    gradient.addColorStop(1, "#EDDABF");
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 4, 0, Math.PI * 2);
    const segmentAngle = (Math.PI * 2) / SEGMENTS.length;
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.stroke();

    SEGMENTS.forEach((segment, index) => {
      const startAngle = index * segmentAngle + rotation;
      const endAngle = startAngle + segmentAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = "#222526";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.lineWidth = 0;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.rotate(Math.PI / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const textRadius = radius - 28;
      const topPadding = 5;
      ctx.font = "20px 'Satoshi-Regular'";
      ctx.fillStyle = "white";

      const [upperText, lowerText] = segment.label.split(" ");
      ctx.fillText(upperText, 0, -textRadius + topPadding);
      if (!segment.isJackpot) {
        ctx.fillText(lowerText, 0, -textRadius + topPadding + 25);
      } else {
        const starX = 8;
        const starY = -textRadius + topPadding + 25;
        ctx.font = "20px Satoshi-Regular";
        ctx.fillText("⭐", starX, starY + 14);
      }
      ctx.restore();
    });

    const centerRadius = radius * 0.6;
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "30px Inter ";
    ctx.fillText(`${remainingSpin.spin_value} spins left`, centerX, centerY);

    const pointerHeight = 42;
    const pointerWidth = 36;
    const pointerY = centerY - 0.8 - 150;
    ctx.beginPath();
    ctx.moveTo(centerX - pointerWidth / 2, pointerY);
    ctx.lineTo(centerX + pointerWidth / 2, pointerY);
    ctx.lineTo(centerX, pointerY - pointerHeight);
    ctx.closePath();
    ctx.fillStyle = "#A49AE3  ";
    ctx.fill();
  }, [rotation, remainingSpin.spin_value, SEGMENTS]);
  const claimReward = async (value: any) => {
    console.log(value);
    const intValue = parseInt(value, 10);
    setWinningValue(intValue);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        reward_value: intValue,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: pointId,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      await fetch(
        "https://ccdtgminiapp-apis.vercel.app/api/lottery_rewards",
        requestOptions
      );
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const updatedPoints =
          currentUsers?.[0]?.user_points == null
            ? intValue * 6000
            : currentUsers?.[0]?.user_points + intValue * 6000;

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
      } catch (error) {
        console.error("Error updating user points:", error);
      }
      await fetchSpinRewards();
      fetchUsers();
      fun();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLottery();
  }, []);

  const updateSpin = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        spin_value: remainingSpin.spin_value - 1,
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
      };

      await fetch(
        `https://ccdtgminiapp-apis.vercel.app/api/spin_counts/${pointId}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
      fetchSpin();
    } catch (error) {}
  };

  const spin = () => {
    if (isSpinning || remainingSpin.spin_value <= 0) return;
    setIsSpinning(true);
    updateSpin();
    const spinCount = 5 + Math.random() * 5; // Number of spins
    const targetRotation = rotation - Math.PI * 2 * spinCount; // Target rotation
    let startTime: number | null = null;
    const duration = spinData?.[0]?.spin_animation_speed * 1000; //

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentRotation =
        rotation + (targetRotation - rotation) * easeOut(progress);

      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        const finalRotation =
          ((targetRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        setRotation(finalRotation);
        setIsSpinning(false);
        const segmentAngle = (Math.PI * 2) / SEGMENTS.length;
        const normalizedRotation = Math.PI * 3.5 - finalRotation;
        const stoppingIndex =
          Math.floor(normalizedRotation / segmentAngle) % SEGMENTS.length;
        const stoppingSegment = SEGMENTS[stoppingIndex];
        if (stoppingSegment.label !== "Loading...") {
          if (stoppingSegment.label.split(" ")[0] === "Jackpot") {
            claimReward(100);
          } else {
            claimReward(stoppingSegment.label.split(" ")[0]);
          }
        }
        setSpineWinner(true);
      }
    };

    requestAnimationFrame(animate);
  };

  if (loading || !lottery) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full items-center gap-4 w-full">
      <canvas
        ref={canvasRef}
        width={650}
        height={650}
        className="w-full h-full rounded-full"
      />
      <div className="flex justify-center min-h-780:w-[90%] w-[70%]">
        <div className="bg-gradient-to-r p-[2px] from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] h-[105px] w-full rounded-[4px]">
          <div className="bg-[#191B1B] w-full h-full py-[10px] flex flex-col justify-between items-center">
            <p className="text-[16px] font-normal w-[230px] leading-[19px] text-center">
              Double your lottery ticket by completing all tasks every week
            </p>
            <p className="text-[12px] font-medium w-[220px] text-center">
              Tap to get 2 x Boost
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <button
          onClick={spin}
          className="text-[#101010] text-[16px] font-bold min-h-780:w-[90%] h-[56px] w-[70%] mt-[10px] rounded-[50px] mb-[100px] bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] flex justify-center items-center"
        >
          {isSpinning ? "Spinning..." : "Spin the Wheel!"}
        </button>
      </div>
    </div>
  );
}
