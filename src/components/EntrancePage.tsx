import React from 'react';

interface EntrancePageProps {
  onEnter: () => void;
}

const EntrancePage: React.FC<EntrancePageProps> = ({ onEnter }) => {
  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-60 cursor-pointer transition-all duration-700 ease-in-out"
      onClick={onEnter}
    >
      <div className="text-5xl font-bold text-white hover:text-gray-300 transition-colors duration-300 animate-pulse">
        enter
      </div>
    </div>
  );
};

export default EntrancePage;