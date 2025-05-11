import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import Card from './shared/Card';

interface MusicPlayerProps {
  volume: number;
  isMuted: boolean;
}

interface AudioMetadata {
  title: string;
  artist: string;
  album?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ volume, isMuted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [metadata, setMetadata] = useState<AudioMetadata>({ 
    title: 'Loading...', 
    artist: 'Loading...' 
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  // Path to your audio file in the public folder
  const audioSource = '/audios/ANXIETY - Lil Darkie.mp3'; // Make sure this is correct
  
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
      
      // Try to extract metadata from audio element
      extractMetadata(audio);
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
  }, [audioSource]);

  const extractMetadata = (audio: HTMLAudioElement) => {
    // Default metadata from filename
    let extractedTitle = 'Unknown Title';
    let extractedArtist = 'Unknown Artist';
    
    try {
      // Try to get metadata from MediaSession API if available
      if ('mediaSession' in navigator && audio.src) {
        const mediaMetadata = navigator.mediaSession.metadata;
        if (mediaMetadata) {
          if (mediaMetadata.title) extractedTitle = mediaMetadata.title;
          if (mediaMetadata.artist) extractedArtist = mediaMetadata.artist;
        }
      }
      
      // If we couldn't get metadata from MediaSession, try ID3 info
      if (extractedTitle === 'Unknown Title' && audio.src) {
        // Try to get from audio's tag properties (some browsers expose these)
        if (audio.title) extractedTitle = audio.title;
        
        // Extract filename as a fallback
        if (extractedTitle === 'Unknown Title') {
          const filename = audioSource.split('/').pop()?.split('?')[0] || 'Unknown Title';
          // Remove file extension if present
          extractedTitle = filename.replace(/\.[^/.]+$/, "");
        }
      }
      
      // Update metadata state
      setMetadata({
        title: extractedTitle,
        artist: extractedArtist
      });

      // Set media session metadata for system integration
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: extractedTitle,
          artist: extractedArtist,
          artwork: [
            { src: '/audio/artwork.jpg', sizes: '512x512', type: 'image/jpeg' }
          ]
        });
      }
    } catch (error) {
      console.error('Error extracting metadata:', error);
      // Fallback to basic filename extraction
      const filename = audioSource.split('/').pop()?.split('?')[0] || 'Unknown Title';
      setMetadata({
        title: filename.replace(/\.[^/.]+$/, ""),
        artist: 'Unknown Artist'
      });
    }
  };

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
    <Card className="p-4 w-[600px] mx-auto bg-transparent backdrop-blur-md">
      <audio ref={audioRef} src={audioSource} />
      <div className="flex flex-col">
        <div className="mb-3">
          <div className="text-lg font-medium text-glow-subtle">Currently Playing</div>
          <div className="flex flex-col">
            <div className="text-base font-medium text-white truncate transition-all duration-300">
              {metadata.title}
            </div>
            <div className="text-sm text-gray-400 truncate transition-all duration-300">
              {metadata.artist}
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