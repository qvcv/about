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
  const CROSSFADE_DURATION = 1000; 
  const FPS = 120; 

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const nextAudioRef = useRef<HTMLAudioElement>(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const fadeInterval = useRef<number>();

  const [playlist] = useState<Song[]>([
    {
      url: 'https://cdn.discordapp.com/attachments/1171211624640688168/1371212259858186371/ssstik.io_1746895169136.mp3?ex=6822506e&is=6820feee&hm=0543409f897356559b671a808f0881320cca2dc90f42113269e6a9bfdfed843d&',
      title: 'FRENCH DRILL',
      artist: '?'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/1171211624640688168/1371212259480702998/Bandit.mp3?ex=6822506e&is=6820feee&hm=0b390ae59c5b5792da087237479878e5d2944482e27ce2b599f89ffd70a361b0&',
      title: 'BANDIT',
      artist: 'DON TOLIVER'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/1171211624640688168/1371212260588126369/Acid_Souljah__Smokedope2016_-_Tab_Talk_Prod._Ticox_Shadow_Wizard_Money_Gang.mp3?ex=6822506e&is=6820feee&hm=382f6af6504e4437a36eab68f40679f560a890e91c31efc77955d940842e4d36&',
      title: 'TAB TALK',
      artist: 'ACID SOULJAH & SMOKEDOPE2016'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/1171211624640688168/1371212260235677886/Timeless.mp3?ex=6822506e&is=6820feee&hm=f35c9cbf98ce7fdf7b0261f8053a4cfe3bd465debd94d6a692e9b9ec502aa85e&',
      title: 'TIMELESS',
      artist: 'THE WEEKND & PLAYBOI CARTI'
    }
  ]);

  const startCrossfade = (newIndex: number) => {
    if (isCrossfading || !audioRef.current) return;
    
    setIsCrossfading(true);
    const currentAudio = audioRef.current;
    const nextAudio = new Audio(playlist[newIndex].url);
    nextAudioRef.current = nextAudio;

    currentAudio.volume = volume / 100;
    nextAudio.volume = 0;
    nextAudio.play().catch(e => console.error("Next track play failed:", e));

    const frameDuration = 1000 / FPS;
    const totalFrames = CROSSFADE_DURATION / frameDuration;
    let currentFrame = 0;

    fadeInterval.current = window.setInterval(() => {
      if (currentFrame >= totalFrames) {
        clearInterval(fadeInterval.current);
        currentAudio.pause();
        audioRef.current = nextAudio;
        setCurrentSongIndex(newIndex);
        setIsCrossfading(false);
        return;
      }

      const progress = currentFrame / totalFrames;
      currentAudio.volume = (volume / 100) * (1 - progress);
      nextAudio.volume = (volume / 100) * progress;
      
      currentFrame++;
    }, frameDuration);
  };

  const handleEnded = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    startCrossfade(nextIndex);
  };

  const changeSong = (newIndex: number) => {
    if (newIndex === currentSongIndex) return;
    startCrossfade(newIndex);
  };
  
  useEffect(() => {
    if (audioRef.current && !isCrossfading) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted, isCrossfading]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSongIndex].url;
      audioRef.current.play();
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex]);

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

  const playNextSong = () => changeSong((currentSongIndex + 1) % playlist.length);
  const playPreviousSong = () => 
    changeSong((currentSongIndex - 1 + playlist.length) % playlist.length);

  const currentSong = playlist[currentSongIndex];

  return (
    <Card className="p-4 w-full max-w-[600px] mx-auto bg-transparent backdrop-blur-md">
      <audio ref={audioRef} src={currentSong.url} />
      <div className="flex flex-col">
        <div className="mb-3">
          <div className="text-lg md:text-xl font-bold text-glow-subtle">Currently Playing</div>
          <div className="flex flex-col">
            <div className="text-base md:text-lg font-medium text-white truncate transition-all text-glow-subtle duration-300">
              {currentSong.title}
            </div>
            <div className="text-sm md:text-base text-gray-200 truncate transition-all text-glow-subtle duration-300">
              {currentSong.artist}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {currentSongIndex + 1} of {playlist.length}
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
              <span className="text-xs text-gray-400">
                {audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}
              </span>
              <span className="text-xs text-gray-400">
                {audioRef.current ? formatTime(audioRef.current.duration) : '0:00'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              className="p-2 text-gray-600 hover:text-white transition-colors duration-300"
              onClick={playPreviousSong}
            >
              <SkipBack size={20} />
            </button>

            <button 
              className="p-3 text-gray-600 hover:text-white rounded-full text-white transition-colors duration-300"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button 
              className="p-2 text-gray-600 hover:text-white transition-colors duration-300"
              onClick={playNextSong}
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