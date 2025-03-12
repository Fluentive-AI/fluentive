import React, { useState, useRef } from 'react';
import { AIConversation } from '@/types';
import { Phone, MessageSquare, Mail, User, Bot, Send, Mic, MicOff, FileText, List, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import ConversationView from '@/components/communications/ConversationView';
import { Badge } from "@/components/ui/badge";
import PhoneInterface from '@/components/tenant/PhoneInterface';
import TenantVoiceAgent, { TenantVoiceAgentRef } from '@/components/tenant/TenantVoiceAgent';

interface AIAgentConsoleProps {
  conversations: AIConversation[];
}

const getCategoryBadgeColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'leasing':
      return 'bg-blue-100 text-blue-800';
    case 'operations':
      return 'bg-purple-100 text-purple-800';
    case 'maintenance':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getSubcategoryBadgeColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'leasing':
      return 'bg-blue-50 text-blue-700';
    case 'operations':
      return 'bg-purple-50 text-purple-700';
    case 'maintenance':
      return 'bg-orange-50 text-orange-700';
    default:
      return 'bg-gray-50 text-gray-700';
  }
};

const formatCategory = (scenario: string) => {
  if (!scenario) return 'General';
  const [category] = scenario.split('/');
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const formatSubcategory = (scenario: string) => {
  if (!scenario) return 'Inquiry';
  const [_, type] = scenario.split('/');
  return type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ');
};

const AIAgentConsole = ({ conversations }: AIAgentConsoleProps) => {
  const [selectedConversation, setSelectedConversation] = useState<AIConversation | null>(null);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const [currentScreen, setCurrentScreen] = useState<'contact' | 'calling' | 'inCall'>('contact');
  const voiceAgentRef = useRef<TenantVoiceAgentRef>(null);
  const [activeTab, setActiveTab] = useState('summary');
  
  const handleSelectConversation = (conversation: AIConversation) => {
    setSelectedConversation(conversation);
  };
  
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the AI agent.",
    });
    
    setInputText('');
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    toast({
      title: isRecording ? "Recording stopped" : "Recording started",
      description: isRecording 
        ? "Your voice recording has been stopped." 
        : "The AI agent is now listening to your voice input.",
    });
  };
  
  const getChannelIcon = (channel: 'voice' | 'sms' | 'email') => {
    switch (channel) {
      case 'voice':
        return <Phone className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const handleCallStarted = () => {
    // Any logic needed when call starts
  };

  const handlePlayVideo = () => {
    voiceAgentRef.current?.playVideo();
  };

  const handleScreenChange = (screen: 'contact' | 'calling' | 'inCall') => {
    setCurrentScreen(screen);
  };

  // Extract scenario from the selected conversation
  const getScenario = () => {
    if (!selectedConversation?.scenario) return 'lead';
    
    // Extract the scenario part after the slash
    const parts = selectedConversation.scenario.split('/');
    return parts.length > 1 ? parts[1] : parts[0];
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-[600px] flex flex-col md:flex-row">
      {/* Conversations Sidebar */}
      <div className="w-full md:w-80 flex-shrink-0 border-r border-gray-100 overflow-y-auto">
        <div className="p-3 border-b border-gray-100">
          <h3 className="font-medium">Recent Conversations</h3>
        </div>
        
        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div 
              key={conversation.id}
              className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''}`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                  {getChannelIcon(conversation.channel)}
                </div>
                <span className="font-medium">{conversation.contactName}</span>
              </div>
              <div className="text-sm text-gray-600 truncate">
                {conversation.summary}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(conversation.dateTime).toLocaleString()}
              </div>
              {conversation.scenario && (
                <div className="mt-1 flex gap-1.5">
                  <Badge 
                    variant="secondary"
                    className={getCategoryBadgeColor(formatCategory(conversation.scenario))}
                  >
                    {formatCategory(conversation.scenario)}
                  </Badge>
                  <Badge 
                    variant="secondary"
                    className={getSubcategoryBadgeColor(formatCategory(conversation.scenario))}
                  >
                    {formatSubcategory(conversation.scenario)}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                    {getChannelIcon(selectedConversation.channel)}
                  </div>
                  <div>
                    <div className="font-medium">{selectedConversation.contactName}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{selectedConversation.channel}</span>
                      <span>•</span>
                      <div className="flex gap-1.5">
                        <Badge 
                          variant="secondary"
                          className={getCategoryBadgeColor(formatCategory(selectedConversation.scenario || ''))}
                        >
                          {formatCategory(selectedConversation.scenario || '')}
                        </Badge>
                        <Badge 
                          variant="secondary"
                          className={getSubcategoryBadgeColor(formatCategory(selectedConversation.scenario || ''))}
                        >
                          {formatSubcategory(selectedConversation.scenario || '')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  <button 
                    onClick={() => setActiveTab('summary')}
                    className={`flex items-center px-3 py-1.5 text-sm rounded-l-md ${activeTab === 'summary' ? 'bg-brand-100 text-brand-800' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <List className="h-4 w-4 mr-2" />
                    Summary
                  </button>
                  <button 
                    onClick={() => setActiveTab('transcript')}
                    className={`flex items-center px-3 py-1.5 text-sm ${activeTab === 'transcript' ? 'bg-brand-100 text-brand-800' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Transcript
                  </button>
                  <button 
                    onClick={() => setActiveTab('conversation')}
                    className={`flex items-center px-3 py-1.5 text-sm rounded-r-md ${activeTab === 'conversation' ? 'bg-brand-100 text-brand-800' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Conversation
                  </button>
                </div>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'summary' && (
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Conversation Summary</h4>
                    <p>{selectedConversation.summary}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Sentiment</h4>
                    <p className="capitalize">{selectedConversation.sentiment}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Action Items</h4>
                    <ul className="list-disc list-inside">
                      {selectedConversation.actionItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">System Actions</h4>
                    <ul className="list-disc list-inside">
                      <li>Contact information saved to Yardi</li>
                      <li>Property tour scheduled for {new Date().toLocaleDateString()} at 3:00 PM</li>
                      <li>Follow-up email sent with property details</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'transcript' && (
                <div>
                  {selectedConversation.transcript.split('\n').map((line, index) => {
                    const isAI = line.startsWith('AI:');
                    const content = line.replace(/^(AI:|John:|Thomas:|Jennifer:)/, '').trim();
                    
                    if (!content) return null;
                    
                    return (
                      <div key={index} className={`flex mb-3 ${isAI ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${isAI ? 'bg-gray-100' : 'bg-brand-100 text-brand-900'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            {isAI ? (
                              <Bot className="h-4 w-4" />
                            ) : (
                              <User className="h-4 w-4" />
                            )}
                            <span className="text-xs font-medium">
                              {isAI ? 'AI Agent' : selectedConversation.contactName}
                            </span>
                          </div>
                          <div>{content}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {activeTab === 'conversation' && (
                <div>
                  {console.log('Rendering conversation tab for:', selectedConversation)}
                  <ConversationView conversation={selectedConversation} />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Bot className="h-12 w-12 mx-auto mb-3 text-brand-300" />
              <p>Select a conversation to view</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAgentConsole;
