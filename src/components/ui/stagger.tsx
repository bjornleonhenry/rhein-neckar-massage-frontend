import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  containerDelay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  once?: boolean;
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.1,
  containerDelay = 0,
  duration = 0.5,
  direction = 'up',
  once = true
}: StaggerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: containerDelay,
        staggerChildren: staggerDelay
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...(direction === 'up' && { y: 30 }),
      ...(direction === 'down' && { y: -30 }),
      ...(direction === 'left' && { x: 30 }),
      ...(direction === 'right' && { x: -30 }),
      ...(direction === 'scale' && { scale: 0.8 }),
      ...(direction === 'rotate' && { rotate: -10 })
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={cn('', className)}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
