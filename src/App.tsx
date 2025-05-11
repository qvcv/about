import React, { useState } from 'react';
import EntrancePage from './components/EntrancePage';
import MainPage from './components/MainPage';

const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
  };

  return (
    <div>
      {!hasEntered ? (
        <EntrancePage onEnter={handleEnter} />
      ) : (
        <MainPage />
      )}
    </div>
  );
};

export default App;
