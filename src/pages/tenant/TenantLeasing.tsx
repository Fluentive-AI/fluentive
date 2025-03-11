import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Volume } from 'lucide-react';
import PhoneInterface from '@/components/tenant/PhoneInterface';

type Screen = 'contact' | 'calling' | 'inCall';

const VIDEO_PATHS = {
  lead: '/phone_calls/leasing/lead.mp4',
  application: '/phone_calls/leasing/application.mp4',
  signing: '/phone_calls/leasing/signing.mp4',
  premove: '/phone_calls/leasing/premove.mp4',
  onboarding: '/phone_calls/leasing/onboarding.mp4'
};

const TenantLeasing = () => {
  const { scenario = 'lead' } = useParams<{ scenario: string }>();
  const [currentScreen, setCurrentScreen] = useState<Screen>('contact');
  const [callTime, setCallTime] = useState(0);
  const [debugInfo, setDebugInfo] = useState<string>('Waiting for state change...');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };
  
  const playVideo = () => {
    console.log('Play video function called');
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play()
        .then(() => {
          console.log('Video started playing successfully');
          setDebugInfo('Video playing successfully');
        })
        .catch(error => {
          console.error('Error playing video:', error);
          setDebugInfo(`Video error: ${error.message}`);
        });
    } else {
      console.error('Video ref is null');
      setDebugInfo('Video element not found');
    }
  };

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-0 flex gap-8">
        <div className="flex-1">
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Home className="h-5 w-5 mr-2" />
              PropertyAI Voice Assistant - Lead Interaction
            </h3>
            <p className="text-sm">
              Hello! I'm your Property AI assistant. How can I help you today?
            </p>
          </div>
        </div>
        
        {/* Combined Phone and Voice Agent Card */}
        <Card className="w-[700px] flex-shrink-0">
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Phone Interface */}
              <div className="w-[280px]">
                <PhoneInterface 
                  scenario={scenario} 
                  onScreenChange={handleScreenChange}
                  playVideo={playVideo}
                />
              </div>
              
              {/* Voice Agent */}
              <div className="flex-1">
                <div className="flex flex-col h-full space-y-4">
                  <div className="flex items-center">
                    <Volume className="h-5 w-5 mr-2" />
                    <h3 className="text-lg font-medium">
                      Property AI Voice Assistant - {scenario}
                    </h3>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-base">
                      Hello! I'm your Property AI assistant. How can I help you today?
                    </p>
                    <p className="text-xs text-gray-500 mt-2">{debugInfo}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 flex-grow">
                    <video
                      ref={videoRef}
                      className="w-full h-auto rounded-lg"
                      playsInline
                      muted
                      style={{ border: '1px solid blue' }}
                    >
                      <source src="/phone_calls/leasing/lead.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default TenantLeasing;
