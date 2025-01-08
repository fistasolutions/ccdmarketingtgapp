import React from 'react'

interface ProgressBarProps {
  progress: number
  color?: string
  height?: string
  showLabel?: boolean
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'bg-gradient-to-r from-[#9EF2EB] via-[#A49AE3] to-[#EDDABF]',
  height = 'h-4',
  className = '',
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 10)

  return (
    <div className={`w-full ${className} relative `}>
      <div className={`w-full ${height} bg-[#1E1E1E] border rounded-[2px] overflow-hidden`}>
        <div
          className={`${height} ${color} transition-all  duration-300 ease-in-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className='h-4 w-[1px] absolute top-0 right-[10%] bg-white' />
      <div className='h-4 w-[1px] absolute top-0 right-[50%] bg-white' />
      <div className='h-4 w-[1px] absolute top-0 right-[80%] bg-white' />
    </div>
  )
}

export default ProgressBar

