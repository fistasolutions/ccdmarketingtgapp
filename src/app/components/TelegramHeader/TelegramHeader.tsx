"use client"
import { useEffect } from 'react';

const TelegramHeader = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      const tg = (window as any).Telegram.WebApp;

      // Initialize WebApp
      tg.ready();

      tg.setHeaderColor('bg_color', '#4CAF50'); // Replace '#4CAF50' with your desired color.
      tg.themeParams.secondary_bg_color = '#4CAF50';
      console.log(tg.themeParams);
    }
  }, []);

  return (
    <div>
    </div>
  );
};

export default TelegramHeader;
