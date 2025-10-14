import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';
import { ReactNode, useRef } from 'react';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export function Parallax({
  children,
  className,
  speed = 0.5,
  direction = 'up',
  distance = 100
}: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const transformValue = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [0, -distance * speed] :
    direction === 'down' ? [0, distance * speed] :
    direction === 'left' ? [0, -distance * speed] :
    [0, distance * speed]
  );

  const transformStyle = {
    [direction === 'up' || direction === 'down' ? 'y' : 'x']: transformValue
  };

  return (
    <motion.div
      ref={ref}
      style={transformStyle}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
}
