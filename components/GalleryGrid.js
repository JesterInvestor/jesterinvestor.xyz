'use client'

import React, { useEffect, useRef } from 'react'
import styles from './GalleryGrid.module.css'

export default function GalleryGrid({ items }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(`.${styles.card}`)
    if (!cards) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
        }
      })
    }, { threshold: 0.2 })
    cards.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={styles.grid}>
      {items.map((it, i) => (
        <div className={styles.card} key={i}>
          <img className={styles.img} src={it.image} alt={it.title || 'Gallery item'} />
          {it.title && <div className={styles.caption}>{it.title}</div>}
        </div>
      ))}
    </div>
  )
}
