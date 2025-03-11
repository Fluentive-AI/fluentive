
import React, { useState, useRef } from 'react';
import { AIConversation } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Home } from 'lucide-react';
import PhoneInterface from '@/components/tenant/PhoneInterface';
import TenantVoiceAgent, { TenantVoiceAgentRef } from '@/components/tenant/TenantVoiceAgent';

interface ConversationViewProps {
  conversation: AIConversation;
}

const ConversationView: React.FC<ConversationViewProps> = ({ conversation }) => {
  const [currentScreen, setCurrentScreen] = useState<'contact' | 'calling' | 'inCall'>('contact');
  const [isPlaying, setIsPlaying] = useState(false);
  const voiceAgentRef = useRef<TenantVoiceAgentRef>(null);
  
  // Extract scenario name if it exists
  const scenarioParts = conversation.scenario?.split('/') || [];
  const scenarioCategory = scenarioParts[0] || '';
  const scenarioName = scenarioParts[1] || 'lead';
  
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
      <CardContent className="p-0 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Home className="h-5 w-5 mr-2" />
              PropertyAI Voice Assistant - {scenarioName || 'lead'}
            </h3>
            <p className="text-sm">
              Start a call using the phone interface to see the AI assistant in action.
            </p>
          </div>
        </div>
        
        <Card className="w-full md:w-[700px] flex-shrink-0 relative">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-[280px]">
                <PhoneInterface
                  currentScreen={currentScreen}
                  setCurrentScreen={setCurrentScreen}
                  scenario={scenarioName}
                />
              </div>
              
              <div className="flex-1">
                <TenantVoiceAgent
                  ref={voiceAgentRef}
                  currentScreen={currentScreen}
                  scenario={scenarioName}
                  onScreenChange={setCurrentScreen}
                />
              </div>
            </div>
          </CardContent>
          
          <button
            onClick={toggleVideoAndScreen}
            className="absolute bottom-0 left-0 right-0 h-16 bg-transparent hover:bg-black/[0.02] transition-colors duration-200 z-10"
            style={{ border: 'none', outline: 'none' }}
          />
        </Card>
      </CardContent>
    </Card>
  );
};

export default ConversationView;
