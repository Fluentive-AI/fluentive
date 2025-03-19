
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Volume2, Phone, PlayCircle } from 'lucide-react';

interface TenantVoiceAgentProps {
  currentScreen?: 'contact' | 'calling' | 'inCall';
  scenario?: string;
  onScreenChange?: (screen: 'contact' | 'calling' | 'inCall') => void;
}

export interface TenantVoiceAgentRef {
  playVideo: () => void;
}

const scenarioNames: Record<string, string> = {
  'lead': 'Lead Interaction',
  'application': 'Application Support',
  'signing': 'Lease Signing',
  'premove': 'Pre-Move-in Prep',
  'onboarding': 'Tenant Onboarding',
  'rent': 'Rent Collection',
  'renewal': 'Lease Renewals',
  'moveout-notice': 'Move-Out Notices',
  'moveout-coordination': 'Move-Out Coordination',
  'request': 'Maintenance Requests',
  'workorder': 'Work Order Triage',
  'scheduling': 'Maintenance Scheduling',
  'relationship': 'Tenant Relationship'
};

const TenantVoiceAgent = forwardRef<TenantVoiceAgentRef, TenantVoiceAgentProps>(
  ({ currentScreen, scenario, onScreenChange }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleVideo = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          onScreenChange?.('contact');
        } else {
          videoRef.current.currentTime = 0;
          videoRef.current.play()
            .then(() => {
              onScreenChange?.('calling');
              setTimeout(() => {
                onScreenChange?.('inCall');
              }, 2000);
            });
        }
        setIsPlaying(!isPlaying);
      }
    };

    useImperativeHandle(ref, () => ({
      playVideo: () => {
        if (!isPlaying) {
          toggleVideo();
        }
      }
    }));

    return (
      <Card className="h-full shadow-lg border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="flex items-center text-blue-700">
            <Volume2 className="h-5 w-5 mr-2 text-blue-600" />
            Homm Voice Assistant - {scenarioNames[scenario || 'lead']}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[500px] space-y-4 p-5">
          <div className="bg-blue-50 p-4 rounded-lg w-2/3 shadow-sm border border-blue-100">
            <p className="text-base text-blue-800">
              Hello! I'm your Homm personal assistant. How can I help you today?
            </p>
          </div>
          
          <div className="relative bg-white p-2 rounded-lg border border-gray-200 shadow-md">
            <video
              ref={videoRef}
              className="w-full h-auto rounded-lg"
              playsInline
              muted
            >
              <source src="/phone_calls/leasing/lead.mp4" type="video/mp4" />
            </video>
            
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                <PlayCircle className="h-16 w-16 text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={toggleVideo} />
              </div>
            )}
          </div>

          {/* Control button at the bottom */}
          <button
            onClick={toggleVideo}
            className="mt-auto py-3 px-6 bg-brand-500 text-white rounded-full font-medium flex items-center justify-center hover:bg-brand-600 transition-colors duration-200 shadow-md"
          >
            {isPlaying ? 'Stop Demo' : 'Start Demo'}
            <Phone className="ml-2 h-4 w-4" />
          </button>
        </CardContent>
      </Card>
    );
  }
);

TenantVoiceAgent.displayName = 'TenantVoiceAgent';

export default TenantVoiceAgent;
