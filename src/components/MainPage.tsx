import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import MusicPlayer from './MusicPlayer';
import VolumeControl from './VolumeControl';

interface MainPageProps {
  entered: boolean;
}

const MainPage: React.FC<MainPageProps> = ({ entered }) => {
  const [volume, setVolume] = useState(15);
  const [isMuted, setIsMuted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (entered) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [entered]);

  const backgroundImage = "https://images.hdqwalls.com/wallpapers/dark-night-mountains-minimalist-4k-o4.jpg";

  return (
    <div 
      className={`h-screen w-screen fixed top-0 left-0 p-4 md:p-6 transition-all duration-700 ease-in-out ${entered ? 'brightness-100 blur-0' : 'brightness-50 blur-md'}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        filter: 'none',
      }}
    >
      {showContent && (
        <>
          <div className="absolute top-4 md:top-6 left-4 md:left-6 z-10 transition-opacity duration-700 opacity-100">
            <VolumeControl 
              volume={volume}
              isMuted={isMuted}
              onVolumeChange={setVolume}
              onMuteToggle={setIsMuted}
            />
          </div>
          
          <div className="flex flex-col items-center justify-center h-full space-y-4 md:space-y-8 transition-opacity duration-700 opacity-100">
            <ProfileCard />
            <MusicPlayer volume={volume} isMuted={isMuted} />
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
