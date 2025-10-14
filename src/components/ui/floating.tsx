import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FloatingProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  intensity?: 'low' | 'medium' | 'high';
  direction?: 'up' | 'down' | 'left' | 'right' | 'circular';
}

export function Floating({
  children,
  className,
  duration = 3,
  intensity = 'medium',
  direction = 'up'
}: FloatingProps) {
  const intensities = {
    low: 10,
    medium: 20,
    high: 30
  };

  const getAnimation = () => {
    const distance = intensities[intensity];

    switch (direction) {
      case 'up':
        return {
          y: [-distance, distance],
        };
      case 'down':
        return {
          y: [distance, -distance],
        };
      case 'left':
        return {
          x: [-distance, distance],
        };
      case 'right':
        return {
          x: [distance, -distance],
        };
      case 'circular':
        return {
          x: [-distance, distance, -distance],
          y: [0, distance, 0],
        };
      default:
        return {
          y: [-distance, distance],
        };
    }
  };

  return (
    <motion.div
      animate={getAnimation()}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      }}
      className={cn('', className)}
    >
      {children}
    </motion.div>
  );
}
