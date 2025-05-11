import React, { useState } from 'react';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import Card from './shared/Card';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: (muted: boolean) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    onVolumeChange(newVolume);
    if (newVolume === 0) {
      onMuteToggle(true);
    } else if (isMuted) {
      onMuteToggle(false);
    }
  };

  const toggleMute = () => {
    onMuteToggle(!isMuted);
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={20} />;
    if (volume < 30) return <Volume size={20} />;
    if (volume < 70) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="flex items-center bg-white/5 backdrop-blur-md">
        <button
          onClick={toggleMute}
          className="w-10 h-10 flex items-center background-transparent justify-center text-gray-400 hover:text-white transition-colors duration-300"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {getVolumeIcon()}
        </button>
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isHovered ? 'w-32 opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <div className="px-4 py-3">
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{ '--percent': `${isMuted ? 0 : volume}%` } as React.CSSProperties}
              aria-label="Master volume control"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VolumeControl