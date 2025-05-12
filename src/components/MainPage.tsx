import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import MusicPlayer from './MusicPlayer';
import VolumeControl from './VolumeControl';
import RainEffect from './RainEffect';

interface MainPageProps {
  entered: boolean;
}

const MainPage: React.FC<MainPageProps> = ({ entered }) => {
  const [volume, setVolume] = useState(15);
  const [isMuted, setIsMuted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (entered) {
      const t = setTimeout(() => setShowContent(true), 700);
      return () => clearTimeout(t);
    } else {
      setShowContent(false);
    }
  }, [entered]);

  const backgroundImage = 'https://images.hdqwalls.com/wallpapers/dark-night-mountains-minimalist-4k-o4.jpg';

  return (
    <div
      className={`fixed inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
        entered ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {showContent && <RainEffect />}

      {showContent && (
        <>
          <div className="absolute top-4 left-4 z-10">
            <VolumeControl
              volume={volume}
              isMuted={isMuted}
              onVolumeChange={setVolume}
              onMuteToggle={setIsMuted}
            />
          </div>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <ProfileCard />
            <MusicPlayer volume={volume} isMuted={isMuted} />
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
