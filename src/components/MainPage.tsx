import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import MusicPlayer from './MusicPlayer';
import VolumeControl from './VolumeControl';

const MainPage: React.FC = () => {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in effect after component mounts
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100); // Delay fade-in for a smoother effect, adjust timing if needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-900 p-6 relative overflow-hidden transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute top-6 left-6">
        <VolumeControl 
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={setVolume}
          onMuteToggle={setIsMuted}
        />
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <ProfileCard />
        <MusicPlayer volume={volume} isMuted={isMuted} />
      </div>
    </div>
  );
};

export default MainPage;
