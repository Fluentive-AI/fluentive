
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

  useEffect(() => {
    endCallSimulation();
  }, [activeTab]);

  const startCallSimulation = () => {
    if (activeTab === 'operations') {
      setPhoneState('in-call');
      setShowClock(true);
      
      timerRef.current = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
      
      // Preload the video
      if (videoRef.current) {
        videoRef.current.src = currentAssistant.videoPath;
        videoRef.current.load();
        
        // Use a timeout to ensure the video has time to load
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play().catch(error => {
              console.error("Video play error:", error);
            });
          }
        }, 500);
      }
      
      if (audioRef.current && window.innerWidth < 768) {
        audioRef.current.src = currentAssistant.audioPath;
        audioRef.current.load();
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio playback error (likely autoplay restriction):", error);
            if (audioRef.current) {
              audioRef.current.muted = true;
              audioRef.current.play().catch(err => {
                console.error("Even muted audio failed to play:", err);
              });
            }
          });
        }
      }
    } else {
      setPhoneState('calling');
      
      setTimeout(() => {
        setPhoneState('in-call');
        
        setTimeout(() => {
          setShowClock(true);
          
          timerRef.current = setInterval(() => {
            setCallTime(prev => prev + 1);
          }, 1000);
        }, 100);
        
        // Preload the video
        if (videoRef.current) {
          videoRef.current.src = currentAssistant.videoPath;
          videoRef.current.load();
          
          // Use a timeout to ensure the video has time to load
          setTimeout(() => {
            if (videoRef.current) {
              const playPromise = videoRef.current.play();
              
              if (playPromise !== undefined) {
                playPromise.catch(error => {
                  console.error("Video play error:", error);
                  // Fallback: try playing again with a delay
                  setTimeout(() => {
                    if (videoRef.current) {
                      videoRef.current.play().catch(err => {
                        console.error("Second attempt video play error:", err);
                      });
                    }
                  }, 1000);
                });
              }
            }
          }, 500);
        }
        
        if (audioRef.current && window.innerWidth < 768) {
          audioRef.current.src = currentAssistant.audioPath;
          audioRef.current.load();
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Audio playback error (likely autoplay restriction):", error);
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
    }
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
  
  const getTabLabel = (id: string) => {
    switch (id) {
      case 'leasing':
        return 'AI Leasing Assistant';
      case 'operations':
        return 'AI Property Operations Assistant';
      case 'maintenance':
        return 'AI Maintenance Assistant';
      default:
        return id;
    }
  };
  
  const renderPhoneScreen = () => {
    const transitionClass = "w-full rounded-lg transition-opacity duration-300";
    
    if (activeTab === 'operations' && phoneState === 'contact') {
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

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-4 mb-8 w-full max-w-4xl mx-auto">
        {assistantTabs.map(tab => (
          <Button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-6 rounded-lg transition-all flex-grow sm:flex-grow-0 w-full sm:w-auto md:min-w-[220px] ${
              activeTab === tab.id 
                ? 'bg-blue-500 text-white hover:opacity-90'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
            variant="ghost"
          >
            <span className="font-medium text-base sm:text-lg">{getTabLabel(tab.id)}</span>
          </Button>
        ))}
      </div>

      <div className="transition-all">
        {assistantTabs.map(tab => (
          <div key={tab.id} className={`${activeTab === tab.id ? 'block' : 'hidden'}`}>
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
                  <img 
                    src="/phone_screens/accept_call.png" 
                    alt="Call" 
                    className="w-16 h-16 hover:opacity-90 transition-all"
                  />
                  <span className="text-xl font-medium text-gray-800">
                    {imagesLoaded ? `Call ${tab.name}` : 'Loading...'}
                  </span>
                </button>
              ) : (
                <button 
                  onClick={endCallSimulation}
                  className="flex items-center gap-3 group"
                >
                  <img 
                    src="/phone_screens/decline_call.png" 
                    alt="End Call" 
                    className="w-16 h-16 hover:opacity-90 transition-all"
                  />
                  <span className="text-xl font-medium text-gray-800">End Call</span>
                </button>
              )}
            </div>

            <Card className="bg-white border-0 rounded-2xl overflow-hidden max-w-5xl mx-auto shadow-md">
              <CardContent className="p-6 md:p-8">
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
                
                <div className="hidden md:flex flex-row gap-6 items-center bg-white">
                  <div className="md:w-[40%] flex justify-center items-center">
                    <div className="max-w-[280px] mx-auto">
                      {renderPhoneScreen()}
                    </div>
                  </div>
                  
                  <div className="md:w-[60%] flex items-center">
                    <video 
                      ref={videoRef}
                      className="w-full rounded-lg" 
                      preload="auto"
                      controls={false}
                      muted={false}
                      loop
                      playsInline
                    />
                  </div>
                </div>
                
                <div className="hidden">
                  <img src="/phone_screens/contact_screen.png" alt="Preload" />
                  <img src="/phone_screens/calling_screen.png" alt="Preload" />
                  <img src="/phone_screens/in_call_screen.png" alt="Preload" />
                  <img src="/phone_screens/incoming_call.png" alt="Preload" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoAssistantTabs;
