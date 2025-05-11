import React from 'react';
import { MessagesSquare, DiscIcon as BrandDiscord, Gamepad2, Stamp as Steam } from 'lucide-react';

interface SocialLink {
  id: string;
  icon: React.ReactNode;
  url: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    id: 'telegram',
    icon: <MessagesSquare size={24} />,
    url: '#',
    label: 'Telegram'
  },
  {
    id: 'discord',
    icon: <BrandDiscord size={24} />,
    url: '#',
    label: 'Discord'
  },
  {
    id: 'roblox',
    icon: <Gamepad2 size={24} />,
    url: '#',
    label: 'Roblox'
  },
  {
    id: 'steam',
    icon: <Steam size={24} />,
    url: '#', 
    label: 'Steam'
  }
];

const SocialLinks: React.FC = () => {
  return (
    <div className="flex space-x-4">
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.url}
          className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300 social-icon"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;