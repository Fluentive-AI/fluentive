
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, PhoneOff, MessageSquare, Home, Wrench } from 'lucide-react';
import { AssistantTab } from '@/types';

interface DemoAssistantTabsProps {
  onCallEnd: () => void;
}

const DemoAssistantTabs = ({ onCallEnd }: DemoAssistantTabsProps) => {
  const [activeTab, setActiveTab] = useState('leasing');
  const [phoneState, setPhoneState] = useState<'contact' | 'calling' | 'in-call'>('contact');
  const [callTime, setCallTime] = useState(0);
  const [showClock, setShowClock] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const assistantTabs: AssistantTab[] = [
    {
      id: 'leasing',
      name: 'Jessica',
      title: 'Leasing Assistant',
      description: 'Handles rental inquiries and application questions',
      videoPath: '/phone_calls/leasing/lead.mp4',
      audioPath: '/phone_calls/leasing/lead.m4a'
    },
    {
      id: 'operations',
      name: 'Susan',
      title: 'Property Operations',
      description: 'Assists with rent payments and property management',
      videoPath: '/phone_calls/property_operations/property_operations.mp4',
      audioPath: '/phone_calls/property_operations/property_operations.m4a'
    },
    {
      id: 'maintenance',
      name: 'James',
      title: 'Maintenance Assistant',
      description: 'Processes maintenance requests and scheduling',
      videoPath: '/phone_calls/maintenance/maintenance.mp4',
      audioPath: '/phone_calls/maintenance/maintenance.m4a'
    }
  ];

  const currentAssistant = assistantTabs.find(tab => tab.id === activeTab) || assistantTabs[0];

  // Preload images
  useEffect(() => {
    const imageUrls = [
      '/phone_screens/contact_screen.png',
      '/phone_screens/calling_screen.png',
      '/phone_screens/in_call_screen.png'
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

  // Reset call when tab changes
  useEffect(() => {
    endCallSimulation();
  }, [activeTab]);

  const startCallSimulation = () => {
    setPhoneState('calling');
    
    setTimeout(() => {
      setPhoneState('in-call');
      
      setTimeout(() => {
        setShowClock(true);
        
        timerRef.current = setInterval(() => {
          setCallTime(prev => prev + 1);
        }, 1000);
      }, 100);
      
      if (videoRef.current && window.innerWidth >= 768) {
        videoRef.current.src = currentAssistant.videoPath;
        videoRef.current.load();
        videoRef.current.play().catch(error => {
          console.error("Video play error:", error);
        });
      }
      
      if (audioRef.current && window.innerWidth < 768) {
        audioRef.current.src = currentAssistant.audioPath;
        audioRef.current.load();
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio playback error (likely autoplay restriction):", error);
            // Try to play muted as a fallback
            if (audioRef.current) {
              audioRef.current.muted = true;
              audioRef.current.play().catch(err => {
                console.error("Even muted audio failed to play:", err);
              });
            }
          });
        }
      }
    }, 2000);
  };
  
  const endCallSimulation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setPhoneState('contact');
    setCallTime(0);
    setShowClock(false);
    
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    onCallEnd();
  };
  
  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  const getTabColor = (id: string) => {
    switch (id) {
      case 'leasing':
        return 'bg-brand-500 text-white';
      case 'operations':
        return 'bg-blue-500 text-white';
      case 'maintenance':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };
  
  const renderPhoneScreen = () => {
    const transitionClass = "w-full rounded-lg transition-opacity duration-300 shadow-lg";
    
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
            {showClock && (
              <div 
                className="absolute top-20 sm:top-20 md:top-20 left-1/2 transform -translate-x-1/2 text-white text-base sm:text-xl md:text-lg font-semibold transition-opacity duration-300"
              >
                {formatCallTime(callTime)}
              </div>
            )}
          </div>
        );
      default:
        return <img src="/phone_screens/contact_screen.png" alt="Contact screen" className={transitionClass} />;
    }
  };

  const getTabIcon = (id: string) => {
    switch (id) {
      case 'leasing':
        return <Home className="h-4 w-4 mr-2" />;
      case 'operations':
        return <MessageSquare className="h-4 w-4 mr-2" />;
      case 'maintenance':
        return <Wrench className="h-4 w-4 mr-2" />;
      default:
        return <MessageSquare className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="space-y-8">
      <Tabs 
        defaultValue="leasing" 
        value={activeTab} 
        onValueChange={(value) => {
          setActiveTab(value);
        }}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto mb-8 p-1 bg-muted rounded-xl">
          {assistantTabs.map(tab => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className={`flex items-center justify-center rounded-lg text-sm font-medium transition-all py-3 px-2
                ${activeTab === tab.id ? 'shadow-md' : 'hover:bg-gray-100/80'}`}
            >
              {getTabIcon(tab.id)}
              <span className="hidden sm:inline">{tab.name}</span>
              <span className="sm:hidden">{tab.name.charAt(0)}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {assistantTabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">{tab.name} - {tab.title}</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">{tab.description}</p>
            </div>
            
            <div className="flex justify-center items-center mb-10">
              {phoneState === 'contact' ? (
                <button 
                  onClick={startCallSimulation}
                  className="flex items-center gap-3 group"
                  disabled={!imagesLoaded}
                >
                  <div className={`${imagesLoaded ? 
                    `w-16 h-16 rounded-full ${getTabColor(tab.id)} hover:opacity-90` : 
                    'w-16 h-16 rounded-full bg-gray-400'} 
                    flex items-center justify-center shadow-lg transition-all`}>
                    <Phone className="h-8 w-8 text-white" stroke="white" />
                  </div>
                  <span className="text-xl font-medium text-gray-800">
                    {imagesLoaded ? `Call ${tab.name}` : 'Loading...'}
                  </span>
                </button>
              ) : (
                <button 
                  onClick={endCallSimulation}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg transition-all hover:bg-red-600">
                    <PhoneOff className="h-8 w-8 text-white" stroke="white" />
                  </div>
                  <span className="text-xl font-medium text-gray-800">End Call</span>
                </button>
              )}
            </div>

            <Card className="bg-white shadow-xl border rounded-2xl overflow-hidden max-w-5xl mx-auto">
              <CardContent className="p-6 md:p-10">
                <div className="flex flex-col items-center md:hidden">
                  <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto relative">
                    {renderPhoneScreen()}
                    
                    <button 
                      onClick={phoneState === 'contact' ? startCallSimulation : endCallSimulation}
                      className="absolute inset-0 w-full h-full bg-transparent cursor-pointer"
                      aria-label={phoneState === 'contact' ? `Call ${tab.name}` : "End Call"}
                      disabled={!imagesLoaded && phoneState === 'contact'}
                    />
                    
                    <audio 
                      ref={audioRef}
                      src={tab.audioPath}
                      preload="auto"
                      playsInline
                      muted={false}
                      loop
                    />
                  </div>
                </div>
                
                <div className="hidden md:flex flex-row gap-10 items-center">
                  <div className="md:w-[45%] flex justify-center items-center">
                    <div className="max-w-[280px] mx-auto">
                      {renderPhoneScreen()}
                    </div>
                  </div>
                  
                  <div className="md:w-[55%] flex items-center">
                    <video 
                      ref={videoRef}
                      src={tab.videoPath}
                      className="w-full rounded-lg shadow-md" 
                      preload="auto"
                      controls={false}
                    />
                  </div>
                </div>
                
                <div className="hidden">
                  <img src="/phone_screens/contact_screen.png" alt="Preload" />
                  <img src="/phone_screens/calling_screen.png" alt="Preload" />
                  <img src="/phone_screens/in_call_screen.png" alt="Preload" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DemoAssistantTabs;
