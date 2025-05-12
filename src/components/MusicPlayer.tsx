import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import Card from './shared/Card';

interface Song {
  url: string;
  title: string;
  artist: string;
}

interface MusicPlayerProps {
  volume: number;
  isMuted: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ volume, isMuted }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeAnimationRef = useRef<number>();
  const wasPlayingBeforeSkip = useRef(true);

  const [playlist] = useState<Song[]>([
    {
      url: 'https://cdn.discordapp.com/attachments/1171211624640688168/1371536470879244378/Ken_Carson_-_Ghoul_Slowed.mp3?ex=68237e60&is=68222ce0&hm=7869ec83149baf28fc5d1ae29325809271f5315218cc974fb2cec784c49c6080&',
      title: 'GHOUL',
      artist: 'Ken carson'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/1171211624640688168/1371212259480702998/Bandit.mp3?ex=6822f92e&is=6821a7ae&hm=25f5f0dc1e290d1220d7d0b55e3b41dcafb67886475a31f22462c94360ea3932&',
      title: 'BANDIT',
      artist: 'Don Toliver'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/1171211624640688168/1371212260235677886/Timeless.mp3?ex=6822f92e&is=6821a7ae&hm=8c70237e57d0a5d17f845ba064b73f7c123164362adc58ccf48444fd357260d9&',
      title: 'TIMELESS',
      artist: 'The Weeknd & Playboi Carti'
    }
  ]);


  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0;
    
    const fadeDuration = 2000;
    const startTime = performance.now();
    const targetVolume = volume / 100;

    const fadeAudio = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / fadeDuration, 1);
      audio.volume = progress * targetVolume;

      if (progress < 1) {
        fadeAnimationRef.current = requestAnimationFrame(fadeAudio);
      }
    };

    audio.play();
    fadeAnimationRef.current = requestAnimationFrame(fadeAudio);

    return () => {
      if (fadeAnimationRef.current) {
        cancelAnimationFrame(fadeAnimationRef.current);
      }
    };
  }, []);

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

    const handleEnded = () => {
      const nextIndex = (currentSongIndex + 1) % playlist.length;
      changeSong(nextIndex);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex, playlist.length]);

  const changeSong = (newIndex: number) => {
    wasPlayingBeforeSkip.current = isPlaying;
    setCurrentSongIndex(newIndex);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 50);
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
    if (audioRef.current?.duration) {
      audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    changeSong(nextIndex);
  };

  const playPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    changeSong(prevIndex);
  };

  const currentSong = playlist[currentSongIndex];

    return (
    <Card className="p-4 w-full max-w-[600px] mx-auto bg-transparent backdrop-blur-md rounded-2xl shadow-md">
      <audio ref={audioRef} src={currentSong.url} />
      <div className="flex flex-col space-y-3">
        <div className="text-left">
          <div className="text-xl md:text-xl font-semibold text-white text-glow">
            {currentSong.title}
          </div>
          <div className="text-sm text-gray-300 text-glow">
            {currentSong.artist}
          </div>
          <div className="text-xs text-gray-400 mt-1 text-glow">
            {currentSongIndex + 1} of {playlist.length}
          </div>
        </div>

        <div className="flex items-center gap-3">
        

          <div className="flex-1 relative group">
            <div className="h-2 flex items-center">
              <span className="text-xs text-gray-400 mr-2">
                {audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}
              </span>

              <div className="relative flex-1 h-1 bg-white/20 rounded-full">
                <div 
                  className="absolute h-full bg-white rounded-full transition-all duration-50"
                  style={{ width: `${progress}%` }}
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-glow transition-all duration-50"
                  style={{ left: `calc(${progress}% - 4px)` }}
                />
              </div>

              <span className="text-xs text-gray-400 ml-2">
                {audioRef.current ? formatTime(audioRef.current.duration) : '0:00'}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <button 
            onClick={playPreviousSong} 
            className="text-gray-300 hover:text-white text-glow"
          >
            <SkipBack size={18} />
          </button>
          <button
            onClick={togglePlay}
            className="p-2  rounded-full  transition text-glow"
          >
            {isPlaying ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Play size={20} className="text-white" />
            )}
          </button>
          <button 
            onClick={playNextSong} 
            className="text-gray-300 hover:text-white text-glow"
          >
            <SkipForward size={18} />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default MusicPlayer;