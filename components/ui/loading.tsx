import { cn } from '@/lib/utils';
import { Scissors } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loading = ({ size = 'md', className }: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="relative">
        <div className={cn(
          'border-4 border-gray-200 border-t-yellow-400 rounded-full animate-spin',
          sizeClasses[size]
        )}></div>
        <Scissors className={cn(
          'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-600',
          size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'
        )} />
      </div>
    </div>
  );
};