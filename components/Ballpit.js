'use client'

import { useRef, useEffect } from 'react'
import styles from './Ballpit.module.css'

const rand = (min, max) => Math.random() * (max - min) + min

export default function Ballpit({
  count = 80,
  gravity = 0.5,
  friction = 0.9975,
  wallBounce = 0.95,
  followCursor = true,
  colors = ['#5227FF', '#7cff67', '#ff6b6b', '#39FF14'],
  style = {},
  className = ''
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const frameIdRef = useRef(null)
  const boundsRef = useRef({ width: 0, height: 0, left: 0, top: 0 })
  const mouseRef = useRef({ x: -1000, y: -1000, set: false })
  const ballsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = (ctxRef.current = canvas.getContext('2d'))

    function setSize() {
      boundsRef.current = container.getBoundingClientRect()
      canvas.width = boundsRef.current.width
      canvas.height = boundsRef.current.height
    }

    function spawnBalls() {
      const { width, height } = boundsRef.current
      ballsRef.current = Array.from({ length: count }).map(() => {
        const r = rand(5, 10)
        return {
          x: rand(r, width - r),
          y: rand(r, height - r),
          vx: rand(-1, 1),
          vy: rand(-1, 1),
          r,
          color: colors[Math.floor(Math.random() * colors.length)]
        }
      })
    }

    function tick() {
      const { width, height } = boundsRef.current
      ctx.clearRect(0, 0, width, height)

      for (const b of ballsRef.current) {
        // gravity
        b.vy += gravity * 0.1

        // follow cursor force
        if (followCursor && mouseRef.current.set) {
          const dx = mouseRef.current.x - b.x
          const dy = mouseRef.current.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 160) {
            const f = (1 - dist / 160) * 0.35
            b.vx += dx * f * 0.005
            b.vy += dy * f * 0.005
          }
        }

        // friction
        b.vx *= friction
        b.vy *= friction

        // integrate
        b.x += b.vx
        b.y += b.vy

        // walls
        if (b.x - b.r < 0) {
          b.x = b.r
          b.vx = -b.vx * wallBounce
        } else if (b.x + b.r > width) {
          b.x = width - b.r
          b.vx = -b.vx * wallBounce
        }
        if (b.y - b.r < 0) {
          b.y = b.r
          b.vy = -b.vy * wallBounce
        } else if (b.y + b.r > height) {
          b.y = height - b.r
          b.vy = -b.vy * wallBounce
        }

        // draw
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = b.color
        ctx.fill()
      }

      frameIdRef.current = requestAnimationFrame(tick)
    }

    function onResize() {
      setSize()
      spawnBalls()
    }

    function updateMouse(x, y) {
      const b = boundsRef.current
      mouseRef.current.x = x - b.left
      mouseRef.current.y = y - b.top
      mouseRef.current.set = true
      container.style.setProperty('--x', `${mouseRef.current.x}px`)
      container.style.setProperty('--y', `${mouseRef.current.y}px`)
    }

    function onMouseMove(e) {
      updateMouse(e.clientX, e.clientY)
    }
    function onTouchMove(e) {
      const t = e.touches[0]
      if (!t) return
      updateMouse(t.clientX, t.clientY)
    }

    setSize()
    spawnBalls()
    frameIdRef.current = requestAnimationFrame(tick)
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      cancelAnimationFrame(frameIdRef.current)
    }
  }, [count, gravity, friction, wallBounce, followCursor, colors])

  return (
    <div
      ref={containerRef}
      className={`${styles.ballpit} ${className}`}
      style={{ ...style }}
    >
      <canvas ref={canvasRef} className={styles.ballpitCanvas} />
    </div>
  )
}
