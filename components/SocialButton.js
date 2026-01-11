'use client'

import React, { useState } from 'react'
import styles from './SocialButton.module.css'

const SocialButton = ({ name, handle, url, icon, color, backgroundColor }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)

  const handleClick = () => {
    if (url.startsWith('mailto:')) {
      window.location.href = url
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCopy = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(handle)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    setRotation(Math.sqrt(rotateX * rotateX + rotateY * rotateY) / 5)
    setScale(1.1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation(0)
    setScale(1)
  }

  return (
    <div
      className={styles.socialButton}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{
        transform: `scale(${scale}) rotateZ(${rotation}deg)`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div
        className={`${styles.buttonContent} ${isHovered ? styles.wackyHover : ''}`}
        style={{
          borderColor: color,
          backgroundColor: isHovered ? color : backgroundColor,
        }}
      >
        <span
          className={`${styles.icon} ${isHovered ? styles.iconBounce : ''}`}
          style={{
            color: isHovered ? backgroundColor : color,
          }}
        >
          {icon}
        </span>
        <div className={styles.textContent}>
          <div
            className={styles.name}
            style={{
              color: isHovered ? backgroundColor : color,
            }}
          >
            {name}
          </div>
          <div
            className={styles.handle}
            style={{
              color: isHovered ? backgroundColor : color,
              opacity: 0.8,
            }}
          >
            {handle}
          </div>
        </div>
      </div>

      {isHovered && (
        <div className={styles.copyBtn} onClick={handleCopy}>
          {isCopied ? '✓ Copied' : 'Copy'}
        </div>
      )}
    </div>
  )
}

export default SocialButton
