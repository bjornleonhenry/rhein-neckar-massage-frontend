import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface TextEffectProps {
  children: React.ReactNode;
  className?: string;
  per?: 'char' | 'word' | 'line';
  preset?: 'fade' | 'slide' | 'scale' | 'blur' | 'rotate';
}

export function TextEffect({
  children,
  className,
  per = 'char',
  preset = 'fade',
}: TextEffectProps) {
  const MotionComponent = motion.div;

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
    blur: {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
    },
  };

  const splitText = (text: string, per: 'char' | 'word' | 'line') => {
    switch (per) {
      case 'char':
        return text.split('');
      case 'word':
        return text.split(' ');
      case 'line':
        return text.split('\n');
      default:
        return [text];
    }
  };

  const renderAnimatedText = (text: string) => {
    if (typeof text !== 'string') {
      return text;
    }

    const elements = splitText(text, per);

    return elements.map((element, index) => (
      <MotionComponent
        key={index}
        initial={variants[preset].initial}
        animate={variants[preset].animate}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: 'easeOut',
        }}
        className="inline-block"
      >
        {element}
        {per === 'word' && index < elements.length - 1 && '\u00A0'}
      </MotionComponent>
    ));
  };

  const renderChildren = (children: React.ReactNode): React.ReactNode => {
    if (typeof children === 'string') {
      return renderAnimatedText(children);
    }

    if (React.isValidElement(children) && children.props.children) {
      return React.cloneElement(children, {
        children: renderChildren(children.props.children),
      });
    }

    if (Array.isArray(children)) {
      return children.map((child, index) => (
        <React.Fragment key={index}>
          {renderChildren(child)}
        </React.Fragment>
      ));
    }

    return children;
  };

  return (
    <div className={cn('inline-block', className)}>
      {renderChildren(children)}
    </div>
  );
}
