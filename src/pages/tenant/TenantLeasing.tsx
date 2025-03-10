
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar, ClipboardCheck, PenTool, MapPin } from 'lucide-react';

interface TenantLeasingProps {
  scenario: 'lead' | 'application' | 'signing' | 'premove' | 'onboarding';
}

const TenantLeasing = ({ scenario }: TenantLeasingProps) => {
  const renderScenarioContent = () => {
    switch (scenario) {
      case 'lead':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Apartment Inquiry
            </h3>
            <p className="text-sm">
              I'm interested in learning more about your 2-bedroom apartments.
              What floor plans are available and what is the price range?
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>Do you have any available units with a balcony?</li>
                <li>What amenities are included in the rent?</li>
                <li>How do I schedule a tour of the property?</li>
                <li>Are utilities included in the monthly rent?</li>
              </ul>
            </div>
          </div>
        );
      
      case 'application':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <ClipboardCheck className="h-5 w-5 mr-2" />
              Application Process
            </h3>
            <p className="text-sm">
              I've started my application but I'm not sure what documents I need to provide.
              Can you help me complete my application?
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>What income verification do you accept?</li>
                <li>How long does the approval process take?</li>
                <li>What credit score is required to qualify?</li>
                <li>Can I add a co-signer to my application?</li>
              </ul>
            </div>
          </div>
        );
      
      case 'signing':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <PenTool className="h-5 w-5 mr-2" />
              Lease Signing
            </h3>
            <p className="text-sm">
              I've been approved and need to sign my lease. What are the next steps 
              and how do I pay my security deposit?
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>How much is the security deposit?</li>
                <li>What payment methods do you accept?</li>
                <li>Can I review the lease before signing?</li>
                <li>When will I receive my move-in instructions?</li>
              </ul>
            </div>
          </div>
        );
      
      case 'premove':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Pre-Move-in Preparation
            </h3>
            <p className="text-sm">
              My move-in date is coming up. What do I need to do to prepare, and 
              when can I pick up my keys?
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>Do I need to set up utilities before moving in?</li>
                <li>What time can I pick up my keys on move-in day?</li>
                <li>Is there a specific move-in procedure I should follow?</li>
                <li>Where do I park during move-in?</li>
              </ul>
            </div>
          </div>
        );
      
      case 'onboarding':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Tenant Onboarding
            </h3>
            <p className="text-sm">
              I've just moved in. How do I access amenities, where should I dispose
              of trash, and how do I submit maintenance requests?
            </p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500">Sample conversation starters:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>How do I get access to the fitness center?</li>
                <li>Where are the trash and recycling areas located?</li>
                <li>What's the procedure for receiving packages?</li>
                <li>How do I submit a maintenance request?</li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return <p>Select a leasing scenario from the sidebar.</p>;
    }
  };
  
  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-0">
        {renderScenarioContent()}
      </CardContent>
    </Card>
  );
};

export default TenantLeasing;
