
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'danger';
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
  variant = 'default',
  className
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'warning':
        return 'bg-amber-500 hover:bg-amber-600 text-white';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'outline':
        return 'bg-transparent border border-primary text-primary hover:bg-primary/10';
      default:
        return 'bg-primary hover:bg-primary/90 text-white';
    }
  };

  return (
    <Button
      className={cn(
        'btn-large flex items-center justify-center gap-2',
        getVariantStyles(),
        className
      )}
      onClick={onClick}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{label}</span>
    </Button>
  );
};

export default ActionButton;
