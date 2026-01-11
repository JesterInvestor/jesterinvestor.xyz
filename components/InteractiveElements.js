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

const MouseTracer = () => {
  const [trail, setTrail] = useState([])
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPos = { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() }
      setPosition(newPos)
      setTrail((prev) => [...prev, newPos].slice(-12)) // Keep last 12 points
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, idx) => (
        <div
          key={point.id}
          className={styles.trailDot}
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: idx / trail.length * 0.8,
          }}
        />
      ))}
      {/* Main cursor */}
      <div
        className={styles.mouseTracker}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  )
}

const MouseTracker = MouseTracer // Alias for backwards compatibility

export { FloatingEmoji, WackyButton, MouseTracker }
