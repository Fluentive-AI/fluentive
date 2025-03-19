
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from 'lucide-react';

interface AssistantAvatarProps {
  name: string;
  imagePath?: string;
}

const AssistantAvatar = ({ name, imagePath }: AssistantAvatarProps) => {
  // Extract first letter of name for fallback
  const fallbackText = name.charAt(0);

  return (
    <Avatar className="h-20 w-20 border-2 border-gray-200">
      {imagePath ? (
        <AvatarImage src={imagePath} alt={name} />
      ) : (
        <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
          <User className="h-10 w-10" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default AssistantAvatar;
