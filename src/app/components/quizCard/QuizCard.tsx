'use client'
interface QuizCardProps {
  onClick: () => void
  title:string
}
export default function QuizCard({ onClick,title }: QuizCardProps) {
  return (
    <div
      onClick={onClick}
       className="relative overflow-hidden w-full max-w-md p-6 rounded-xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {title}
          </h2>
          <p className="text-[16px] text-gray-700 text-center px-10 leading-tight">
            Test your knowledge of Concordium and earn points
          </p>
        </div>
        <div className="relative h-32 mt-2">
          <button className="absolute left-2 top-0 w-[49px] h-[49px] rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl font-medium">
            A
          </button>
          <button className="absolute left-20 top-24  bottom-0 w-[78px] h-[78px] rounded-full bg-gray-900 text-white flex items-center justify-center text-4xl font-medium">
            B
          </button>
          <button className="absolute right-1 bottom-8 w-[84px] h-[84px] rounded-full bg-gray-900 text-white flex items-center justify-center text-6xl font-medium">
            C
          </button>
        </div>
      </div>
    )
  }
  
  