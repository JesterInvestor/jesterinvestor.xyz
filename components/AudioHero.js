'use client'

import React, { useRef, useState } from 'react'
import styles from './AudioHero.module.css'

export default function AudioHero({ title = 'Heavy Theme', src }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    setError('')
    if (playing) {
      a.pause()
      setPlaying(false)
      return
    }
    if (!ready) {
      a.load()
    }
    try {
      await a.play()
      setPlaying(true)
    } catch (e) {
      setError('Playback blocked. Tap Play again or check sound settings.')
    }
  }

  return (
    <div className={styles.hero}>
      <div className={styles.title}>{title}</div>
      <div className={styles.controls}>
        <button className={styles.button} onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
      </div>
      {error && <div style={{ marginTop: 8, color: '#79FE0C' }}>{error}</div>}
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        onCanPlay={() => setReady(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setError('Audio failed to load. Try again or use a local file.')}
      />
    </div>
  )
}
