import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import Card from './shared/Card';

interface MusicPlayerProps {
  volume: number;
  isMuted: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ volume, isMuted }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioSource = 'https://cdn.discordapp.com/attachments/1171211624640688168/1371095002154795019/RAP_MUSIC_PROD._WENDIGO.mp3?ex=6821e33a&is=682091ba&hm=0d83ee580b970254641878073ee05d3d14a10cc163f0ba8eca3bf6a089e41786&';
  const songTitle = 'RAP MUSIC';
  const artistName = 'LIL DARKIE PROD. WENDIGO';
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setProgress(value);
    if (audioRef.current) {
      const time = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCurrentTime = () => {
    return audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00';
  };

  const getTotalTime = () => {
    return audioRef.current ? formatTime(audioRef.current.duration) : '0:00';
  };

  return (
    <Card className="p-4 w-full max-w-[600px] mx-auto bg-transparent backdrop-blur-md">
      <audio ref={audioRef} src={audioSource} />
      <div className="flex flex-col">
        <div className="mb-3">
          <div className="text-lg md:text-xl font-bold text-glow-subtle">Currently Playing</div>
          <div className="flex flex-col">
            <div className="text-base md:text-lg font-medium text-white truncate transition-all text-glow-subtle duration-300">
              {songTitle}
            </div>
            <div className="text-sm md:text-base text-gray-200 truncate transition-all text-glow-subtle duration-300">
              {artistName}
            </div>
          </div>
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
              <span className="text-xs text-gray-400">{getCurrentTime()}</span>
              <span className="text-xs text-gray-400">{getTotalTime()}</span>
            </div>
          </div>
  
          <div className="flex items-center space-x-3">
            <button 
              className="p-2 text-gray-600 hover:text-white transition-colors duration-300"
              aria-label="Previous track"
            >
              <SkipBack size={20} />
            </button>
  
            <button 
              className="p-3 text-gray-600 hover:text-white rounded-full text-white transition-colors duration-300"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
  
            <button 
              className="p-2 text-gray-600 hover:text-white transition-colors duration-300"
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