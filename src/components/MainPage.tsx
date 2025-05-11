import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import MusicPlayer from './MusicPlayer';
import VolumeControl from './VolumeControl';

const MainPage: React.FC = () => {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // You can change this URL to any image you want
  const backgroundImage = "https://cdn.discordapp.com/attachments/1171211624640688168/1371146371016429679/premium_photo-1661962643046-198516c2bec0.jpg?ex=68221311&is=6820c191&hm=50b169fd410e74c2977128d794b2b7d9066be9a356eb1b1c642490952b91aedf&";

  return (
    <div 
      className={`min-h-screen p-6 relative overflow-hidden transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
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