import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Volume } from 'lucide-react';

interface TenantVoiceAgentProps {
  currentScreen?: 'contact' | 'calling' | 'inCall';
  scenario?: string;
}

export interface TenantVoiceAgentRef {
  playVideo: () => void;
}

const TenantVoiceAgent = forwardRef<TenantVoiceAgentRef, TenantVoiceAgentProps>(
  ({ currentScreen, scenario }, ref) => {
    const [debugInfo, setDebugInfo] = useState<string>('');
    const videoRef = useRef<HTMLVideoElement>(null);
    
    useEffect(() => {
      console.log('TenantVoiceAgent - Current screen:', currentScreen);
      
      // Try to play video when entering inCall state
      if (currentScreen === 'inCall') {
        playVideo();
      }
    }, [currentScreen, scenario]);

    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play()
          .then(() => {
            console.log('Video started playing from external trigger');
          })
          .catch(error => {
            console.error('Error playing video:', error);
          });
      } else {
        console.error('Video ref is null');
      }
    };

    // Expose the playVideo method to parent components
    useImperativeHandle(ref, () => ({
      playVideo
    }));

    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Volume className="h-5 w-5 mr-2" />
            Property AI Voice Assistant - {scenario || 'lead'}
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
        </CardContent>
      </Card>
    );
  }
);

TenantVoiceAgent.displayName = 'TenantVoiceAgent';

export default TenantVoiceAgent;
