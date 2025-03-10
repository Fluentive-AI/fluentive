
import React, { useState } from 'react';
import { ChevronLeft, Building, Phone, Video, Mail, DollarSign, MapPin, MessageSquare, Plus, X, Mic, MicOff, Users } from 'lucide-react';
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
  
  React.useEffect(() => {
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
  const StatusBar = () => (
    <div className="flex justify-between items-center px-5 py-2">
      <div className="text-sm font-medium">9:41</div>
      <div className="w-16 h-6 bg-black rounded-xl"></div>
      <div className="flex items-center gap-1">
        <div className="flex items-end h-3 space-x-0.5">
          <div className="w-0.5 h-1.5 bg-black"></div>
          <div className="w-0.5 h-2 bg-black"></div>
          <div className="w-0.5 h-2.5 bg-black"></div>
          <div className="w-0.5 h-3 bg-black"></div>
        </div>
        <div className="ml-1">
          <div className="w-3.5 h-3.5 border border-black rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>
        <div className="ml-1">
          <div className="w-6 h-3 border border-black rounded-sm flex items-center">
            <div className="w-4 h-1.5 bg-black rounded-sm ml-0.5"></div>
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
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            onClick={() => setCurrentScreen('calling')}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
          <span className="text-xs mt-1 text-blue-600">message</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            onClick={handleCall}
          >
            <Phone className="h-6 w-6" />
          </Button>
          <span className="text-xs mt-1 text-blue-600">call</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <Video className="h-6 w-6" />
          </Button>
          <span className="text-xs mt-1 text-blue-600">facetime</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <Mail className="h-6 w-6" />
          </Button>
          <span className="text-xs mt-1 text-blue-600">mail</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <DollarSign className="h-6 w-6" />
          </Button>
          <span className="text-xs mt-1 text-blue-600">pay</span>
        </div>
      </div>
      
      <div className="flex-1 mt-4">
        <div className="bg-white p-4 border-t border-b border-gray-200">
          <div className="text-xs text-gray-500">mobile</div>
          <div className="text-blue-500">(646) 250-3816</div>
        </div>
        
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="text-xs text-gray-500">email</div>
          <div className="text-blue-500">rozenblum.eytan@gmail.com</div>
        </div>
        
        <div className="bg-white p-4 border-b border-gray-200 flex justify-between">
          <div>
            <div className="text-xs text-gray-500">other</div>
            <div>1 East Loop Road,</div>
            <div>New York, NY</div>
            <div>10044</div>
          </div>
          <div className="w-20 h-20 bg-green-100 rounded-md flex items-center justify-center">
            <MapPin className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="text-blue-500">Send Message</div>
        </div>
        
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="text-blue-500">Share Contact</div>
        </div>
        
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="text-blue-500">Add to Favorites</div>
        </div>
        
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="text-xs text-gray-500">Notes</div>
        </div>
      </div>
      
      <div className="h-16 bg-white border-t border-gray-200 flex justify-around items-center">
        <div className="flex flex-col items-center">
          <div className="text-gray-400">★</div>
          <span className="text-xs text-gray-400">Favorites</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-gray-400">⏱</div>
          <span className="text-xs text-gray-400">Recents</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-blue-500">👤</div>
          <span className="text-xs text-blue-500">Contacts</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-gray-400">⌨</div>
          <span className="text-xs text-gray-400">Keypad</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-gray-400">💬</div>
          <span className="text-xs text-gray-400">Voicemail</span>
        </div>
      </div>
    </div>
  );
  
  // Calling Screen
  const CallingScreen = () => (
    <div className="flex flex-col h-full bg-gray-700">
      <StatusBar />
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-white text-xl">Calling...</div>
        <div className="text-white text-3xl font-semibold mt-2">+1 (646) 250-3816</div>
      </div>
      
      <div className="mb-16 flex flex-col">
        <div className="flex justify-around mb-8">
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-16 w-16 rounded-full bg-gray-600/50 text-white hover:bg-gray-600"
            >
              <Volume2 className="h-8 w-8" />
            </Button>
            <span className="text-xs text-white mt-1">Speaker</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-16 w-16 rounded-full bg-gray-600/50 text-white hover:bg-gray-600"
            >
              <Video className="h-8 w-8" />
            </Button>
            <span className="text-xs text-white mt-1">FaceTime</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-16 w-16 rounded-full bg-gray-600/50 text-white hover:bg-gray-600"
            >
              <Mic className="h-8 w-8" />
            </Button>
            <span className="text-xs text-white mt-1">Mute</span>
          </div>
        </div>
        
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-16 w-16 rounded-full bg-gray-600/50 text-white hover:bg-gray-600"
            >
              <Users className="h-8 w-8" />
            </Button>
            <span className="text-xs text-white mt-1">Add</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-16 w-16 rounded-full bg-red-500 text-white hover:bg-red-600"
              onClick={handleEndCall}
            >
              <Phone className="h-8 w-8 transform rotate-135" />
            </Button>
            <span className="text-xs text-white mt-1">End</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-16 w-16 rounded-full bg-gray-600/50 text-white hover:bg-gray-600"
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-1">
                {Array(9).fill(0).map((_, i) => (
                  <div key={i} className="h-1 w-1 bg-white rounded-full"></div>
                ))}
              </div>
            </Button>
            <span className="text-xs text-white mt-1">Keypad</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  // In Call Screen
  const InCallScreen = () => (
    <div className="flex flex-col h-full bg-gray-700">
      <StatusBar />
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-white text-xl">{formatTime(callTime)}</div>
        <div className="text-white text-3xl font-semibold mt-2">+1 (646) 321-9102</div>
      </div>
      
      <div className="mb-16 flex flex-col">
        <div className="flex justify-around mb-8">
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-16 w-16 rounded-full bg-gray-600/50 text-white hover:bg-gray-600"
            >
              <Volume2 className="h-8 w-8" />
            </Button>
            <span className="text-xs text-white mt-1">Speaker</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-16 w-16 rounded-full bg-gray-600/50 text-white hover:bg-gray-600"
            >
              <Video className="h-8 w-8" />
            </Button>
            <span className="text-xs text-white mt-1">FaceTime</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="ghost"
              className={`h-16 w-16 rounded-full ${isMuted ? 'bg-gray-400 text-gray-800' : 'bg-gray-600/50 text-white'} hover:bg-gray-600`}
              onClick={handleMuteToggle}
            >
              {isMuted ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
            </Button>
            <span className="text-xs text-white mt-1">Mute</span>
          </div>
        </div>
        
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-16 w-16 rounded-full bg-gray-600/50 text-white hover:bg-gray-600"
            >
              <Users className="h-8 w-8" />
            </Button>
            <span className="text-xs text-white mt-1">Add</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-16 w-16 rounded-full bg-red-500 text-white hover:bg-red-600"
              onClick={handleEndCall}
            >
              <Phone className="h-8 w-8 transform rotate-135" />
            </Button>
            <span className="text-xs text-white mt-1">End</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-16 w-16 rounded-full bg-gray-600/50 text-white hover:bg-gray-600"
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-1">
                {Array(9).fill(0).map((_, i) => (
                  <div key={i} className="h-1 w-1 bg-white rounded-full"></div>
                ))}
              </div>
            </Button>
            <span className="text-xs text-white mt-1">Keypad</span>
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
