
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Volume2, Phone, PlayCircle, Check, MessageSquare } from 'lucide-react';

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
      <div className="pricing-card h-full overflow-hidden border border-gray-200 rounded-xl shadow-lg transform hover:scale-[1.01] transition-all duration-300">
        <div className="pricing-card-header bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 p-6">
          <div className="flex items-center">
            <Volume2 className="h-6 w-6 mr-3 text-white" />
            <h3 className="text-xl font-bold text-white">
              Homm Voice Assistant
            </h3>
          </div>
          <p className="mt-2 text-blue-100">
            {scenarioNames[scenario || 'lead']}
          </p>
        </div>

        <div className="pricing-card-content p-6 space-y-5">
          <div className="flex gap-3">
            <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-base text-gray-700 font-medium">
                Hello! I'm your Homm personal assistant. How can I help you today?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Available 24/7 to support your property management needs
              </p>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md relative">
            <video
              ref={videoRef}
              className="w-full h-auto rounded-lg"
              playsInline
              muted
            >
              <source src="/phone_calls/leasing/lead.mp4" type="video/mp4" />
            </video>
            
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all cursor-pointer" onClick={toggleVideo}>
                  <PlayCircle className="h-12 w-12 text-white" />
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 space-y-3">
            <h4 className="text-lg font-medium text-gray-900">Key Benefits:</h4>
            <div className="space-y-2">
              <div className="pricing-feature">
                <div className="pricing-feature-icon">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-gray-700">Instant response to tenant inquiries</p>
              </div>
              <div className="pricing-feature">
                <div className="pricing-feature-icon">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-gray-700">Automated lead qualification and follow-up</p>
              </div>
              <div className="pricing-feature">
                <div className="pricing-feature-icon">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-gray-700">Seamless integration with your existing systems</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pricing-card-footer bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex flex-col gap-4">
            <h4 className="text-center text-lg font-semibold text-gray-900">Ready to transform your property management?</h4>
            <button
              onClick={toggleVideo}
              className="pricing-cta-button bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 group"
            >
              {isPlaying ? 'Stop Demo' : 'Watch Demo'}
              <Phone className="h-4 w-4 group-hover:animate-pulse" />
            </button>
            <p className="text-center text-sm text-gray-500">
              Contact us for custom pricing tailored to your portfolio size
            </p>
          </div>
        </div>
      </div>
    );
  }
);

TenantVoiceAgent.displayName = 'TenantVoiceAgent';

export default TenantVoiceAgent;
