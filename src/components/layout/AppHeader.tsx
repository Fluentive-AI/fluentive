import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  User,
  ChevronDown,
  Settings,
  LogOut,
  HardHat,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const getTitleFromPath = (pathname: string): string => {
  const pathMap: Record<string, string> = {
    '/': 'Dashboard',
    '/leads': 'Leasing',
    '/applications': 'Leasing',
    '/tenants': 'Property Operations',
    '/rent': 'Property Operations',
    '/maintenance': 'Renovation, Maintenance, and Turns',
    '/calendar': 'Renovation, Maintenance, and Turns',
    '/map': 'Renovation, Maintenance, and Turns',
    '/communications': 'AI Communications',
    '/reports': 'Analytics',
    '/settings': 'Settings',
    '/agent': 'My Day',
    '/agent/leads': 'Leads & Tours',
    '/agent/applications': 'Applications',
    '/agent/calendar': 'Calendar',
    '/agent/settings': 'Settings',
  };
  
  return pathMap[pathname] || 'Dashboard';
};

const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const title = getTitleFromPath(location.pathname);
  const [profileSwitcherOpen, setProfileSwitcherOpen] = useState(false);
  
  const isLeasingAgentView = location.pathname.startsWith('/agent');
  
  const handleSwitchToLeasingAgent = () => {
    navigate('/agent');
    setProfileSwitcherOpen(false);
  };
  
  const handleSwitchToAdmin = () => {
    navigate('/dashboard');
    setProfileSwitcherOpen(false);
  };
  
  const handleSwitchToSuperintendent = () => {
    navigate('/super');
    setProfileSwitcherOpen(false);
  };
  
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background fixed top-0 left-64 right-0 z-10">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 py-2 pr-4 border border-input rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              {isLeasingAgentView ? (
                <>
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <Users className="h-4 w-4" />
                  </div>
                  <span>Sarah Parker</span>
                </>
              ) : (
                <>
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <User className="h-4 w-4" />
                  </div>
                  <span>Admin</span>
                </>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setProfileSwitcherOpen(true)}>
              Switch Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Dialog open={profileSwitcherOpen} onOpenChange={setProfileSwitcherOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Switch Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div 
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 cursor-pointer"
              onClick={handleSwitchToAdmin}
            >
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <User className="h-6 w-6" />
              </div>
              <div>
                <div className="font-medium">Admin</div>
                <div className="text-sm text-gray-500">Property Manager</div>
              </div>
            </div>
            
            <div 
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 cursor-pointer"
              onClick={handleSwitchToSuperintendent}
            >
              <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <HardHat className="h-6 w-6" />
              </div>
              <div>
                <div className="font-medium">Mike Johnson</div>
                <div className="text-sm text-gray-500">Superintendent</div>
              </div>
            </div>

            <div 
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 cursor-pointer"
              onClick={handleSwitchToLeasingAgent}
            >
              <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <div className="font-medium">Sarah Parker</div>
                <div className="text-sm text-gray-500">Leasing Agent</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default AppHeader;
