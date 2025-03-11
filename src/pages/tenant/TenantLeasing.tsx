import React, { useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Home } from 'lucide-react';
import PhoneInterface from '@/components/tenant/PhoneInterface';
import TenantVoiceAgent, { TenantVoiceAgentRef } from '@/components/tenant/TenantVoiceAgent';

type Screen = 'contact' | 'calling' | 'inCall';

const TenantLeasing = () => {
  // Extract the scenario from the URL path
  const params = useParams();
  const location = useLocation();
  
  // Log the full URL and params for debugging
  console.log('Current location:', location);
  console.log('Current params:', params);
  
  const scenario = params['*']?.split('/').pop();
  const [currentScreen, setCurrentScreen] = useState<Screen>('contact');
  const [isPlaying, setIsPlaying] = useState(false);
  const voiceAgentRef = useRef<TenantVoiceAgentRef>(null);
  
  const toggleVideoAndScreen = () => {
    if (isPlaying) {
      voiceAgentRef.current?.playVideo();
      setCurrentScreen('contact');
      setIsPlaying(false);
    } else {
      setCurrentScreen('calling');
      setTimeout(() => {
        setCurrentScreen('inCall');
      }, 2000);
      voiceAgentRef.current?.playVideo();
      setIsPlaying(true);
    }
  };

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-0 flex gap-8">
        <div className="flex-1">
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Home className="h-5 w-5 mr-2" />
              PropertyAI Voice Assistant - {scenario || 'lead'} Interaction
            </h3>
            <p className="text-sm">
              Start a call using the phone interface to see the AI assistant in action.
            </p>
          </div>
        </div>
        
        <Card className="w-[700px] flex-shrink-0 relative">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="w-[280px]">
                <PhoneInterface
                  currentScreen={currentScreen}
                  setCurrentScreen={setCurrentScreen}
                  scenario={scenario}
                />
              </div>
              
              <div className="flex-1">
                <TenantVoiceAgent
                  ref={voiceAgentRef}
                  currentScreen={currentScreen}
                  scenario={scenario}
                  onScreenChange={setCurrentScreen}
                />
              </div>
            </div>
          </CardContent>
          
          <button
            onClick={toggleVideoAndScreen}
            className="fixed bottom-0 left-[calc(16rem+24px)] right-0 h-16 bg-transparent hover:bg-black/[0.02] transition-colors duration-200 z-10"
            style={{ border: 'none', outline: 'none' }}
          />
        </Card>
      </CardContent>
    </Card>
  );
};

export default TenantLeasing;
