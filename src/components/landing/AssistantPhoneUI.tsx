import React, { useState, useEffect } from 'react';

interface AssistantPhoneUIProps {
  phoneState: 'contact' | 'calling' | 'in-call';
  callTime: number;
  onStartCall: () => void;
  onEndCall: () => void;
  isIncomingCall?: boolean;
}

const AssistantPhoneUI = ({ 
  phoneState, 
  callTime, 
  onStartCall, 
  onEndCall,
  isIncomingCall = false
}: AssistantPhoneUIProps) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imageUrls = [
      '/phone_screens/contact_screen.png',
      '/phone_screens/calling_screen.png',
      '/phone_screens/in_call_screen.png',
      '/phone_screens/accept_call.png',
      '/phone_screens/decline_call.png',
      '/phone_screens/incoming_call.png'
    ];
    
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const renderPhoneScreen = () => {
    const transitionClass = "w-full rounded-lg transition-opacity duration-300";
    
    if (isIncomingCall && phoneState === 'contact') {
      return <img src="/phone_screens/incoming_call.png" alt="Incoming call screen" className={transitionClass} />;
    }
    
    switch (phoneState) {
      case 'contact':
        return <img src="/phone_screens/contact_screen.png" alt="Contact screen" className={transitionClass} />;
      case 'calling':
        return <img src="/phone_screens/calling_screen.png" alt="Calling screen" className={transitionClass} />;
      case 'in-call':
        return (
          <div className="relative">
            <img 
              src="/phone_screens/in_call_screen.png" 
              alt="In-call screen" 
              className={transitionClass} 
            />
            <div 
              className="absolute top-20 sm:top-20 md:top-20 lg:top-20 left-1/2 transform -translate-x-1/2 text-white text-base sm:text-xl md:text-lg font-semibold transition-opacity duration-300"
            >
              {formatCallTime(callTime)}
            </div>
          </div>
        );
      default:
        return <img src="/phone_screens/contact_screen.png" alt="Contact screen" className={transitionClass} />;
    }
  };

  // Render call control buttons
  const renderCallControls = () => {
    if (phoneState === 'contact') {
      return (
        <button 
          onClick={onStartCall}
          className="flex items-center gap-3 group"
          disabled={!imagesLoaded}
        >
          <img 
            src="/phone_screens/accept_call.png" 
            alt="Call" 
            className="w-16 h-16 hover:opacity-90 transition-all"
          />
          <span className="text-xl font-medium text-gray-800">
            {imagesLoaded ? "Call" : 'Loading...'}
          </span>
        </button>
      );
    } else {
      return (
        <button 
          onClick={onEndCall}
          className="flex items-center gap-3 group"
        >
          <img 
            src="/phone_screens/decline_call.png" 
            alt="End Call" 
            className="w-16 h-16 hover:opacity-90 transition-all"
          />
          <span className="text-xl font-medium text-gray-800">End Call</span>
        </button>
      );
    }
  };

  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[260px] lg:max-w-[280px] mx-auto relative transform md:scale-95 lg:scale-90 transition-transform">
      {renderPhoneScreen()}
      
      <button 
        onClick={phoneState === 'contact' ? onStartCall : onEndCall}
        className="absolute inset-0 w-full h-full bg-transparent cursor-pointer"
        aria-label={phoneState === 'contact' ? "Start Call" : "End Call"}
        disabled={!imagesLoaded && phoneState === 'contact'}
      />
      
      <div className="hidden">
        <img src="/phone_screens/contact_screen.png" alt="Preload" />
        <img src="/phone_screens/calling_screen.png" alt="Preload" />
        <img src="/phone_screens/in_call_screen.png" alt="Preload" />
        <img src="/phone_screens/incoming_call.png" alt="Preload" />
      </div>
    </div>
  );
};

export default AssistantPhoneUI;
