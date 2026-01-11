'use client'

import React from 'react'
import SocialButton from './SocialButton'
import styles from './CreatorPage.module.css'

const CreatorPage = () => {
  const socials = [
    {
      id: 1,
      name: 'Twitter',
      handle: '@jesterinvestor2',
      url: 'https://twitter.com/jesterinvestor2',
      icon: '𝕏',
      color: '#000000',
      backgroundColor: '#ffffff'
    },
    {
      id: 2,
      name: 'Instagram',
      handle: '@jesterinvestor',
      url: 'https://instagram.com/jesterinvestor',
      icon: '📷',
      color: '#E4405F',
      backgroundColor: '#fafafa'
    },
    {
      id: 3,
      name: 'TikTok',
      handle: '@jesterinvestor',
      url: 'https://tiktok.com/@jesterinvestor',
      icon: '♪',
      color: '#000000',
      backgroundColor: '#25f4ee'
    },
    {
      id: 4,
      name: 'YouTube',
      handle: '@Jester_Investor',
      url: 'https://www.youtube.com/@Jester_Investor',
      icon: '▶️',
      color: '#FF0000',
      backgroundColor: '#ffffff'
    },
    {
      id: 5,
      name: 'Discord',
      handle: 'Discord Server',
      url: 'https://discord.gg/XPg2yRAt',
      icon: '💬',
      color: '#5865F2',
      backgroundColor: '#ffffff'
    },
    {
      id: 6,
      name: 'Twitch',
      handle: '@jesterinvestor',
      url: 'https://twitch.tv/jesterinvestor',
      icon: '🎮',
      color: '#9146FF',
      backgroundColor: '#ffffff'
    },
    {
      id: 7,
      name: 'LinkedIn',
      handle: '@jesterinvestor',
      url: 'https://linkedin.com/in/jesterinvestor',
      icon: '💼',
      color: '#0A66C2',
      backgroundColor: '#ffffff'
    },
    {
      id: 8,
      name: 'GitHub',
      handle: '@jesterinvestor',
      url: 'https://github.com/jesterinvestor',
      icon: '🐙',
      color: '#333333',
      backgroundColor: '#ffffff'
    },
    {
      id: 9,
      name: 'Email',
      handle: 'altcoinabsurdity+jesterinvestor@gmail.com',
      url: 'mailto:altcoinabsurdity+jesterinvestor@gmail.com',
      icon: '✉️',
      color: '#EA4335',
      backgroundColor: '#ffffff'
    },
    {
      id: 10,
      name: 'Farcaster',
      handle: '@jesterinvestor',
      url: 'https://farcaster.xyz/jesterinvestor',
      icon: '🎭',
      color: '#8A63D2',
      backgroundColor: '#ffffff'
    },
    {
      id: 11,
      name: 'Base',
      handle: '0x24DE6CF049988BADfCa76dD54D72a3b3CEF8095e',
      url: 'https://base.app/profile/0x24DE6CF049988BADfCa76dD54D72a3b3CEF8095e',
      icon: '⛓️',
      color: '#0052FF',
      backgroundColor: '#ffffff'
    },
    {
      id: 12,
      name: 'Triviacast',
      handle: 'Triviacast',
      url: 'https://farcaster.xyz/miniapps/UmWywlPILouA/triviacast',
      icon: '🎲',
      color: '#7C3AED',
      backgroundColor: '#ffffff'
    }
  ]

  return (
    <div className={styles.creatorPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <img src="/Video scooby gif.png" alt="Jesterinvestor Logo" className={styles.avatarImage} />
          </div>
          <h1>Jestrinvestor</h1>
          <p className={styles.bio}>Creator | Investor | Web3 Enthusiast</p>
          <p className={styles.subtitle}>Find me everywhere on the web</p>
        </div>

        <div className={styles.socialsGrid}>
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

        <footer className={styles.footer}>
          <p>© 2026 Jestrinvestor. All links available 24/7</p>
        </footer>
      </div>
    </div>
  )
}

export default CreatorPage
