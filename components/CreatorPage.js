'use client'

import React from 'react'
import SocialButton from './SocialButton'
import AnimatedHeadline from './AnimatedHeadline'
import GalleryGrid from './GalleryGrid'
import styles from './CreatorPage.module.css'
import { MouseTracker, FloatingEmoji } from './InteractiveElements'
import MazeGame from './MazeGame'
import ChromaGrid from './ChromaGrid'
import Ballpit from './Ballpit'
import Threads from './Threads'

const CreatorPage = () => {
  const socials = [
    {
      id: 1,
      name: 'Twitter',
      handle: '@jesterinvestor2',
      url: 'https://twitter.com/jesterinvestor2',
      icon: '𝕏',
      color: '#ffffff',
      backgroundColor: '#000000'
    },
    {
      id: 2,
      name: 'Instagram',
      handle: '@jesterinvestor',
      url: 'https://instagram.com/jesterinvestor',
      icon: '📷',
      color: '#ffffff',
      backgroundColor: '#E4405F'
    },
    {
      id: 3,
      name: 'TikTok',
      handle: '@jesterinvestor',
      url: 'https://tiktok.com/@jesterinvestor',
      icon: '♪',
      color: '#ffffff',
      backgroundColor: '#000000'
    },
    {
      id: 4,
      name: 'YouTube',
      handle: '@Jester_Investor',
      url: 'https://www.youtube.com/@Jester_Investor',
      icon: '▶️',
      color: '#ffffff',
      backgroundColor: '#FF0000'
    },
    {
      id: 5,
      name: 'Discord',
      handle: 'Discord Server',
      url: 'https://discord.gg/JrFNyeCb',
      icon: '💬',
      color: '#ffffff',
      backgroundColor: '#5865F2'
    },
    {
      id: 6,
      name: 'Twitch',
      handle: '@jesterinvestor',
      url: 'https://twitch.tv/jesterinvestor',
      icon: '🎮',
      color: '#ffffff',
      backgroundColor: '#9146FF'
    },
    {
      id: 7,
      name: 'LinkedIn',
      handle: '@jesterinvestor',
      url: 'https://linkedin.com/in/jesterinvestor',
      icon: '💼',
      color: '#ffffff',
      backgroundColor: '#0A66C2'
    },
    {
      id: 8,
      name: 'GitHub',
      handle: '@jesterinvestor',
      url: 'https://github.com/jesterinvestor',
      icon: '🐙',
      color: '#ffffff',
      backgroundColor: '#333333'
    },
    {
      id: 9,
      name: 'Email',
      handle: 'altcoinabsurdity+jesterinvestor@gmail.com',
      url: 'mailto:altcoinabsurdity+jesterinvestor@gmail.com',
      icon: '✉️',
      color: '#ffffff',
      backgroundColor: '#EA4335'
    },
    {
      id: 10,
      name: 'Farcaster',
      handle: '@jesterinvestor',
      url: 'https://farcaster.xyz/jesterinvestor',
      icon: '🎭',
      color: '#ffffff',
      backgroundColor: '#8A63D2'
    },
    {
      id: 11,
      name: 'Base',
      handle: '0x24DE6CF049988BADfCa76dD54D72a3b3CEF8095e',
      url: 'https://base.app/profile/0x24DE6CF049988BADfCa76dD54D72a3b3CEF8095e',
      icon: '⛓️',
      color: '#ffffff',
      backgroundColor: '#0052FF'
    },
    {
      id: 12,
      name: 'Triviacast',
      handle: 'Triviacast',
      url: 'https://farcaster.xyz/miniapps/UmWywlPILouA/triviacast',
      icon: '🎲',
      color: '#ffffff',
      backgroundColor: '#7C3AED'
    }
  ]

  return (
    <div className={styles.creatorPage}>
      {/* Threads background at top of page */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '600px', zIndex: 0, pointerEvents: 'none', opacity: 0.3 }}>
        <Threads
          color={[0.22, 1, 0.08]}
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      <MouseTracker />
      <FloatingEmoji emoji="🎉" duration={3} delay={0} />
      <FloatingEmoji emoji="💚" duration={4} delay={1} />
      <FloatingEmoji emoji="✨" duration={3.5} delay={2} />
      <div className={styles.container}>
        {/* HEADER WITH PNG AND TITLE AT TOP */}
        <div className={styles.header}>
          <div className={styles.avatar}>
            <img src="/Video%20scooby%20gif.png" alt="Jesterinvestor Logo" className={styles.avatarImage} />
          </div>
          <h1>Jesterinvestor</h1>
          <p className={styles.bio}>Creator | Investor | Web3 Enthusiast</p>
          <p className={styles.subtitle}>Find me everywhere on the web</p>
        </div>

        {/* SVG Maze Game with trippy neon line */}
        <div style={{ marginBottom: 12 }}>
          <AnimatedHeadline text="Trippy SVG Maze" />
          <MazeGame />
        </div>

        {/* SOCIAL BUTTONS - BELOW MAZE */}
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

        {/* Chroma Grid for Social Links */}
        <div style={{ height: '600px', position: 'relative', marginTop: 16 }}>
          <ChromaGrid
            items={socials.map((s, idx) => ({
              image: 'https://i.pravatar.cc/300?img=' + ((idx % 70) + 1),
              title: s.name,
              subtitle: 'Social Link',
              handle: s.handle,
              borderColor: s.color,
              gradient: `linear-gradient(145deg, ${s.backgroundColor}, #000)`,
              url: s.url
            }))}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>

        {/* Gallery Showcase */}
        <div style={{ marginBottom: 12 }}>
          <AnimatedHeadline text="Vibrant, Minimal, and Futuristic" />
          <div style={{ marginTop: 12 }}>
            <GalleryGrid
              items={[ 
                { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600', title: 'Neon Tech' },
                { image: 'https://images.unsplash.com/photo-1526378722484-b1b0c51b66cc?w=600', title: 'Minimal Gallery' },
                { image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600', title: 'Bold Typography' },
                { image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600', title: 'Futuristic UI' }
              ]}
            />
          </div>
        </div>

        <footer className={styles.footer}>
          <p>© 2026 Jesterinvestor. All links available 24/7</p>
        </footer>
      </div>

      {/* Ballpit at bottom of page */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '300px', zIndex: 0, pointerEvents: 'none' }}>
        <Ballpit
          count={120}
          gravity={0.5}
          friction={0.9975}
          wallBounce={0.95}
          followCursor
          colors={['#000000', '#39FF14', '#08FF08', '#7cff67', '#121212', '#0dfe3f']}
        />
      </div>
    </div>
  )
}

export default CreatorPage
