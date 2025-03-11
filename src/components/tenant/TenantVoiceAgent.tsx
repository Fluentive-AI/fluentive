import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Volume, Play } from 'lucide-react';

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
    
    useEffect(() => {
      console.log('TenantVoiceAgent - Current screen:', currentScreen);
    }, [currentScreen, scenario]);

    const toggleVideo = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          // When stopping video, go back to contact screen
          onScreenChange?.('contact');
        } else {
          videoRef.current.currentTime = 0;
          videoRef.current.play()
            .then(() => {
              console.log('Video started playing from external trigger');
              // When starting video, simulate call flow
              onScreenChange?.('calling');
              setTimeout(() => {
                onScreenChange?.('inCall');
              }, 2000);
            })
            .catch(error => {
              console.error('Error playing video:', error);
            });
        }
        setIsPlaying(!isPlaying);
      } else {
        console.error('Video ref is null');
      }
    };

    // Reset isPlaying when screen changes to contact
    useEffect(() => {
      if (currentScreen === 'contact') {
        setIsPlaying(false);
      }
    }, [currentScreen]);

    // Expose the playVideo method to parent components
    useImperativeHandle(ref, () => ({
      playVideo: () => {
        if (!isPlaying) {
          toggleVideo();
        }
      }
    }));

    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Volume className="h-5 w-5 mr-2" />
            Property AI Voice Assistant - {scenarioNames[scenario || 'lead']}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[500px] space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg w-2/3">
            <p className="text-base">
              Hello! I'm your Property AI assistant. How can I help you today?
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <video
              ref={videoRef}
              className="w-full h-auto rounded-lg"
              playsInline
              muted
            >
              <source src="/phone_calls/leasing/lead.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Transparent button at the bottom */}
          <button
            onClick={toggleVideo}
            className="absolute bottom-0 left-0 right-0 h-16 bg-transparent hover:bg-black/[0.02] transition-colors duration-200 z-20"
            style={{ border: 'none', outline: 'none' }}
          />
        </CardContent>
      </Card>
    );
  }
);

TenantVoiceAgent.displayName = 'TenantVoiceAgent';

export default TenantVoiceAgent;