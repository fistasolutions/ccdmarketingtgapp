"use client"
import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import ProgressBar from "../../components/progressBar/ProgressBar";
import SecondHero from "../../components/secondHero/secondHero";

export default function Home() {
  const [progress, setProgress] = useState(0)
  const colors = [
    'bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF]', // Default color
    'bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF]', // Default color
    'bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF]', // Default color
    'bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF]', // Default color
    'bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF]', // Default color
    'bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF]', // Default color
    'bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF]', // Default color
    'bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF]', // Default color
    'bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF]', // Alternate color 1
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10))
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])
 
  return (
    <>
    <div>
      <Hero />
      <div className="flex justify-center mt-[24px]"> 

      <div style={{
        backgroundColor:"rgba(25, 27, 27, 1)"
      }} className="h-[176px]  py-12 px-4 w-[90%]  rounded-[4px] sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <ProgressBar progress={progress} />
          <div>
          <div className="flex flex-wrap justify-center items-center gap-2">
      {Array.from({ length: 13 }).map((_, index) => (
        <div key={index} className="relative w-4 h-4">
          <div
            className={`absolute inset-0 border  rotate-180  ${
              colors[index % colors.length] // Cycle through the colors
            }`}
            style={{
              border:"1px solid white",
              clipPath: 'polygon(50% 0%, 100% 38%, 100% 100%, 0% 100%, 0% 38%)',
            }}
          ></div>
        </div>
      ))}
    </div>
    <p className="text-[16px] font-normal text-center mt-[43px] text-white">
    Tap to see your profile
    </p>
          </div>
        </div>
      </div>
    </div>
    </div>
    <SecondHero />

    </div>
    </>

  );
}
