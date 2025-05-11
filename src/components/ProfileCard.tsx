import React, { useRef, useEffect } from 'react';
import TypewriterText from './TypewriterText';
import SocialLinks from './SocialLinks';
import Card from './shared/Card';

const ProfileCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.transition = 'transform 0.5s ease-out';
    };

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.1s ease-out';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <Card ref={cardRef} className="w-full max-w-[800px] md:h-[400px] h-[300px] flex bg-transparent backdrop-blur-md">
      <div className="flex flex-col w-full">
        <div className="flex p-4 md:p-8 items-start">
          <div className="mr-4 md:mr-8">
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gray-700/50 overflow-hidden shadow-lg">
              <img 
                src="https://cdn.discordapp.com/attachments/1171211624640688168/1371096253483585546/download_1.png?ex=6821e464&is=682092e4&hm=83c1985baf612d37e0ef4a8578a7cfef9649f991ad60f0fdfdda5ebdd0c0dc6d&" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 text-white text-glow">
              <TypewriterText text="nixx" delay={150} deleteDelay={150} pauseDelayMin={700} pauseDelayMax={1400} />
            </h1>
            <div className="text-base md:text-lg text-gray-400 text-glow-subtle">
              <TypewriterText text="alive?" delay={170} deleteDelay={150} pauseDelayMin={700} pauseDelayMax={1400} />
            </div>
          </div>
        </div>
        <div className="mt-auto mb-4 md:mb-8 flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;