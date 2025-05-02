
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { MenuIcon } from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  onMenuClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-primary text-white p-4 flex items-center justify-between shadow-md">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onMenuClick}
        className="text-white hover:bg-primary/90"
      >
        <MenuIcon className="h-6 w-6" />
      </Button>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="w-10"></div> {/* Espaço para balancear o layout */}
    </header>
  );
};

export default MobileHeader;
