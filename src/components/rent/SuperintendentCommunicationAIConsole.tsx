import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Bot, User, MessageSquare, Mail, Phone, List, MessageCircle, AlertCircle, CheckCircle2, Clock, Play, Pause } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { mockSuperCommunications, CURRENT_SUPER } from '@/data/mockData';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

// Define the structure for superintendent communications
interface SuperCommunication {
  id: string;
  tenantName: string;
  unit: string;
  community: string;
  superintendent: string;
  status: string;
  message: string;
  date: string;
  category: string;
  // Add virtual channel property based on ID to simulate different channels
  channel?: 'sms' | 'email' | 'phone';
  transcript: string;
}

interface SuperintendentCommunicationAIConsoleProps {
  searchQuery?: string;
  statusFilters?: string[];
  marketFilters: string[];
  topicFilters?: string[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'urgent':
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case 'scheduled':
      return <Clock className="h-5 w-5 text-warning" />;
    default:
      return <MessageSquare className="h-5 w-5 text-muted-foreground" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'urgent':
      return 'bg-destructive/10 text-destructive';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'scheduled':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-primary/10 text-primary';
  }
};

// Determine channel based on ID for demonstration purposes
const getChannel = (id: string): 'sms' | 'email' | 'phone' => {
  // Use the last digit of the ID to determine channel type
  const lastDigit = parseInt(id.slice(-1));
  if (lastDigit >= 0 && lastDigit <= 3) {
    return 'sms';
  } else if (lastDigit >= 4 && lastDigit <= 7) {
    return 'email';
  } else {
    return 'phone';
  }
};

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'sms':
      return <MessageSquare className="h-4 w-4" />;
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'phone':
      return <Phone className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const getChannelDisplayName = (channel: string) => {
  switch (channel) {
    case 'sms':
      return 'Text Message';
    case 'email':
      return 'Email';
    case 'phone':
      return 'Phone Call';
    default:
      return 'Communication';
  }
};

const getStatusDisplayName = (status: string) => {
  switch (status) {
    case 'urgent':
      return 'Urgent';
    case 'completed':
      return 'Completed';
    case 'scheduled':
      return 'Scheduled';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

// Simple Audio Player Component
const SimpleAudioPlayer = ({ audioSrc }: { audioSrc: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Reset error state on new play attempt
        setError(null);
        
        // Play the audio
        const playPromise = audioRef.current.play();
        
        // Handle play() promise rejection (browsers require user interaction for audio)
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(e => {
          console.error("Error playing audio:", e);
          setError("Could not play audio. Make sure audio files exist in public folder.");
        });
      }
    }
  };

  // Handle when audio ends
  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <audio 
        ref={audioRef}
        src={`/${audioSrc}`} // Make sure the path starts with a slash
        onEnded={handleEnded}
        onError={() => setError("Audio file not found or format not supported")}
        style={{ display: 'none' }} // Hide the audio element
      />
      
      <Button
        onClick={togglePlayPause}
        className="flex items-center gap-2"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {isPlaying ? "Pause Recording" : "Play Recording"}
      </Button>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
};

