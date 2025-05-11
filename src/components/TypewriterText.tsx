import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay: number;
  deleteDelay: number;
  pauseDelayMin: number;
  pauseDelayMax: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  delay = 200,
  deleteDelay = 250,
  pauseDelayMin = 700,
  pauseDelayMax = 1400
}) => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isWaiting) {
      const randomDelay = Math.floor(Math.random() * (pauseDelayMax - pauseDelayMin + 1)) + pauseDelayMin;
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, randomDelay);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && currentText === text) {
      setIsWaiting(true);
      return;
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      return;
    }

    const updateText = () => {
      if (isDeleting) {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
      } else {
        setCurrentText(prev => text.substring(0, prev.length + 1));
      }
    };

    const randomVariation = Math.random() * 100 - 50; // More natural variation
    const currentDelay = (isDeleting ? deleteDelay : delay) + randomVariation;

    timeout = setTimeout(updateText, currentDelay);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isWaiting, text, delay, deleteDelay, pauseDelayMin, pauseDelayMax]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-blink ml-0.5 opacity-70">|</span>
    </span>
  );
};

export default TypewriterText;