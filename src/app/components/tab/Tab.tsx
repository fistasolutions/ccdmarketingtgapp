"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import leaderBoard from "../../../../public/svg/leaderBoard.svg";
import leaderBoardWhite from "../../../../public/svg/Vector(4).svg";
import home from "../../../../public/svg/home.svg";
import homeWhite from "../../../../public/svg/Vector(5).svg";
import friends from "../../../../public/svg/friends.svg";
import friendsWhite from "../../../../public/svg/Vector(3).svg";
import games from "../../../../public/svg/games.svg";
import gamesWhite from "../../../../public/svg/Vector(6).svg";
import setting from "../../../../public/svg/setting.svg";
import settingwhite from "../../../../public/svg/Vector(7)1.svg";
const tabs = [
  {
    name: "Tasks",
    href: "/",
    icon: home,  
    alternateIcon:homeWhite,
    width:22,
    height:22,
    // mt:"7px"  
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: leaderBoard,
    alternateIcon:leaderBoardWhite,
    width:17.7,
    height:22,
    // mt:"7px"
  },
  {
    name: "Games",
    href: "/game",
    icon: games,
    alternateIcon:gamesWhite,
    width:28,
    height:20,
    // mt:"7px"
  },
  {
    name: "Friends",
    href: "/friends",
    icon: friends,
    alternateIcon:friendsWhite,
    width:24,
    height:21,
    // mt:"7px"
  },
  {
    name: "Settings",
    href: "/profile",
    icon: setting,
    alternateIcon:settingwhite,
    width:24,
    height:24,
    // mt:"7px"
  },
];
export function TabNav() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 px-3 right-0 bg-[#101010] ">
      <nav className="flex justify-between h-[92px] items-center">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center justify-between h-[50px]  px-2 ${
                isActive ? "text-white" : "text-[#A9AFB199]"
              }`}
            >
              <Image
                src={isActive?tab.alternateIcon:tab.icon}
                alt={tab.name}
                width={tab.width}
                height={tab.height}
                className={`transition-all ${
                  isActive ? " fill-white" : ""
                }`}
              />
              <span className={`text-xs  ${isActive ? "text-white" : "text-zinc-400"}`}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
