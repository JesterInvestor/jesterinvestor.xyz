'use client'

import React, { useState } from 'react'
import styles from './SocialButton.module.css'

const SocialButton = ({ name, handle, url, icon, color, backgroundColor }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

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

  return (
    <div
      className={styles.socialButton}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className={styles.buttonContent}
        style={{
          borderColor: color,
          backgroundColor: isHovered ? color : backgroundColor,
        }}
      >
        <span
          className={styles.icon}
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
