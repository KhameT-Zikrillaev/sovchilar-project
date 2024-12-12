import React from 'react';
import useCard from '../hooks/useCard';

const Card = ({ 
  children, 
  className = '',
  dragEnabled,
  parallaxEnabled,
  hoverEffects,
  clickEffect,
  ...props 
}) => {
  const { cardRef, cardStyle, handlers, isHovered } = useCard({
    dragEnabled,
    parallaxEnabled,
    hoverEffects,
    clickEffect,
  });

  return (
    <div
      ref={cardRef}
      className={`card ${className} ${isHovered ? 'hovered' : ''}`}
      style={{
        ...cardStyle,
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: isHovered 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
      {...handlers}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
