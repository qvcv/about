import React, { useState } from 'react';

interface EntrancePageProps {
  onEnter: () => void;
}

const EntrancePage: React.FC<EntrancePageProps> = ({ onEnter }) => {
  const [isFading, setIsFading] = useState(false);

  const handleClick = () => {
    setIsFading(true);
    setTimeout(onEnter, 700);
  };

  return (
    <div 
      className={`flex items-center justify-center min-h-screen cursor-pointer transition-opacity duration-700 ease-in-out bg-black/50 backdrop-blur-md ${isFading ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClick}
    >
      <div className="text-5xl font-bold text-white hover:text-gray-300 transition-colors duration-300 animate-pulse">
        enter
      </div>
    </div>
  );
};

export default EntrancePage;
