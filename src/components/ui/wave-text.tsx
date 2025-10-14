import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface WaveTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  amplitude?: number;
}

export function WaveText({
  children,
  className,
  delay = 0,
  duration = 2,
  amplitude = 10
}: WaveTextProps) {
  const letters = children.split('');

  return (
    <div className={cn('inline-flex', className)}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [20, -amplitude, 0],
          }}
          transition={{
            duration,
            delay: delay + index * 0.1,
            repeat: Infinity,
            repeatType: "reverse" as const,
            repeatDelay: 0.1,
            ease: "easeInOut",
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
}
