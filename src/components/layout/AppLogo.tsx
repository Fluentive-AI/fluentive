import React from 'react';
import { Building2 } from 'lucide-react';

const AppLogo = () => {
  return (
    <div className="flex items-center">
      <img 
        src="/logo/logo_blue_horizontal.png" 
        alt="Homm Logo"
        className="h-16 sm:h-40 w-auto object-contain my-2" 
      />
    </div>
  );
};

export default AppLogo;
