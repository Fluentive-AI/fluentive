
import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import TenantVoiceAgent, { TenantVoiceAgentRef } from '@/components/tenant/TenantVoiceAgent';
import PhoneInterface from '@/components/tenant/PhoneInterface';

interface TenantOperationsProps {
  scenario?: string;
}

const TenantOperations: React.FC<TenantOperationsProps> = ({ scenario: propScenario }) => {
  const { scenario: urlScenario } = useParams<{ scenario?: string }>();
  const scenario = propScenario || urlScenario || 'rent';
  
  const [currentScreen, setCurrentScreen] = useState<'contact' | 'calling' | 'inCall'>('contact');
  const voiceAgentRef = useRef<TenantVoiceAgentRef>(null);

  const handlePhoneInterfaceCall = () => {
    voiceAgentRef.current?.playVideo();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Operations AI Assistant Demo: {scenario}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="overflow-hidden h-[700px]">
          <CardContent className="p-0 h-full">
            <PhoneInterface 
              currentScreen={currentScreen}
              scenario={scenario}
              onCallButtonClick={handlePhoneInterfaceCall}
            />
          </CardContent>
        </Card>
        
        <div className="h-[700px]">
          <TenantVoiceAgent 
            ref={voiceAgentRef} 
            currentScreen={currentScreen}
            scenario={scenario}
            onScreenChange={setCurrentScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default TenantOperations;
