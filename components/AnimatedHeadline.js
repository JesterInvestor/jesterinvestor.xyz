'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './AnimatedHeadline.module.css'

const splitToChars = (text) => text.split(' ').map((word, wi) => (
  <span className={styles.word} key={`w-${wi}`}>
    {word.split('').map((c, ci) => (
      <span className={styles.char} key={`c-${wi}-${ci}`}>{c}</span>
    ))}
  </span>
))

export default function AnimatedHeadline({ text }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <h2 ref={ref} className={`${styles.headline} ${visible ? 'visible' : ''}`}>
      {splitToChars(text)}
    </h2>
  )
}
