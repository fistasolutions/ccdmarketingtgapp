import Image from 'next/image'
import React from 'react'
import imag1 from "../../../../public/assets/Image/Vector.png"

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection:"column",
      alignItems: 'center',
      height: '100vh',
      backgroundColor:"rgba(16, 16, 16, 1)",
      width:"100vw",
       zIndex:"1001",
        position:"relative"
    }}><Image src={imag1}  alt='splashScreen ' style={{
      width: 200,
      height: 200,
    }}/>
    <h1 style={{
      color: 'rgba(255, 255, 255, 1)',
      fontSize: 16,
      marginTop: 40,
    }}>

    LOADING...
    </h1>
    </div>
  )
}
