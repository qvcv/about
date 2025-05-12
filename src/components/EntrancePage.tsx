import React, { useState } from 'react';

interface EntrancePageProps {
  onEnter: () => void;
  visible: boolean;
}

const EntrancePage: React.FC<EntrancePageProps> = ({ onEnter, visible }) => {
  const [isFading, setIsFading] = useState(false);
  const backgroundImage = 'https://images.hdqwalls.com/wallpapers/dark-night-mountains-minimalist-4k-o4.jpg';

  const handleClick = () => {
    setIsFading(true);
    setTimeout(onEnter, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
        isFading || !visible ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} />
      <div className="text-5xl font-bold text-white hover:text-gray-300 transition-colors duration-300 animate-pulse relative z-10">
        enter
      </div>
    </div>
  );
};

export default EntrancePage;
