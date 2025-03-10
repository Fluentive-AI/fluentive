
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Building, Phone, Video, Mail, DollarSign, Users, Info, Mic, MicOff, Volume, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Screen = 'contact' | 'calling' | 'inCall';

const PhoneInterface = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('contact');
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
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
  
  const handleEndCall = () => {
    setCurrentScreen('contact');
    setCallTime(0);
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };
  
  // Status Bar
  const StatusBar = ({ darkBackground = false }) => (
    <div className="flex justify-between items-center px-5 py-2">
      <div className={`text-sm font-medium ${darkBackground ? 'text-white' : 'text-black'}`}>9:41</div>
      <div className="w-16 h-6 bg-black rounded-xl"></div>
      <div className="flex items-center gap-1">
        <div className="flex items-end h-3 space-x-0.5">
          <div className={`w-0.5 h-1.5 ${darkBackground ? 'bg-white' : 'bg-black'}`}></div>
          <div className={`w-0.5 h-2 ${darkBackground ? 'bg-white' : 'bg-black'}`}></div>
          <div className={`w-0.5 h-2.5 ${darkBackground ? 'bg-white' : 'bg-black'}`}></div>
          <div className={`w-0.5 h-3 ${darkBackground ? 'bg-white' : 'bg-black'}`}></div>
        </div>
        <div className="ml-1">
          <div className={`w-3.5 h-3.5 border ${darkBackground ? 'border-white' : 'border-black'} rounded-full flex items-center justify-center`}>
            <div className={`w-2 h-2 ${darkBackground ? 'bg-white' : 'bg-black'} rounded-full`}></div>
          </div>
        </div>
        <div className="ml-1">
          <div className={`w-6 h-3 border ${darkBackground ? 'border-white' : 'border-black'} rounded-sm flex items-center`}>
            <div className={`w-4 h-1.5 ${darkBackground ? 'bg-white' : 'bg-black'} rounded-sm ml-0.5`}></div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Contact Screen
  const ContactScreen = () => (
    <div className="flex flex-col h-full bg-gray-50">
      <StatusBar />
      
      <div className="flex items-center px-4 py-2">
        <ChevronLeft className="h-5 w-5 text-blue-500" />
        <span className="text-blue-500 ml-1">Search</span>
      </div>
      
      <div className="flex flex-col items-center mt-2">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
          <Building className="h-10 w-10 text-blue-800" />
        </div>
        <h2 className="text-xl font-semibold mt-2">Property AI</h2>
      </div>
      
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex flex-col items-center">
          <button className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            <div className="text-blue-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="currentColor"/>
                <path d="M5 9C5 10.1046 4.10457 11 3 11C1.89543 11 1 10.1046 1 9C1 7.89543 1.89543 7 3 7C4.10457 7 5 7.89543 5 9Z" fill="currentColor"/>
                <path d="M23 9C23 10.1046 22.1046 11 21 11C19.8954 11 19 10.1046 19 9C19 7.89543 19.8954 7 21 7C22.1046 7 23 7.89543 23 9Z" fill="currentColor"/>
                <path d="M14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20C10 18.8954 10.8954 18 12 18C13.1046 18 14 18.8954 14 20Z" fill="currentColor"/>
                <path d="M5 20C5 21.1046 4.10457 22 3 22C1.89543 22 1 21.1046 1 20C1 18.8954 1.89543 18 3 18C4.10457 18 5 18.8954 5 20Z" fill="currentColor"/>
                <path d="M23 20C23 21.1046 22.1046 22 21 22C19.8954 22 19 21.1046 19 20C19 18.8954 19.8954 18 21 18C22.1046 18 23 18.8954 23 20Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="currentColor"/>
              </svg>
            </div>
          </button>
          <span className="text-xs mt-1 text-blue-600">message</span>
        </div>
        
        <div className="flex flex-col items-center">
          <button 
            className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm"
            onClick={handleCall}
          >
            <div className="text-blue-500">
              <Phone className="h-6 w-6" />
            </div>
          </button>
          <span className="text-xs mt-1 text-blue-600">call</span>
        </div>
        
        <div className="flex flex-col items-center">
          <button className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            <div className="text-blue-500">
              <Video className="h-6 w-6" />
            </div>
          </button>
          <span className="text-xs mt-1 text-blue-600">facetime</span>
        </div>
        
        <div className="flex flex-col items-center">
          <button className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            <div className="text-blue-500">
              <Mail className="h-6 w-6" />
            </div>
          </button>
          <span className="text-xs mt-1 text-blue-600">mail</span>
        </div>
        
        <div className="flex flex-col items-center">
          <button className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            <div className="text-blue-500">
              <DollarSign className="h-6 w-6" />
            </div>
          </button>
          <span className="text-xs mt-1 text-blue-600">pay</span>
        </div>
      </div>
      
      <div className="flex-1 mt-4 px-3 space-y-1">
        <div className="bg-white p-4 rounded-md shadow-sm">
          <div className="text-xs text-gray-500">mobile</div>
          <div className="text-blue-500">(646) 250-3816</div>
        </div>
        
        <div className="bg-white p-4 rounded-md shadow-sm">
          <div className="text-xs text-gray-500">email</div>
          <div className="text-blue-500">rozenblum.eytan@gmail.com</div>
        </div>
        
        <div className="bg-white p-4 rounded-md shadow-sm flex justify-between">
          <div>
            <div className="text-xs text-gray-500">other</div>
            <div>1 East Loop Road,</div>
            <div>New York, NY</div>
            <div>10044</div>
          </div>
          <div className="w-20 h-20 bg-green-100 rounded-md flex items-center justify-center">
            <img src="/lovable-uploads/75567474-1885-44eb-a0d2-6a52e47bfd89.png" alt="Map" className="w-full h-full object-cover rounded-md" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-md shadow-sm">
          <div className="text-blue-500">Send Message</div>
        </div>
        
        <div className="bg-white p-4 rounded-md shadow-sm">
          <div className="text-blue-500">Share Contact</div>
        </div>
        
        <div className="bg-white p-4 rounded-md shadow-sm">
          <div className="text-blue-500">Add to Favorites</div>
        </div>
        
        <div className="bg-white p-4 rounded-md shadow-sm">
          <div className="text-xs text-gray-500">Notes</div>
        </div>
      </div>
      
      <div className="h-16 bg-white border-t border-gray-200 flex justify-around items-center mt-2">
        <div className="flex flex-col items-center">
          <div className="text-gray-400">★</div>
          <span className="text-xs text-gray-400">Favorites</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-gray-400">
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H9v5.5l4.9 2.9.7-1.1-4.1-2.4V5z" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-xs text-gray-400">Recents</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-blue-500">
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 10.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm0-6a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM10 11c-4.4 0-8 3.6-8 8h1c0-3.9 3.1-7 7-7s7 3.1 7 7h1c0-4.4-3.6-8-8-8z" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-xs text-blue-500">Contacts</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-gray-400">
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 11H3V9h14v2zm0-5H3v2h14V6zm0 10H3v-2h14v2z" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-xs text-gray-400">Keypad</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-gray-400">
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-4-7h2v2H6v-2zm3 0h2v2H9v-2zm3 0h2v2h-2v-2z" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-xs text-gray-400">Voicemail</span>
        </div>
      </div>
    </div>
  );
  
  // Calling Screen
  const CallingScreen = () => (
    <div className="flex flex-col h-full bg-gray-700">
      <StatusBar darkBackground={true} />
      
      <div className="absolute top-5 right-5">
        <div className="w-8 h-8 bg-gray-500/50 rounded-full flex items-center justify-center">
          <Info className="h-5 w-5 text-white" />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-white text-2xl">Calling...</div>
        <div className="text-white text-3xl font-semibold mt-2">+1 (646) 250-3816</div>
      </div>
      
      <div className="mb-24 flex flex-col">
        <div className="flex justify-center space-x-8 mb-10">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gray-500/50 flex items-center justify-center">
              <Volume className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm text-white mt-2">Speaker</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gray-500/50 flex items-center justify-center">
              <Video className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm text-white mt-2">FaceTime</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gray-500/50 flex items-center justify-center">
              <Mic className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm text-white mt-2">Mute</span>
          </div>
        </div>
        
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gray-500/50 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm text-white mt-2">Add</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center"
              onClick={handleEndCall}
            >
              <Phone className="h-8 w-8 text-white transform rotate-135" />
            </button>
            <span className="text-sm text-white mt-2">End</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gray-500/50 flex items-center justify-center">
              <Grid className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm text-white mt-2">Keypad</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  // In Call Screen
  const InCallScreen = () => (
    <div className="flex flex-col h-full bg-gray-700">
      <StatusBar darkBackground={true} />
      
      <div className="absolute top-5 right-5">
        <div className="w-8 h-8 bg-gray-500/50 rounded-full flex items-center justify-center">
          <Info className="h-5 w-5 text-white" />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-white text-2xl">{formatTime(callTime)}</div>
        <div className="text-white text-3xl font-semibold mt-2">+1 (646) 250-3816</div>
      </div>
      
      <div className="mb-24 flex flex-col">
        <div className="flex justify-center space-x-8 mb-10">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gray-500/50 flex items-center justify-center">
              <Volume className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm text-white mt-2">Speaker</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gray-500/50 flex items-center justify-center">
              <Video className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm text-white mt-2">FaceTime</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div 
              className="h-16 w-16 rounded-full bg-gray-500/50 flex items-center justify-center"
              onClick={handleMuteToggle}
            >
              {isMuted ? <MicOff className="h-8 w-8 text-white" /> : <Mic className="h-8 w-8 text-white" />}
            </div>
            <span className="text-sm text-white mt-2">Mute</span>
          </div>
        </div>
        
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gray-500/50 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm text-white mt-2">Add</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center"
              onClick={handleEndCall}
            >
              <Phone className="h-8 w-8 text-white transform rotate-135" />
            </button>
            <span className="text-sm text-white mt-2">End</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gray-500/50 flex items-center justify-center">
              <Grid className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm text-white mt-2">Keypad</span>
          </div>
        </div>
      </div>
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
