import React, { useState } from 'react'
import ProfileCard from './components/ProfileCard'
import MusicPlayer from './components/MusicPlayer'
import VolumeControl from './components/VolumeControl'
import RainEffect from './components/RainEffect'
import CustomCursor from './components/CustomCursor'

const App: React.FC = () => {
  const [entered, setEntered] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)
  const [volume, setVolume] = useState(15)
  const [isMuted, setIsMuted] = useState(false)

  const handleEnter = () => {
    setFadingOut(true)
    setTimeout(() => setEntered(true), 700)
  }

  const bg = 'https://images.hdqwalls.com/wallpapers/dark-night-mountains-minimalist-4k-o4.jpg'

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        onClick={handleEnter}
        className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-700 ease-in-out ${
          fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        />
        <div className="relative z-10 text-5xl font-bold text-white text-glow animate-pulse">
          enter
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out delay-200 ${
          entered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <RainEffect />
        <CustomCursor />
        <div className="absolute top-4 left-4 z-10">
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={setVolume}
            onMuteToggle={setIsMuted}
          />
        </div>

        <div className="flex flex-col items-center justify-center h-full space-y-8 z-10">
          <ProfileCard />
          {entered && <MusicPlayer volume={volume} isMuted={isMuted} autoPlay />}
        </div>
      </div>
    </div>
  )
}

export default App
