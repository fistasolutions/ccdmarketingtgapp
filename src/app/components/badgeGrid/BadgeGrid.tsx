import { useData } from "@/context/ContextData";

export default function BadgeGrid() {
  const weeks = Array.from({ length: 13 }, (_, i) => i + 1);

  const activeWeeks = [0];
  

  return (
    <div className="bg-[#101010] mt-10 mb-16">
      <p className="text-white text-base">for the final draw</p>
      <p className="text-[#A9AFB199] text-[12px] mb-8">
        Earn <span className="text-[#A9AFB199] font-semibold ">8 badges</span>{" "}
        to qualify for the final draw and win a share of the 7,200,000 $CCD
        prize pool!
      </p>

      <div className="grid grid-cols-3 gap-4">
        {weeks.map((week) => (
          <div key={week} className="relative w-[95px] h-[95px] mx-auto">
            <div
              className={`
                absolute inset-0
                ${
                  activeWeeks.includes(week)
                    ? "bg-gradient-to-r from-blue-400 to-purple-400"
                    : "bg-gray-700"
                }
                clip-path-pentagon
              `}
            >
              <div className="absolute inset-[2px] bg-[#191B1B] clip-path-pentagon">
                <div
                  className={`
                    absolute inset-[4px]
                    ${
                      activeWeeks.includes(week)
                        ? "bg-gradient-to-r from-blue-400/30 to-purple-400/30"
                        : "bg-gray-600"
                    }
                    clip-path-pentagon
                  `}
                >
                  <div className="absolute inset-[1px] bg-[#191B1B] clip-path-pentagon flex flex-col items-center justify-center">
                    <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">
                      Week
                    </span>
                    <span
                      className={`text-[24px] font-semibold ${
                        activeWeeks.includes(week)
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      {week}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .clip-path-pentagon {
          clip-path: polygon(50% 90%, 100% 70%, 100% 0%, 0% 0%, 0% 70%);
        }
      `}</style>
    </div>
  );
}
