import Image from 'next/image';
import React from 'react';
import image1 from "../../../public/assets/Image/1000 - App Launch Screen.png";

export default function Splashscreen() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        zIndex:"10001",
        backgroundColor:"#101010"
      }}
    >
      <Image
        src={image1}
        alt="Splash Screen"
        style={{
          objectFit: 'contain',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