const SuperintendentCommunicationAIConsole: React.FC<SuperintendentCommunicationAIConsoleProps> = ({
  searchQuery = "",
  statusFilters = [],
  marketFilters = [],
  topicFilters = []
}) => {
  const [filteredCommunications, setFilteredCommunications] = useState<SuperCommunication[]>([]);
  const [selectedCommunication, setSelectedCommunication] = useState<SuperCommunication | null>(null);
  const [activeTab, setActiveTab] = useState('summary');

  // Function to handle selecting a communication
  const handleSelectCommunication = (communication: SuperCommunication) => {
    setSelectedCommunication(communication);
    setActiveTab('summary');
  };

  useEffect(() => {
    let filtered = mockSuperCommunications.filter(
      comm => comm.superintendent === CURRENT_SUPER
    );
    
    // Add channel info to each communication
    filtered = filtered.map(comm => ({
      ...comm,
      channel: getChannel(comm.id)
    }));
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(comm => 
        comm.tenantName.toLowerCase().includes(query) || 
        comm.community.toLowerCase().includes(query) || 
        comm.message.toLowerCase().includes(query)
      );
    }
    
    if (statusFilters.length > 0) {
      filtered = filtered.filter(comm => statusFilters.includes(comm.status));
    }
    
    if (marketFilters.length > 0) {
      filtered = filtered.filter(comm => {
        return marketFilters.some(filter => comm.community.includes(filter));
      });
    }

    // Add filtering by maintenance topics
    if (topicFilters.length > 0) {
      filtered = filtered.filter(comm => topicFilters.includes(comm.category));
    }
    
    setFilteredCommunications(filtered);
    
    // If we have communications and none selected, select the first one
    if (filtered.length > 0 && !selectedCommunication) {
      setSelectedCommunication(filtered[0]);
    } else if (filtered.length === 0) {
      setSelectedCommunication(null);
    }
  }, [searchQuery, statusFilters, marketFilters, topicFilters]);

  return (
    <div className="flex border rounded-md overflow-hidden h-[600px]">
      {/* Communications Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-3 border-b">
          <h3 className="font-medium">Recent Communications</h3>
        </div>
        
        <div className="overflow-y-auto">
          {filteredCommunications.length > 0 ? (
            filteredCommunications.map((communication) => (
              <div 
                key={communication.id}
                className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedCommunication?.id === communication.id ? 'bg-gray-50' : ''}`}
                onClick={() => handleSelectCommunication(communication)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                    {getChannelIcon(communication.channel || 'sms')}
                  </div>
                  <span className="font-medium">{communication.tenantName}</span>
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {communication.message}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(communication.date).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
                <div className="mt-1">
                  <Badge className={getStatusColor(communication.status)}>
                    {getStatusDisplayName(communication.status)}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No communications match your filters.
            </div>
          )}
        </div>
      </div>
      
      {/* Communication Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {selectedCommunication ? (
          <>
            {/* Communication Header */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                    {getChannelIcon(selectedCommunication.channel || 'sms')}
                  </div>
                  <div>
                    <div className="font-medium">{selectedCommunication.tenantName}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{getChannelDisplayName(selectedCommunication.channel || 'sms')}</span>
                      <span>•</span>
                      <span>{selectedCommunication.unit}</span>
                      <span>•</span>
                      <span>{selectedCommunication.community}</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Button with Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      Contact Tenant
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[280px]">
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col gap-3">
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start gap-2 h-10"
                          onClick={() => window.open(`tel:555-123-4567`, '_blank')}
                        >
                          <Phone className="h-4 w-4 text-brand-600" />
                          <span>Call {selectedCommunication.tenantName}</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start gap-2 h-10"
                          onClick={() => window.open(`sms:555-123-4567`, '_blank')}
                        >
                          <MessageSquare className="h-4 w-4 text-brand-600" />
                          <span>Text {selectedCommunication.tenantName}</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start gap-2 h-10"
                          onClick={() => window.open(`mailto:tenant@example.com`, '_blank')}
                        >
                          <Mail className="h-4 w-4 text-brand-600" />
                          <span>Email {selectedCommunication.tenantName}</span>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Tab Navigation */}
              <div className="mt-4 border-b">
                <div className="flex">
                  <button 
                    onClick={() => setActiveTab('summary')}
                    className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'summary' ? 'border-b-2 border-brand-600 text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <List className="h-4 w-4 mr-2" />
                    Summary
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('transcript')}
                    className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'transcript' ? 'border-b-2 border-brand-600 text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Transcript
                  </button>
                  
                  {selectedCommunication.channel === 'phone' && (
                    <button 
                      onClick={() => setActiveTab('conversation')}
                      className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === 'conversation' ? 'border-b-2 border-brand-600 text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Recording
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Communication Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'summary' && (
                <div>
                  {/* Maintenance Details */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Maintenance Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Unit</p>
                        <p className="font-medium">{selectedCommunication.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Community</p>
                        <p className="font-medium">{selectedCommunication.community}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium">{selectedCommunication.category.charAt(0).toUpperCase() + selectedCommunication.category.slice(1)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <Badge className={getStatusColor(selectedCommunication.status)}>
                          {getStatusDisplayName(selectedCommunication.status)}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Communication Channel</p>
                        <p className="font-medium flex items-center gap-1">
                          {getChannelIcon(selectedCommunication.channel || 'sms')}
                          <span>{getChannelDisplayName(selectedCommunication.channel || 'sms')}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{new Date(selectedCommunication.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Communication Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Communication Summary</h4>
                    <p>{selectedCommunication.message}</p>
                  </div>
                  
                  {/* Action Items */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Action Items</h4>
                    <ul className="list-disc list-inside">
                      {selectedCommunication.status === 'urgent' && (
                        <>
                          <li>Visit property immediately to assess damage</li>
                          <li>Confirm extent of repairs needed</li>
                          <li>Update tenant on timeline for resolution</li>
                        </>
                      )}
                      {selectedCommunication.status === 'scheduled' && (
                        <>
                          <li>Confirm appointment with tenant</li>
                          <li>Prepare necessary materials and tools</li>
                          <li>Document completion of maintenance task</li>
                        </>
                      )}
                      {selectedCommunication.status === 'completed' && (
                        <>
                          <li>Verify tenant satisfaction</li>
                          <li>Update maintenance log</li>
                          <li>Schedule follow-up if necessary</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'transcript' && (
                <div>
                  {selectedCommunication.transcript.split('\n').map((line, index) => {
                    const isAI = line.startsWith('AI:');
                    const content = line.replace(/^(AI:|.*?:)/, '').trim();
                    
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
                              {isAI ? 'AI Agent' : selectedCommunication.tenantName}
                            </span>
                          </div>
                          <div>{content}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {activeTab === 'conversation' && selectedCommunication.channel === 'phone' && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-center">
                    <Phone className="h-12 w-12 mx-auto mb-3 text-brand-300" />
                    <p className="mb-4">Call recording with {selectedCommunication.tenantName}</p>
                    
                    {/* Simple Audio Player */}
                    <div className="mt-4">
                      {(() => {
                        // Generate audio file path based on tenant name
                        const names = selectedCommunication.tenantName.toLowerCase().split(' ');
                        const firstName = names[0];
                        const lastName = names.length > 1 ? names[names.length - 1] : '';
                        const audioPath = `phone_calls/mock_tenant_communications/maintenance/${firstName}_${lastName}.m4a`;
                        
                        return (
                          <SimpleAudioPlayer audioSrc={audioPath} />
                        );
                      })()}
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-4">
                      Recorded on {new Date(selectedCommunication.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Bot className="h-12 w-12 mx-auto mb-3 text-brand-300" />
              <p>Select a communication to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperintendentCommunicationAIConsole; 