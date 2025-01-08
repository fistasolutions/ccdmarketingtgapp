'use client'
import Image from 'next/image'
import img from '../../../../public/svg/Union.svg'
interface GradientCardProps {
    onClick: () => void;
  }
  
  export default function GradientCard({ onClick }: GradientCardProps) {
    return (
<>
        <div className="main w-full max-w-md rounded-xl bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 text-gray-800" onClick={onClick}>

      <div className=" p-4 ">
        <h2 className="text-2xl font-bold text-center">
          Wheel of Fortune
        </h2>
        <p className="mt-2 text-[16px] text-center px-10 leading-tight">
          Spin the wheel and get the chance to earn up to 100 points
        </p>
      </div>
        <div className="flex justify-end">

        <Image src={img} width={269} height={269} alt='img'/>
        </div>
      </div>
    
</>

    )
  }