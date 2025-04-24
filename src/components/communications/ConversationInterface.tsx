import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CommunicationTypeFilter from './CommunicationTypeFilter';
import ScenarioFilter from './ScenarioFilter';
import AIAgentConsole from './AIAgentConsole';
import CommunicationsAnalytics from './CommunicationsAnalytics';
import { AIConversation } from '@/types/index';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';

interface ConversationInterfaceProps {
  conversations: AIConversation[];
  scenarioCategories: any[];
  defaultTab?: string;
}

const ConversationInterface: React.FC<ConversationInterfaceProps> = ({
  conversations,
  scenarioCategories,
  defaultTab = 'console'
}) => {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [selectedCommTypes, setSelectedCommTypes] = useState<string[]>([]);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  
  // Filter conversations based on selected filters
  const filteredConversations = conversations.filter(conversation => {
    // Filter by scenario
    if (selectedScenarios.length > 0) {
      const matchesScenario = selectedScenarios.some(selectedScenario => 
        conversation.scenario?.toLowerCase().includes(selectedScenario.toLowerCase())
      );
      if (!matchesScenario) return false;
    }
    
    // Filter by communication type
    if (selectedCommTypes.length > 0 && !selectedCommTypes.includes(conversation.channel)) {
      return false;
    }

    // Filter by market
    if (selectedMarkets.length > 0 && !selectedMarkets.includes(conversation.market)) {
      return false;
    }
    
    return true;
  });

  return (
    <Card>
      <Tabs defaultValue={defaultTab} className="w-full">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <TabsList>
              <TabsTrigger value="console">Agent Console</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap gap-2 items-center">
              {/* Communication Type Filter */}
              <CommunicationTypeFilter 
                selectedValues={selectedCommTypes}
                onChange={setSelectedCommTypes}
              />
              
              {/* Market Filter */}
              <MarketCommunityFilter 
                selectedValues={selectedMarkets}
                onChange={setSelectedMarkets}
              />
              
              {/* Scenario Filter */}
              <ScenarioFilter 
                options={scenarioCategories}
                selectedValues={selectedScenarios}
                onChange={setSelectedScenarios}
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 max-h-[calc(100vh-12rem)] overflow-y-auto">
          <TabsContent value="console" className="overflow-hidden">
            <AIAgentConsole 
              conversations={filteredConversations} 
              activeDepartment="all"
              activeView="all"
              searchQuery=""
              marketFilters={selectedMarkets}
              leasingTopicFilters={[]}
              statusFilters={[]}
              maintenanceTopicFilters={[]}
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="overflow-hidden">
            <CommunicationsAnalytics conversations={filteredConversations} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default ConversationInterface; 