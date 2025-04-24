import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, MessageSquare, TrendingUp, MapPin, Smile, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MockLeasingConversation } from '@/types/index';

interface CommunicationsAnalyticsProps {
  marketFilters?: string[];
  conversations: MockLeasingConversation[];
  topicFilters?: string[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CommunicationsAnalytics: React.FC<CommunicationsAnalyticsProps> = ({ 
  marketFilters = [],
  conversations,
  topicFilters = []
}) => {
  const [activeTooltip, setActiveTooltip] = useState<{
    x: number;
    y: number;
    data: any;
  } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Filter conversations based on market and topic filters
  const filteredConversations = conversations.filter(conv => {
    // Market filter
    if (marketFilters.length > 0) {
      const marketCommunity = `${conv.market}/${conv.community}`;
      if (!marketFilters.includes(marketCommunity)) return false;
    }
    
    // Topic filter
    if (topicFilters.length > 0) {
      if (!topicFilters.includes(conv.category)) return false;
    }
    
    return true;
  });

  // Use filteredConversations for all calculations
  const totalConversations = filteredConversations.length;
  
  // Fixed metrics as requested
  const avgResponseTime = 20; // seconds
  const avgConversationTime = 3.5; // minutes
  const conversionRate = 0.58; // 58%
  const afterHoursPercentage = 62; // 62%
  
  // Calculate average messages per lead from transcripts
  const avgMessagesPerLead = filteredConversations.reduce((sum, conv) => {
    const messages = conv.transcript.split('\n').filter(line => line.trim() !== '');
    return sum + messages.length;
  }, 0) / totalConversations;
  
  // Calculate conversations per market
  const marketConversations = filteredConversations.reduce((acc, conv) => {
    if (conv.market) {
      acc[conv.market] = (acc[conv.market] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Predictive lead scoring data grouped into ranges
  const scoreRanges = [
    { range: '1-10', min: 1, max: 10, quality: 'low', color: '#FF6B6B' },
    { range: '11-20', min: 11, max: 20, quality: 'low', color: '#FF6B6B' },
    { range: '21-30', min: 21, max: 30, quality: 'low', color: '#FF6B6B' },
    { range: '31-40', min: 31, max: 40, quality: 'low', color: '#FF6B6B' },
    { range: '41-50', min: 41, max: 50, quality: 'low', color: '#FF6B6B' },
    { range: '51-60', min: 51, max: 60, quality: 'medium', color: '#FFBB28' },
    { range: '61-70', min: 61, max: 70, quality: 'medium', color: '#FFBB28' },
    { range: '71-80', min: 71, max: 80, quality: 'medium', color: '#FFBB28' },
    { range: '81-90', min: 81, max: 90, quality: 'high', color: '#00C49F' },
    { range: '91-100', min: 91, max: 100, quality: 'high', color: '#00C49F' }
  ];

  // Count leads in each score range and store lead details
  const leadScoringData = scoreRanges.map(range => {
    const leads = filteredConversations.filter(conv => {
      const score = conv.lead_score || Math.floor(Math.random() * 40) + 60;
      return score >= range.min && score <= range.max;
    });
    return {
      range: range.range,
      count: leads.length,
      quality: range.quality,
      color: range.color,
      leads: leads.map(lead => ({
        name: lead.prospectName,
        score: lead.lead_score || Math.floor(Math.random() * 40) + 60,
        property: lead.propertyInterest,
        market: lead.market
      }))
    };
  });

  // Filter leads by quality
  const highQualityLeads = filteredConversations.filter(conv => {
    const score = conv.lead_score || Math.floor(Math.random() * 40) + 60;
    return score >= 81;
  });

  const mediumQualityLeads = filteredConversations.filter(conv => {
    const score = conv.lead_score || Math.floor(Math.random() * 40) + 60;
    return score >= 51 && score <= 80;
  });

  const lowQualityLeads = filteredConversations.filter(conv => {
    const score = conv.lead_score || Math.floor(Math.random() * 40) + 60;
    return score <= 50;
  });
  
  // Market distribution data for pie chart
  const marketData = Object.entries(marketConversations)
    .filter(([market]) => market) // Filter out any empty or undefined markets
    .map(([market, count]) => ({
      name: market,
      value: count,
      color: getMarketColor(market)
    }));
  
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
              <h4 className="text-3xl font-bold">{totalConversations}</h4>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
              <h4 className="text-3xl font-bold">{avgResponseTime}s</h4>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Conversation Time</p>
              <h4 className="text-3xl font-bold">{avgConversationTime} min</h4>
            </div>
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <h4 className="text-3xl font-bold">{Math.round(conversionRate * 100)}%</h4>
            </div>
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
      
      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Conversations After Hours</p>
              <h4 className="text-3xl font-bold">{afterHoursPercentage}%</h4>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Messages per Lead</p>
              <h4 className="text-3xl font-bold">{Math.round(avgMessagesPerLead)}</h4>
            </div>
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Leads to Transfer</p>
              <h4 className="text-3xl font-bold">{highQualityLeads.length}</h4>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Predictive Lead Scoring */}
        <Card>
          <CardHeader>
            <CardTitle>Predictive Lead Scoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={leadScoringData}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, coordinate }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div 
                            ref={tooltipRef}
                            className="bg-white p-4 border rounded-lg shadow-lg"
                            style={{
                              position: 'absolute',
                              left: coordinate?.x || 0,
                              top: coordinate?.y || 0,
                              transform: 'translate(-100%, -50%)',
                              zIndex: 1000,
                              minWidth: '270px',
                              maxWidth: '400px'
                            }}
                          >
                            <div className="mb-2">
                              <p className="font-medium">Score Range: {data.range}</p>
                              <p className="text-sm text-gray-600">{data.count} leads</p>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                              {data.leads.map((lead, index) => (
                                <div key={index} className="border-t pt-2 mt-2">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="font-medium">{lead.name}</p>
                                      <p className="text-sm text-gray-600">Score: {lead.score}</p>
                                    </div>
                                    <button 
                                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle contact action
                                        console.log(`Contacting ${lead.name}`);
                                      }}
                                    >
                                      Contact
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" name="Number of Leads">
                    {leadScoringData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm font-medium text-green-600">High Quality Leads</p>
                <p className="text-2xl font-bold">{highQualityLeads.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-yellow-600">Medium Quality Leads</p>
                <p className="text-2xl font-bold">{mediumQualityLeads.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-red-600">Low Quality Leads</p>
                <p className="text-2xl font-bold">{lowQualityLeads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Market Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Conversations by Market</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {marketData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper function to get consistent colors for markets
const getMarketColor = (market: string): string => {
  const colors: Record<string, string> = {
    'Atlanta': '#4f46e5',
    'Tampa': '#10b981',
    'Jacksonville': '#f59e0b',
    'Orlando': '#ef4444',
    'Default': '#6b7280'
  };
  return colors[market] || colors.Default;
};

export default CommunicationsAnalytics;
