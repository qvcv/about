import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import Card from './shared/Card';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(33);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(parseInt(e.target.value));
  };

  const formatTime = (percentage: number) => {
    const totalSeconds = (percentage / 100) * 180; // Assuming 3 minutes total
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-4 w-[800px]">
      <div className="flex flex-col">
        <div className="mb-3">
          <div className="text-lg font-medium text-glow-subtle">Currently Playing</div>
          <div className="text-sm text-gray-400">Artist - Song Title</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full"
              style={{ '--percent': `${progress}%` } as React.CSSProperties}
              aria-label="Song progress"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400">{formatTime(progress)}</span>
              <span className="text-xs text-gray-400">3:00</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Previous track"
            >
              <SkipBack size={20} />
            </button>
            
            <button 
              className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white transition-colors duration-300"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button 
              className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Next track"
            >
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MusicPlayer;