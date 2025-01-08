"use client"

import Image from 'next/image'
import { useEffect, useState } from "react"
import cross from '../../../../public/svg/cross.svg'
import wrong from '../../../../public/svg/Wrong.svg'

interface Option {
  id: string
  text: string
}

const options: Option[] = [
  { id: "A", text: "Proof of Work" },
  { id: "B", text: "Full anonymity" },
  { id: "C", text: "Identity layer" },
  { id: "D", text: "Crypto-only focus" },
]

const TIMER_DURATION = 12

export function FalseModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION)
  const [activeOption, setActiveOption] = useState<string | null>(null)  
console.log(timeLeft)
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isOpen) {
      setTimeLeft(TIMER_DURATION)
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-transparent mb-20 mt-5 backdrop-blur-sm z-50 flex items-center justify-center p-2">
      <div className="bg-[#191B1B] flex flex-col justify-between h-full border border-1 border-white w-full max-w-md rounded-xl p-6 relative">
        <div>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <Image src={cross} width={24} height={24} alt='cross'/>
          </button>

          <div className="text-gray-400 text-center mb-4">3 / 10</div>

          <h2 className="text-white text-[24px] text-center mb-8 px-4">
            What sets Concordium apart?
          </h2>

          <div className="mx-auto rounded-full flex items-center justify-center">
            <div className="rounded-full overflow-hidden">
              <Image src={wrong} width={56} height={56} alt="profile" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveOption(option.id)}  
              className={`w-full p-4 rounded-xl text-left flex items-center space-x-3 transition-colors
                ${activeOption === option.id 
                  ? "bg-gradient-to-r from-purple-300 to-indigo-400 text-black"
                  : "hover:bg-white/5 bg-transparent border border-[rgba(255,255,255,0.1)] text-white"
                }`}
            >
              <span className="text-lg font-medium">{option.id}</span>
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
