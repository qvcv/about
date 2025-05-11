import React, { useState } from 'react';
import MainPage from './components/MainPage';
import EntrancePage from './components/EntrancePage';

const App: React.FC = () => {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative min-h-screen">
      <MainPage autoplay entered={entered} />
      {!entered && <EntrancePage onEnter={() => setEntered(true)} />}
    </div>
  );
};

export default App;
