import Image from 'next/image'
import logo from "../../../../public/svg/Vector.svg"
import { Dispatch, SetStateAction } from 'react';
interface QuizModalProps {
  setClaimNow: Dispatch<SetStateAction<boolean>>;
  claimNow: boolean;
}
export default function ClaimReward({setClaimNow,claimNow} :QuizModalProps) {
  return (
    <div className='flex justify-between items-center flex-col h-[90vh]'>
        <div className='w-full items-center flex flex-col mt-[19px]'>

        <Image src={logo} alt="logo" className='w-[64px] h-[64px]' />
        <h1 className="text-[48px]  mt-[26px] w-[273px] font-normal text-center bg-gradient-to-l from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] bg-clip-text leading-[56px] text-transparent">
        Welcome to  Concordium 
    Rewards
      </h1>
    <p className='text-center mt-[26px]'>Claim your bonus and get a <br/> change to win $CCD</p>
        </div>
    
    <button onClick={()=>setClaimNow(!claimNow)} className='text-[#101010] text-[16px]  font-bold w-[90%] h-[56px] rounded-[50px] mb-[40px] bg-gradient-to-r from-[#EDDABF] via-[#A49AE3] to-[#9EF2EB] flex justify-center items-center'>
            Claim  Now
    </button>
    </div>
  )
}
