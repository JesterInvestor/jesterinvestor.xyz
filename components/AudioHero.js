'use client'

import React, { useRef, useState } from 'react'
import styles from './AudioHero.module.css'

export default function AudioHero({ title = 'Heavy Metal Hero', src }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause(); setPlaying(false) }
    else { a.play(); setPlaying(true) }
  }

  return (
    <div className={styles.hero}>
      <div className={styles.title}>{title}</div>
      <div className={styles.controls}>
        <button className={styles.button} onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
      </div>
      <audio ref={audioRef} src={src} preload="none" />
    </div>
  )
}
