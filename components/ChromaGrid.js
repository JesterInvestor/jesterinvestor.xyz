'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import styles from './ChromaGrid.module.css'

const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef(null)
  const fadeRef = useRef(null)
  const setX = useRef(null)
  const setY = useRef(null)
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    setX.current = gsap.quickSetter(el, '--x', 'px')
    setY.current = gsap.quickSetter(el, '--y', 'px')
    const { width, height } = el.getBoundingClientRect()
    pos.current = { x: width / 2, y: height / 2 }
    setX.current(pos.current.x)
    setY.current(pos.current.y)
  }, [])

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x)
        setY.current?.(pos.current.y)
      },
      overwrite: true
    })
  }

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect()
    moveTo(e.clientX - r.left, e.clientY - r.top)
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true })
  }

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    })
  }

  const handleCardClick = url => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCardMove = e => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  const data = items || []

  return (
    <div
      ref={rootRef}
      className={`${styles.chromaGrid} ${className}`}
      style={{
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className={styles.chromaCard}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          style={{
            '--card-border': c.borderColor || 'transparent',
            '--card-gradient': c.gradient,
            cursor: c.url ? 'pointer' : 'default'
          }}
        >
          {c.image && (
            <div className={styles.chromaImgWrapper}>
              <img src={c.image} alt={c.title} loading="lazy" />
            </div>
          )}
          <footer className={styles.chromaInfo}>
            <h3 className={styles.name}>{c.title}</h3>
            {c.handle && <span className={styles.handle}>{c.handle}</span>}
            {c.subtitle && <p className={styles.role}>{c.subtitle}</p>}
            {c.location && <span className={styles.location}>{c.location}</span>}
          </footer>
        </article>
      ))}
      <div className={styles.chromaOverlay} />
      <div ref={fadeRef} className={styles.chromaFade} />
    </div>
  )
}

export default ChromaGrid
