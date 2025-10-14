import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
  trigger?: 'always' | 'inView';
}
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 30,
  once = true,
  trigger = 'inView',
}: FadeInProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {}
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      {...(trigger === 'inView'
        ? {
            whileInView: { opacity: 1, x: 0, y: 0 },
            viewport: { once },
          }
        : {
            animate: { opacity: 1, x: 0, y: 0 },
          })}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={cn('', className)}
    >
      {children}
    </motion.div>
  );
}
