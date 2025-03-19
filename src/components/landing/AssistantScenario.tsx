
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AssistantPhoneUI from './AssistantPhoneUI';
import { AssistantTab } from '@/types';

interface AssistantScenarioProps {
  assistant: AssistantTab;
  onCallEnd: () => void;
}

const AssistantScenario = ({ assistant, onCallEnd }: AssistantScenarioProps) => {
  const [phoneState, setPhoneState] = useState<'contact' | 'calling' | 'in-call'>('contact');
  const [callTime, setCallTime] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => endCallSimulation();
  }, []);

  const startCallSimulation = () => {
    if (assistant.id === 'operations') {
      // For operations, go directly to in-call state
      setPhoneState('in-call');
      
      timerRef.current = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
      
      if (videoRef.current) {
        videoRef.current.src = assistant.videoPath;
        videoRef.current.load();
        
        // Give more time for the video to load
        setTimeout(() => {
          if (videoRef.current) {
            console.log(`Playing video for ${assistant.id}: ${assistant.videoPath}`);
            const playPromise = videoRef.current.play();
            
            if (playPromise !== undefined) {
              playPromise.catch(error => {
                console.error(`Video play error for ${assistant.id}:`, error);
                setVideoError(true);
              });
            }
          }
        }, 2000);
      }
      
      if (audioRef.current && window.innerWidth < 768) {
        audioRef.current.src = assistant.audioPath;
        audioRef.current.load();
        audioRef.current.play().catch(error => {
          console.error("Audio playback error:", error);
        });
      }
    } else {
      // For other assistants, show calling animation first
      setPhoneState('calling');
      
      setTimeout(() => {
        setPhoneState('in-call');
        
        timerRef.current = setInterval(() => {
          setCallTime(prev => prev + 1);
        }, 1000);
        
        if (videoRef.current) {
          videoRef.current.src = assistant.videoPath;
          videoRef.current.load();
          
          // Give more time for the video to load
          setTimeout(() => {
            if (videoRef.current) {
              console.log(`Playing video for ${assistant.id}: ${assistant.videoPath}`);
              const playPromise = videoRef.current.play();
              
              if (playPromise !== undefined) {
                playPromise.catch(error => {
                  console.error(`Video play error for ${assistant.id}:`, error);
                  setVideoError(true);
                });
              }
            }
          }, 2000);
        }
        
        if (audioRef.current && window.innerWidth < 768) {
          audioRef.current.src = assistant.audioPath;
          audioRef.current.load();
          audioRef.current.play().catch(error => {
            console.error("Audio playback error:", error);
          });
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
    setVideoError(false);
    
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

  const handleManualPlay = () => {
    setVideoError(false);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error("Manual play attempt error:", err);
          setVideoError(true);
        });
      }
    }
  };

  return (
    <div className="text-center mb-8">
      <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">{assistant.name} - {assistant.title}</h3>
      <p className="text-gray-600 max-w-2xl mx-auto">{assistant.description}</p>
      
      <div className="flex justify-center items-center mb-10 mt-8">
        {phoneState === 'contact' ? (
          <button 
            onClick={startCallSimulation}
            className="flex items-center gap-3 group"
          >
            <img 
              src="/phone_screens/accept_call.png" 
              alt="Call" 
              className="w-16 h-16 hover:opacity-90 transition-all"
            />
            <span className="text-xl font-medium text-gray-800">
              Call {assistant.name}
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
              <AssistantPhoneUI 
                phoneState={phoneState}
                callTime={callTime}
                onStartCall={startCallSimulation}
                onEndCall={endCallSimulation}
                isIncomingCall={assistant.id === 'operations'}
              />
              
              <audio 
                ref={audioRef}
                src={assistant.audioPath}
                preload="auto"
                playsInline
                loop
              />
            </div>
          </div>
          
          <div className="hidden md:flex flex-row gap-6 items-center bg-white">
            <div className="md:w-[40%] flex justify-center items-center">
              <AssistantPhoneUI 
                phoneState={phoneState}
                callTime={callTime}
                onStartCall={startCallSimulation}
                onEndCall={endCallSimulation}
                isIncomingCall={assistant.id === 'operations'}
              />
            </div>
            
            <div className="md:w-[60%] flex items-center relative">
              <video 
                ref={videoRef}
                className="w-full rounded-lg" 
                preload="auto"
                controls={false}
                muted={false}
                playsInline
                loop
              />
              {videoError && phoneState === 'in-call' && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <button 
                    onClick={handleManualPlay}
                    className="bg-white text-black px-4 py-2 rounded-lg"
                  >
                    Click to play video
                  </button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssistantScenario;
