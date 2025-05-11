import React, { useState } from 'react';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import Card from './shared/Card';

const VolumeControl: React.FC = () => {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={18} />;
    if (volume < 30) return <Volume size={18} />;
    if (volume < 70) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="p-3">
        <button
          onClick={toggleMute}
          className="text-gray-400 hover:text-white transition-colors duration-300"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {getVolumeIcon()}
        </button>
      </Card>
      
      {isHovered && (
        <Card className="absolute left-0 top-full mt-2 px-4 py-3 flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{ '--percent': `${isMuted ? 0 : volume}%` } as React.CSSProperties}
            aria-label="Master volume control"
          />
        </Card>
      )}
    </div>
  );
};

export default VolumeControl;