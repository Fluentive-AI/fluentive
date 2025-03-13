import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  mockOccupancyTrendData, 
  mockRenewalsTrendData,
  mockDelinquencyTrendData
} from '@/data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { MessageCircle, Users, Building, Wrench, BarChart, PieChart, LineChart as LineChartIcon, Table as TableIcon, X, Plus } from 'lucide-react';
import SimpleLineChart from '@/components/dashboard/SimpleLineChart';
import SimpleBarChart from '@/components/dashboard/SimpleBarChart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ReportsPage = () => {
  const [selectedMarket, setSelectedMarket] = useState('Average');
  const [activeTab, setActiveTab] = useState('occupancy');
  const [mainTab, setMainTab] = useState('leasing');
  const [agentPrompt, setAgentPrompt] = useState('');
  const [agentResponses, setAgentResponses] = useState<{question: string, answer: string}[]>([]);
  
  const [leasingCards, setLeasingCards] = useState([
    { id: 1, title: 'Occupancy Rate', type: 'line', kpi: 'occupancy', timeframe: 'year', market: 'all' },
    { id: 2, title: 'Leasing Velocity', type: 'bar', kpi: 'leasing-velocity', timeframe: 'quarter', market: 'all' }
  ]);
  
  const [operationsCards, setOperationsCards] = useState([
    { id: 1, title: 'Rent Collection', type: 'line', kpi: 'rent-collection', timeframe: 'year', market: 'all' },
    { id: 2, title: 'Delinquency Rate', type: 'bar', kpi: 'delinquency', timeframe: 'quarter', market: 'all' }
  ]);
  
  const [maintenanceCards, setMaintenanceCards] = useState([
    { id: 1, title: 'Work Order Resolution Time', type: 'line', kpi: 'resolution-time', timeframe: 'year', market: 'all' },
    { id: 2, title: 'Work Orders by Type', type: 'pie', kpi: 'work-order-types', timeframe: 'quarter', market: 'all' }
  ]);
  
  const [addCardDialogOpen, setAddCardDialogOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardKpi, setNewCardKpi] = useState('occupancy');
  const [newCardType, setNewCardType] = useState('line');
  const [newCardTimeframe, setNewCardTimeframe] = useState('month');
  const [newCardMarket, setNewCardMarket] = useState('all');
  
  const formatYAxis = (value: number) => `${value}%`;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toFixed(1)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleAgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentPrompt.trim()) return;
    
    const newResponse = {
      question: agentPrompt,
      answer: "I'm analyzing the data from your property management system. Based on the reports, the occupancy rate has been trending upward over the last quarter with a 2.3% increase. The highest performing market is Atlanta with a 94.8% occupancy rate. Would you like me to provide more specific insights on any particular KPI or market?"
    };
    
    setAgentResponses([...agentResponses, newResponse]);
    setAgentPrompt('');
  };

  const handleCardTypeChange = (cardId: number, tabName: string, newType: string) => {
    if (tabName === 'leasing') {
      setLeasingCards(leasingCards.map(card => 
        card.id === cardId ? { ...card, type: newType } : card
      ));
    } else if (tabName === 'operations') {
      setOperationsCards(operationsCards.map(card => 
        card.id === cardId ? { ...card, type: newType } : card
      ));
    } else if (tabName === 'maintenance') {
      setMaintenanceCards(maintenanceCards.map(card => 
        card.id === cardId ? { ...card, type: newType } : card
      ));
    }
  };

  const handleDeleteCard = (cardId: number, tabName: string) => {
    if (tabName === 'leasing') {
      setLeasingCards(leasingCards.filter(card => card.id !== cardId));
    } else if (tabName === 'operations') {
      setOperationsCards(operationsCards.filter(card => card.id !== cardId));
    } else if (tabName === 'maintenance') {
      setMaintenanceCards(maintenanceCards.filter(card => card.id !== cardId));
    }
    toast.success("Card removed successfully");
  };

  const handleAddNewCard = () => {
    if (!newCardTitle.trim()) {
      toast.error("Please enter a title for the new card");
      return;
    }
    
    const newCard = {
      id: Date.now(),
      title: newCardTitle,
      type: newCardType,
      kpi: newCardKpi,
      timeframe: newCardTimeframe,
      market: newCardMarket
    };
    
    if (mainTab === 'leasing') {
      setLeasingCards([...leasingCards, newCard]);
    } else if (mainTab === 'operations') {
      setOperationsCards([...operationsCards, newCard]);
    } else if (mainTab === 'maintenance') {
      setMaintenanceCards([...maintenanceCards, newCard]);
    }
    
    setNewCardTitle('');
    setNewCardKpi('occupancy');
    setNewCardType('line');
    setNewCardTimeframe('month');
    setNewCardMarket('all');
    setAddCardDialogOpen(false);
    
    toast.success("New card added successfully");
  };

  const renderCardContent = (card: any) => {
    switch (card.type) {
      case 'line':
        return (
          <SimpleLineChart 
            data={card.kpi === 'occupancy' ? mockOccupancyTrendData : 
                  card.kpi === 'delinquency' ? mockDelinquencyTrendData : 
                  mockRenewalsTrendData} 
            title={card.title}
            yAxisLabel={card.kpi.includes('time') ? 'Days' : '%'}
          />
        );
      case 'bar':
        return (
          <SimpleBarChart 
            data={card.kpi === 'occupancy' ? mockOccupancyTrendData : 
                  card.kpi === 'delinquency' ? mockDelinquencyTrendData : 
                  mockRenewalsTrendData}
            title={card.title}
            yAxisLabel={card.kpi.includes('time') ? 'Days' : '%'}
          />
        );
      case 'pie':
        return (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-muted-foreground">Pie chart visualization coming soon</p>
          </div>
        );
      case 'table':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockOccupancyTrendData.slice(0, 5).map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.Average}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index > 0 ? `${(item.Average - mockOccupancyTrendData[index-1].Average).toFixed(1)}%` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  const renderCardControls = (card: any, tabName: string) => {
    return (
      <div className="flex flex-wrap gap-2 mt-2 p-2 bg-gray-50 rounded">
        <div className="flex flex-col space-y-1">
          <label className="text-xs text-gray-500">Type</label>
          <ToggleGroup type="single" value={card.type} onValueChange={(value) => value && handleCardTypeChange(card.id, tabName, value)}>
            <ToggleGroupItem value="line" aria-label="Line Chart">
              <LineChartIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="bar" aria-label="Bar Chart">
              <BarChart className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="pie" aria-label="Pie Chart">
              <PieChart className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Table">
              <TableIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="flex flex-col space-y-1">
          <label className="text-xs text-gray-500">Timeframe</label>
          <Select value={card.timeframe} onValueChange={(value) => {
            const updateCard = (cards: typeof leasingCards) => 
              cards.map(c => c.id === card.id ? {...c, timeframe: value} : c);
            
            if (tabName === 'leasing') setLeasingCards(updateCard(leasingCards));
            else if (tabName === 'operations') setOperationsCards(updateCard(operationsCards));
            else if (tabName === 'maintenance') setMaintenanceCards(updateCard(maintenanceCards));
          }}>
            <SelectTrigger className="w-28 h-8">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col space-y-1">
          <label className="text-xs text-gray-500">Market</label>
          <Select value={card.market} onValueChange={(value) => {
            const updateCard = (cards: typeof leasingCards) => 
              cards.map(c => c.id === card.id ? {...c, market: value} : c);
            
            if (tabName === 'leasing') setLeasingCards(updateCard(leasingCards));
            else if (tabName === 'operations') setOperationsCards(updateCard(operationsCards));
            else if (tabName === 'maintenance') setMaintenanceCards(updateCard(maintenanceCards));
          }}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue placeholder="Market" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Markets</SelectItem>
              <SelectItem value="atlanta">Atlanta</SelectItem>
              <SelectItem value="tampa">Tampa</SelectItem>
              <SelectItem value="orlando">Orlando</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Market:</span>
          <Select value={selectedMarket} onValueChange={setSelectedMarket}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Market" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Average">All Markets (Average)</SelectItem>
              <SelectItem value="Atlanta">Atlanta</SelectItem>
              <SelectItem value="Tampa">Tampa</SelectItem>
              <SelectItem value="Jacksonville">Jacksonville</SelectItem>
              <SelectItem value="Orlando">Orlando</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <ToggleGroup 
        type="single" 
        value={mainTab} 
        onValueChange={(value) => value && setMainTab(value)}
        className="justify-start border-b pb-2 w-full"
      >
        <ToggleGroupItem value="agent" aria-label="Ask our Agent" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          <span>Ask our Agent</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="leasing" aria-label="Leasing" className="gap-2">
          <Users className="h-4 w-4" />
          <span>Leasing</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="operations" aria-label="Property Operations" className="gap-2">
          <Building className="h-4 w-4" />
          <span>Property Operations</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="maintenance" aria-label="Maintenance" className="gap-2">
          <Wrench className="h-4 w-4" />
          <span>Maintenance</span>
        </ToggleGroupItem>
      </ToggleGroup>
      
      {mainTab === 'agent' && (
        <Card>
          <CardHeader>
            <CardTitle>Ask our Property Operations Agent</CardTitle>
            <CardDescription>Ask questions about your property data and get AI-powered insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex-1 overflow-y-auto max-h-[400px] space-y-4">
                {agentResponses.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No conversations yet. Ask a question to get started.</p>
                  </div>
                ) : (
                  agentResponses.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="font-medium">You:</p>
                        <p>{item.question}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-medium">AI Agent:</p>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <form onSubmit={handleAgentSubmit} className="flex space-x-2">
                <Input 
                  value={agentPrompt}
                  onChange={(e) => setAgentPrompt(e.target.value)}
                  placeholder="Ask a question about your property data..."
                  className="flex-1"
                />
                <Button type="submit">Ask</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
      
      {mainTab === 'leasing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leasingCards.map((card) => (
            <Card key={card.id}>
              <CardHeader className="pb-2 relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 top-4 h-6 w-6 rounded-full" 
                  onClick={() => handleDeleteCard(card.id, 'leasing')}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardTitle>{card.title}</CardTitle>
                {renderCardControls(card, 'leasing')}
              </CardHeader>
              <CardContent>
                {renderCardContent(card)}
              </CardContent>
            </Card>
          ))}
          <Card className="border-dashed flex items-center justify-center h-48">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setAddCardDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add new card
            </Button>
          </Card>
        </div>
      )}
      
      {mainTab === 'operations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {operationsCards.map((card) => (
            <Card key={card.id}>
              <CardHeader className="pb-2 relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 top-4 h-6 w-6 rounded-full" 
                  onClick={() => handleDeleteCard(card.id, 'operations')}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardTitle>{card.title}</CardTitle>
                {renderCardControls(card, 'operations')}
              </CardHeader>
              <CardContent>
                {renderCardContent(card)}
              </CardContent>
            </Card>
          ))}
          <Card className="border-dashed flex items-center justify-center h-48">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setAddCardDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add new card
            </Button>
          </Card>
        </div>
      )}
      
      {mainTab === 'maintenance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {maintenanceCards.map((card) => (
            <Card key={card.id}>
              <CardHeader className="pb-2 relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 top-4 h-6 w-6 rounded-full" 
                  onClick={() => handleDeleteCard(card.id, 'maintenance')}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardTitle>{card.title}</CardTitle>
                {renderCardControls(card, 'maintenance')}
              </CardHeader>
              <CardContent>
                {renderCardContent(card)}
              </CardContent>
            </Card>
          ))}
          <Card className="border-dashed flex items-center justify-center h-48">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setAddCardDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add new card
            </Button>
          </Card>
        </div>
      )}
      
      {mainTab === 'legacy' && (
        <Tabs defaultValue="occupancy" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="occupancy">Occupancy Rate</TabsTrigger>
            <TabsTrigger value="renewals">Renewals</TabsTrigger>
            <TabsTrigger value="delinquency">Delinquency</TabsTrigger>
          </TabsList>
          
          <TabsContent value="occupancy">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Rate Trend</CardTitle>
                <CardDescription>Monthly occupancy rates over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mockOccupancyTrendData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[90, 95]} tickFormatter={formatYAxis} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey={selectedMarket}
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="renewals">
            <Card>
              <CardHeader>
                <CardTitle>Renewals Trend</CardTitle>
                <CardDescription>Monthly renewal rates over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mockRenewalsTrendData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[65, 75]} tickFormatter={formatYAxis} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey={selectedMarket}
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="delinquency">
            <Card>
              <CardHeader>
                <CardTitle>Delinquency Trend</CardTitle>
                <CardDescription>Monthly delinquency rates over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mockDelinquencyTrendData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[2, 4]} tickFormatter={formatYAxis} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey={selectedMarket}
                        stroke="#dc2626"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      <Dialog open={addCardDialogOpen} onOpenChange={setAddCardDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Report Card</DialogTitle>
            <DialogDescription>
              Create a new card to visualize your property data.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-title" className="text-right">
                Title
              </Label>
              <Input
                id="card-title"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Card title"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-kpi" className="text-right">
                KPI
              </Label>
              <Select value={newCardKpi} onValueChange={setNewCardKpi}>
                <SelectTrigger id="card-kpi" className="col-span-3">
                  <SelectValue placeholder="Select KPI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="occupancy">Occupancy Rate</SelectItem>
                  <SelectItem value="leasing-velocity">Leasing Velocity</SelectItem>
                  <SelectItem value="rent-collection">Rent Collection</SelectItem>
                  <SelectItem value="delinquency">Delinquency Rate</SelectItem>
                  <SelectItem value="resolution-time">Work Order Resolution Time</SelectItem>
                  <SelectItem value="work-order-types">Work Order Types</SelectItem>
                  <SelectItem value="renewals">Renewal Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-type" className="text-right">
                Visualization
              </Label>
              <Select value={newCardType} onValueChange={setNewCardType}>
                <SelectTrigger id="card-type" className="col-span-3">
                  <SelectValue placeholder="Select visualization type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="table">Table</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-timeframe" className="text-right">
                Timeframe
              </Label>
              <Select value={newCardTimeframe} onValueChange={setNewCardTimeframe}>
                <SelectTrigger id="card-timeframe" className="col-span-3">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card-market" className="text-right">
                Market
              </Label>
              <Select value={newCardMarket} onValueChange={setNewCardMarket}>
                <SelectTrigger id="card-market" className="col-span-3">
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Markets</SelectItem>
                  <SelectItem value="atlanta">Atlanta</SelectItem>
                  <SelectItem value="tampa">Tampa</SelectItem>
                  <SelectItem value="orlando">Orlando</SelectItem>
                  <SelectItem value="jacksonville">Jacksonville</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCardDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNewCard}>
              Add Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsPage;
