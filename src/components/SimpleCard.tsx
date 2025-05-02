
import React from 'react';
import { cn } from '@/lib/utils';

interface SimpleCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const SimpleCard: React.FC<SimpleCardProps> = ({ title, children, className }) => {
  return (
    <div className={cn('card-simple', className)}>
      {title && <h3 className="text-lg font-bold mb-3">{title}</h3>}
      {children}
    </div>
  );
};

export default SimpleCard;
