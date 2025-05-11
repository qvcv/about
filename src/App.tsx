import React, { useState } from 'react';
import EntrancePage from './components/EntrancePage';
import MainPage from './components/MainPage';

function App() {
  const [isEntered, setIsEntered] = useState(false);

  const handleEnter = () => {
    setIsEntered(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!isEntered ? (
        <EntrancePage onEnter={handleEnter} />
      ) : (
        <MainPage />
      )}
    </div>
  );
}

export default App;