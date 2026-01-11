'use client'

import React, { useState, useEffect } from 'react'
import styles from './InteractiveElements.module.css'

const FloatingEmoji = ({ emoji, duration = 3, delay = 0 }) => {
  return (
    <div
      className={styles.floatingEmoji}
      style={{
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {emoji}
    </div>
  )
}

const WackyButton = ({ children, onClick, className = '' }) => {
  const [rotation, setRotation] = useState(0)

  const handleMouseEnter = () => {
    setRotation(Math.random() * 10 - 5)
  }

  return (
    <button
      className={`${styles.wackyButton} ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={{
        transform: `rotate(${rotation}deg) scale(1.05)`,
        transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      }}
    >
      {children}
    </button>
  )
}

const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className={styles.mouseTracker}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  )
}

export { FloatingEmoji, WackyButton, MouseTracker }
