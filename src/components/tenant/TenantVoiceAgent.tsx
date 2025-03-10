
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Send, Volume2 } from 'lucide-react';
import { getApiConfig, setApiKey } from '@/config/apiConfig';

const TenantVoiceAgent = () => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState<{ role: 'user' | 'agent', text: string }[]>([]);
  const [apiKey, setApiKeyState] = useState(getApiConfig().ELEVEN_LABS_API_KEY);
  const [showApiKeyInput, setShowApiKeyInput] = useState(apiKey === 'MY_API_KEY');
  const location = useLocation();
  
  useEffect(() => {
    // Reset conversation when route changes
    setConversation([
      { role: 'agent', text: 'Hello! How can I assist you today?' }
    ]);
  }, [location.pathname]);
  
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [...prev, { role: 'user', text: inputText }]);
    
    // Simulate agent response
    setTimeout(() => {
      const scenario = getSoundWaveScenario();
      setConversation(prev => [...prev, { 
        role: 'agent', 
        text: `[AI Agent Response for ${scenario}]: I understand your question. Let me help you with that.` 
      }]);
    }, 1000);
    
    setInputText('');
  };
  
  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate user speaking after 2 seconds
      setTimeout(() => {
        setConversation(prev => [...prev, { 
          role: 'user', 
          text: 'Can you tell me more about this?' 
        }]);
        
        // Simulate agent response
        setTimeout(() => {
          const scenario = getSoundWaveScenario();
          setConversation(prev => [...prev, { 
            role: 'agent', 
            text: `[AI Agent Response for ${scenario}]: Of course! I'd be happy to provide more information.` 
          }]);
          setIsListening(false);
        }, 1500);
      }, 2000);
    }
  };
  
  const getSoundWaveScenario = () => {
    const path = location.pathname;
    if (path.includes('leasing/lead')) return 'Lead Interaction';
    if (path.includes('leasing/application')) return 'Application Support';
    if (path.includes('leasing/signing')) return 'Lease Signing';
    if (path.includes('leasing/premove')) return 'Pre-Move-in Prep';
    if (path.includes('leasing/onboarding')) return 'Tenant Onboarding';
    if (path.includes('operations/rent')) return 'Rent Collection';
    if (path.includes('operations/renewal')) return 'Lease Renewals';
    if (path.includes('operations/moveout-notice')) return 'Move-Out Notices';
    if (path.includes('operations/moveout-coordination')) return 'Move-Out Coordination';
    if (path.includes('maintenance/request')) return 'Maintenance Requests';
    if (path.includes('maintenance/workorder')) return 'Work Order Triage';
    if (path.includes('maintenance/scheduling')) return 'Maintenance Scheduling';
    if (path.includes('maintenance/relationship')) return 'Tenant Relationship';
    return 'AI Agent';
  };
  
  const handleSaveApiKey = () => {
    setApiKey(apiKey);
    setShowApiKeyInput(false);
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Volume2 className="h-5 w-5 mr-2" />
          Voice AI Agent - {getSoundWaveScenario()}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[500px]">
        {showApiKeyInput ? (
          <div className="bg-yellow-50 p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2">API Key Required</h3>
            <p className="text-sm mb-4">
              To use the Voice AI Agent, please enter your ElevenLabs API key below.
              This will be stored in localStorage and not transmitted to any server.
            </p>
            <div className="flex gap-2">
              <Input 
                type="password" 
                value={apiKey} 
                onChange={(e) => setApiKeyState(e.target.value)}
                placeholder="Enter ElevenLabs API Key" 
              />
              <Button onClick={handleSaveApiKey}>Save</Button>
            </div>
          </div>
        ) : null}
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {conversation.map((item, index) => (
            <div 
              key={index} 
              className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  item.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>
        
        {/* Sound wave visualization (simplified) */}
        <div className="h-16 mb-4 bg-gray-50 rounded-md flex items-center justify-center">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="bg-primary/80 rounded-full w-1"
                style={{ 
                  height: `${12 + Math.sin(i / Math.PI) * 20}px`,
                  animationDelay: `${i * 0.05}s`,
                  animation: isListening ? 'soundwave 1s infinite' : 'none'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            onClick={toggleListening}
            className="flex-shrink-0"
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          
          <Button 
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="flex-shrink-0"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantVoiceAgent;
