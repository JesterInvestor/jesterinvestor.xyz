import React from 'react';
import './CreatorPage.css';
import SocialButton from './SocialButton';

const CreatorPage = () => {
  const socials = [
    {
      id: 1,
      name: 'Twitter',
      handle: '@jestrinvestor2',
      url: 'https://twitter.com/jestrinvestor2',
      icon: '𝕏',
      color: '#000000',
      backgroundColor: '#ffffff'
    },
    {
      id: 2,
      name: 'Instagram',
      handle: '@jestrinvestor',
      url: 'https://instagram.com/jestrinvestor',
      icon: '📷',
      color: '#E4405F',
      backgroundColor: '#fafafa'
    },
    {
      id: 3,
      name: 'TikTok',
      handle: '@jestrinvestor',
      url: 'https://tiktok.com/@jestrinvestor',
      icon: '♪',
      color: '#000000',
      backgroundColor: '#25f4ee'
    },
    {
      id: 4,
      name: 'YouTube',
      handle: '@jestrinvestor',
      url: 'https://youtube.com/@jestrinvestor',
      icon: '▶️',
      color: '#FF0000',
      backgroundColor: '#ffffff'
    },
    {
      id: 5,
      name: 'Discord',
      handle: '@jestrinvestor',
      url: 'https://discord.com/users/jestrinvestor',
      icon: '💬',
      color: '#5865F2',
      backgroundColor: '#ffffff'
    },
    {
      id: 6,
      name: 'Twitch',
      handle: '@jestrinvestor',
      url: 'https://twitch.tv/jestrinvestor',
      icon: '🎮',
      color: '#9146FF',
      backgroundColor: '#ffffff'
    },
    {
      id: 7,
      name: 'LinkedIn',
      handle: '@jestrinvestor',
      url: 'https://linkedin.com/in/jestrinvestor',
      icon: '💼',
      color: '#0A66C2',
      backgroundColor: '#ffffff'
    },
    {
      id: 8,
      name: 'GitHub',
      handle: '@jestrinvestor',
      url: 'https://github.com/jestrinvestor',
      icon: '🐙',
      color: '#333333',
      backgroundColor: '#ffffff'
    },
    {
      id: 9,
      name: 'Email',
      handle: 'contact@jestrinvestor.xyz',
      url: 'mailto:contact@jestrinvestor.xyz',
      icon: '✉️',
      color: '#EA4335',
      backgroundColor: '#ffffff'
    }
  ];

  return (
    <div className="creator-page">
      <div className="container">
        <div className="header">
          <div className="avatar">
            <span className="avatar-text">J</span>
          </div>
          <h1>Jesterinvestor</h1>
          <p className="bio">Creator | Investor | Web3 Enthusiast</p>
          <p className="subtitle">Find me everywhere on the web</p>
        </div>

        <div className="socials-grid">
          {socials.map((social) => (
            <SocialButton
              key={social.id}
              name={social.name}
              handle={social.handle}
              url={social.url}
              icon={social.icon}
              color={social.color}
              backgroundColor={social.backgroundColor}
            />
          ))}
        </div>

        <footer className="footer">
          <p>© 2026 Jesterinvestor. All links available 24/7</p>
        </footer>
      </div>
    </div>
  );
};

export default CreatorPage;
