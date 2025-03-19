import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { AssistantTab } from '@/types';
import AssistantScenario from './AssistantScenario';

interface DemoAssistantTabsProps {
  onCallEnd: () => void;
}

const DemoAssistantTabs = ({ onCallEnd }: DemoAssistantTabsProps) => {
  const [activeTab, setActiveTab] = useState('leasing');
  const activeCallRef = useRef<{endCall: () => void} | null>(null);

  const handleTabChange = (tabId: string) => {
    if (activeCallRef.current) {
      activeCallRef.current.endCall();
      activeCallRef.current = null;
    }
    
    setActiveTab(tabId);
  };

  const registerEndCall = (endCall: () => void) => {
    activeCallRef.current = { endCall };
    return () => {
      activeCallRef.current = null;
    };
  };

  const assistantTabs: AssistantTab[] = [
    {
      id: 'leasing',
      name: 'Jessica',
      title: 'Leasing Assistant',
      description: 'Handles rental inquiries and application questions',
      videoPath: '/phone_calls/leasing/lead.mp4',
      audioPath: '/phone_calls/leasing/lead.m4a',
      avatarPath: '/avatars/jessica.png'
    },
    {
      id: 'operations',
      name: 'Susan',
      title: 'Property Operations',
      description: 'Assists with rent payments and property management',
      videoPath: '/phone_calls/property_operations/property_operations.mp4',
      audioPath: '/phone_calls/property_operations/property_operations.m4a',
      avatarPath: '/avatars/susan.png'
    },
    {
      id: 'maintenance',
      name: 'James',
      title: 'Maintenance Assistant',
      description: 'Processes maintenance requests and scheduling',
      videoPath: '/phone_calls/maintenance/maintenance.mp4',
      audioPath: '/phone_calls/maintenance/maintenance.m4a',
      avatarPath: '/avatars/james.png'
    }
  ];
  
  const currentAssistant = assistantTabs.find(tab => tab.id === activeTab) || assistantTabs[0];

  const getTabLabel = (id: string) => {
    switch (id) {
      case 'leasing':
        return 'AI Leasing Assistant';
      case 'operations':
        return 'AI Property Operations Assistant';
      case 'maintenance':
        return 'AI Maintenance Assistant';
      default:
        return id;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-4 mb-8 w-full max-w-4xl mx-auto">
        {assistantTabs.map(tab => (
          <Button 
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-5 py-6 rounded-lg transition-all flex-grow sm:flex-grow-0 w-full sm:w-auto md:min-w-[220px] ${
              activeTab === tab.id 
                ? 'bg-blue-500 text-white hover:opacity-90'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
            variant="ghost"
          >
            <span className="font-medium text-base sm:text-lg">{getTabLabel(tab.id)}</span>
          </Button>
        ))}
      </div>

      <div className="transition-all">
        {assistantTabs.map(tab => (
          <div key={tab.id} className={`${activeTab === tab.id ? 'block' : 'hidden'}`}>
            <AssistantScenario 
              assistant={tab} 
              onCallEnd={onCallEnd}
              registerEndCall={registerEndCall}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoAssistantTabs;
