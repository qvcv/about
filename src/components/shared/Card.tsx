import React, { forwardRef } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-black/50 backdrop-blur-sm rounded-xl border border-gray-700/50 transition-all duration-300 ${className}`}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;