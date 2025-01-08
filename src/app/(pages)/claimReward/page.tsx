import Image from 'next/image'
import React from 'react'
import logo from "../../../../public/svg/Vector.svg"
import Link from 'next/link'
export default function ClaimReward() {
  return (
    <div className='flex justify-between items-center flex-col h-[90vh]'>
        <div className='w-full items-center flex flex-col mt-[19px]'>

        <Image src={logo} alt="logo" className='w-[64px] h-[64px]' />
        <h1 className="text-[48px] mt-[26px] font-normal text-center bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] bg-clip-text leading-[56px] text-transparent">
        Welcome to  Concordium 
    Rewards
      </h1>
    <p className='text-center mt-[26px]'>Claim your bonus and get a <br/> change to win $CCD</p>
        </div>
    
    <Link href={"/home"} className='text-[#101010] text-[16px] font-bold w-[90%] h-[56px] rounded-[50px] mb-[24px] bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF] flex justify-center items-center'>
    <button  className="" >
            Claim  Now
        </button>
    </Link>
    </div>
  )
}
