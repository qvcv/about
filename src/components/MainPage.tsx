import React from 'react';
import ProfileCard from './ProfileCard';
import MusicPlayer from './MusicPlayer';
import VolumeControl from './VolumeControl';

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6 relative overflow-hidden">
      <div className="absolute top-6 left-6">
        <VolumeControl />
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mb-8">
          <ProfileCard />
        </div>
        <div className="w-full max-w-md">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default MainPage;