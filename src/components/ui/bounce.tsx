import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BounceProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  trigger?: 'hover' | 'click' | 'always';
  once?: boolean;
}

export function Bounce({
  children,
  className,
  intensity = 'medium',
  trigger = 'hover',
  once = false
}: BounceProps) {
  const intensities = {
    low: {
      scale: 1.05,
      y: -5,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    medium: {
      scale: 1.1,
      y: -8,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    high: {
      scale: 1.15,
      y: -12,
      transition: { type: "spring", stiffness: 500, damping: 15 }
    }
  };

  const hoverProps = trigger === 'hover' ? {
    whileHover: intensities[intensity]
  } : {};

  const tapProps = trigger === 'click' ? {
    whileTap: {
      scale: 0.95,
      y: 2,
      transition: { duration: 0.1 }
    }
  } : {};

  const alwaysProps = trigger === 'always' ? {
    animate: {
      y: [0, intensities[intensity].y, 0],
      scale: [1, intensities[intensity].scale, 1]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut"
    }
  } : {};

  return (
    <motion.div
      className={cn('', className)}
      {...hoverProps}
      {...tapProps}
      {...alwaysProps}
    >
      {children}
    </motion.div>
  );
}
