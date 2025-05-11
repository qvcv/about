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
        className={`bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-700/50 transition-all duration-300 ${className}`}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;