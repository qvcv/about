import React, { useState } from 'react';

interface EntrancePageProps {
  onEnter: () => void;
}

const EntrancePage: React.FC<EntrancePageProps> = ({ onEnter }) => {
  const [isFading, setIsFading] = useState(false);

  const handleClick = () => {
    // Trigger fade-out effect
    setIsFading(true);
    // Call the onEnter function after the fade-out transition ends
    setTimeout(onEnter, 700); // Duration matches the fade-out time (700ms)
  };

  return (
    <div 
      className={`flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-60 cursor-pointer transition-all duration-700 ease-in-out ${isFading ? 'opacity-0' : ''}`}
      onClick={handleClick}
    >
      <div className="text-5xl font-bold text-white hover:text-gray-300 transition-colors duration-300 animate-pulse">
        enter
      </div>
    </div>
  );
};

export default EntrancePage;
