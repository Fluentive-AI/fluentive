
import React, { useState, useEffect } from 'react';

type Screen = 'contact' | 'calling' | 'inCall';

const PhoneInterface = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('contact');
  const [callTime, setCallTime] = useState(0);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (currentScreen === 'inCall') {
      interval = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [currentScreen]);
  
  const handleCall = () => {
    setCurrentScreen('calling');
    // Simulate call being picked up after 2 seconds
    setTimeout(() => {
      setCallTime(0);
      setCurrentScreen('inCall');
    }, 2000);
  };
  
  // Simply display the image based on the current screen state
  if (currentScreen === 'contact') {
    return (
      <img 
        src="/lovable-uploads/75567474-1885-44eb-a0d2-6a52e47bfd89.png" 
        alt="Contact Screen" 
        className="w-full h-full object-cover cursor-pointer"
        onClick={handleCall}
      />
    );
  }
  
  if (currentScreen === 'calling') {
    return (
      <img 
        src="/lovable-uploads/75567474-1885-44eb-a0d2-6a52e47bfd89.png" 
        alt="Calling Screen" 
        className="w-full h-full object-cover"
      />
    );
  }
  
  // In call screen with timer
  return (
    <div className="relative w-full h-full">
      <img 
        src="/lovable-uploads/75567474-1885-44eb-a0d2-6a52e47bfd89.png" 
        alt="In Call Screen" 
        className="w-full h-full object-cover cursor-pointer"
        onClick={() => setCurrentScreen('contact')}
      />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-white text-xl font-semibold">
        {formatTime(callTime)}
      </div>
    </div>
  );
};

export default PhoneInterface;
