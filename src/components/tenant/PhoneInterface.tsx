
import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

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
  
  // Contact Screen
  const ContactScreen = () => (
    <div className="relative h-full">
      <img 
        src="/lovable-uploads/75567474-1885-44eb-a0d2-6a52e47bfd89.png" 
        alt="Contact Screen" 
        className="w-full h-full object-cover"
      />
      <button 
        className="absolute bottom-32 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
        onClick={handleCall}
      >
        <Phone className="h-6 w-6 text-white" />
      </button>
    </div>
  );
  
  // Calling Screen
  const CallingScreen = () => (
    <div className="relative h-full bg-black flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <div className="text-2xl mb-2">Calling...</div>
        <div className="text-3xl font-semibold mb-8">Property AI</div>
      </div>
      <button 
        className="absolute bottom-32 w-16 h-16 rounded-full bg-red-500 flex items-center justify-center"
      >
        <Phone className="h-8 w-8 text-white transform rotate-135" />
      </button>
    </div>
  );
  
  // In Call Screen
  const InCallScreen = () => (
    <div className="relative h-full bg-black flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <div className="text-2xl mb-2">{formatTime(callTime)}</div>
        <div className="text-3xl font-semibold mb-8">Property AI</div>
      </div>
      <button 
        className="absolute bottom-32 w-16 h-16 rounded-full bg-red-500 flex items-center justify-center"
        onClick={() => setCurrentScreen('contact')}
      >
        <Phone className="h-8 w-8 text-white transform rotate-135" />
      </button>
    </div>
  );
  
  return (
    <div className="h-full w-full overflow-hidden">
      {currentScreen === 'contact' && <ContactScreen />}
      {currentScreen === 'calling' && <CallingScreen />}
      {currentScreen === 'inCall' && <InCallScreen />}
    </div>
  );
};

export default PhoneInterface;
