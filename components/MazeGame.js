'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { MazeGenerator } from './MazeGenerator'
import { linesIntersect, smoothPath } from '../utils/mazeUtils'
import styles from './MazeGame.module.css'

export default function MazeGame() {
  const [maze, setMaze] = useState(null)
  const [userPath, setUserPath] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [currentTime, setCurrentTime] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [bestTime, setBestTime] = useState(null)

  const [difficulty, setDifficulty] = useState('medium')
  const [algorithm, setAlgorithm] = useState('kruskal')

  const svgRef = useRef(null)

  const getDimensions = () => {
    switch (difficulty) {
      case 'easy': return { width: 10, height: 10, cellSize: 40 }
      case 'hard': return { width: 20, height: 20, cellSize: 25 }
      case 'expert': return { width: 25, height: 25, cellSize: 20 }
      case 'medium':
      default: return { width: 15, height: 15, cellSize: 30 }
    }
  }

  const { width: MAZE_WIDTH, height: MAZE_HEIGHT, cellSize: CELL_SIZE } = getDimensions()
  const SVG_WIDTH = MAZE_WIDTH * CELL_SIZE
  const SVG_HEIGHT = MAZE_HEIGHT * CELL_SIZE

  const start = { x: 0, y: 0 }
  const end = { x: MAZE_WIDTH - 1, y: MAZE_HEIGHT - 1 }

  useEffect(() => {
    if (gameStarted && !gameComplete) {
      const timer = setInterval(() => setCurrentTime(Date.now()), 100)
      return () => clearInterval(timer)
    }
  }, [gameStarted, gameComplete])

  const createNewMaze = useCallback(() => {
    const generator = new MazeGenerator(MAZE_WIDTH, MAZE_HEIGHT, CELL_SIZE)
    const newMaze = generator.generateWithAlgorithm(algorithm)
    setMaze(newMaze)
    setUserPath([])
    setIsDrawing(false)
    setGameComplete(false)
    setGameStarted(false)
    setStartTime(null)
    setEndTime(null)
    setCurrentTime(null)
    setAttempts((prev) => prev + 1)
  }, [MAZE_WIDTH, MAZE_HEIGHT, CELL_SIZE, algorithm])

  useEffect(() => {
    createNewMaze()
  }, [createNewMaze])

  const getRelativePosition = (event) => {
    if (!svgRef.current) return null
    const rect = svgRef.current.getBoundingClientRect()
    const clientX = event.clientX || (event.touches && event.touches[0]?.clientX)
    const clientY = event.clientY || (event.touches && event.touches[0]?.clientY)
    if (clientX == null || clientY == null) return null
    return {
      x: ((clientX - rect.left) / rect.width) * SVG_WIDTH,
      y: ((clientY - rect.top) / rect.height) * SVG_HEIGHT,
    }
  }

  const isInCell = (x, y, cellX, cellY) => {
    const pointCellX = Math.floor(x / CELL_SIZE)
    const pointCellY = Math.floor(y / CELL_SIZE)
    return pointCellX === cellX && pointCellY === cellY
  }
  const isInStartCell = (x, y) => isInCell(x, y, start.x, start.y)
  const isInEndCell = (x, y) => isInCell(x, y, end.x, end.y)

  const pathCrossesWalls = useCallback((path) => {
    if (!maze || path.length < 2) return false
    for (let i = 1; i < path.length; i++) {
      const prev = path[i - 1]
      const curr = path[i]
      for (const wall of maze.walls) {
        let wallStart, wallEnd
        if (wall.dir === 'horizontal') {
          wallStart = { x: wall.x * CELL_SIZE, y: (wall.y + 1) * CELL_SIZE }
          wallEnd = { x: (wall.x + 1) * CELL_SIZE, y: (wall.y + 1) * CELL_SIZE }
        } else {
          wallStart = { x: (wall.x + 1) * CELL_SIZE, y: wall.y * CELL_SIZE }
          wallEnd = { x: (wall.x + 1) * CELL_SIZE, y: (wall.y + 1) * CELL_SIZE }
        }
        if (linesIntersect(prev, curr, wallStart, wallEnd)) return true
      }
    }
    return false
  }, [maze, CELL_SIZE])

  const handleDrawStart = (event) => {
    event.preventDefault()
    const pos = getRelativePosition(event)
    if (pos && isInStartCell(pos.x, pos.y)) {
      setIsDrawing(true)
      setUserPath([pos])
      if (!gameStarted) {
        setGameStarted(true)
        setStartTime(Date.now())
        setCurrentTime(Date.now())
      }
    }
  }

  const handleDrawMove = (event) => {
    event.preventDefault()
    if (!isDrawing) return
    const pos = getRelativePosition(event)
    if (pos) {
      setUserPath((prev) => {
        const newPath = [...prev, pos]
        return newPath.length > 1000 ? newPath.slice(-1000) : newPath
      })
    }
  }

  const handleDrawEnd = (event) => {
    event.preventDefault()
    if (!isDrawing) return
    setIsDrawing(false)
    const lastPoint = userPath[userPath.length - 1]
    if (lastPoint && isInEndCell(lastPoint.x, lastPoint.y) && !pathCrossesWalls(userPath)) {
      setGameComplete(true)
      setEndTime(Date.now())
      const completionTime = Date.now() - startTime
      const savedBest = bestTime
      if (!savedBest || completionTime < savedBest) {
        setBestTime(completionTime)
        try { localStorage.setItem('mazeBestTime', completionTime.toString()) } catch {}
      }
    }
  }

  useEffect(() => {
    try {
      const savedBestTime = localStorage.getItem('mazeBestTime')
      if (savedBestTime) setBestTime(parseInt(savedBestTime))
    } catch {}
  }, [])

  const clearPath = () => {
    setUserPath([])
    setIsDrawing(false)
    setGameComplete(false)
    setGameStarted(false)
    setStartTime(null)
    setEndTime(null)
    setCurrentTime(null)
  }

  const renderWalls = () => {
    if (!maze) return null
    return maze.walls.map((wall, index) => {
      let x1, y1, x2, y2
      if (wall.dir === 'horizontal') {
        x1 = wall.x * CELL_SIZE
        y1 = (wall.y + 1) * CELL_SIZE
        x2 = (wall.x + 1) * CELL_SIZE
        y2 = (wall.y + 1) * CELL_SIZE
      } else {
        x1 = (wall.x + 1) * CELL_SIZE
        y1 = wall.y * CELL_SIZE
        x2 = (wall.x + 1) * CELL_SIZE
        y2 = (wall.y + 1) * CELL_SIZE
      }
      return <line key={`wall-${index}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
    })
  }

  const renderBorder = () => (
    <g className={styles.wallBorder} stroke="#1f2937" strokeWidth="3" strokeLinecap="round">
      <line x1={0} y1={0} x2={SVG_WIDTH} y2={0} />
      <line x1={SVG_WIDTH} y1={0} x2={SVG_WIDTH} y2={SVG_HEIGHT} />
      <line x1={SVG_WIDTH} y1={SVG_HEIGHT} x2={0} y2={SVG_HEIGHT} />
      <line x1={0} y1={SVG_HEIGHT} x2={0} y2={0} />
    </g>
  )

  const renderPath = () => {
    if (userPath.length < 2) return null
    const smoothedPath = smoothPath(userPath, 0.12)
    const pathData = smoothedPath.reduce((acc, point, index) => acc + (index === 0 ? `M ${point.x} ${point.y}` : ` L ${point.x} ${point.y}`), '')
    const pathColor = gameComplete ? '#10b981' : pathCrossesWalls(userPath) ? '#ef4444' : '#39FF14'
    return <path d={pathData} className={styles.trippyPath} stroke={pathColor} opacity={0.9} />
  }

  const formatTime = (ms) => (ms / 1000).toFixed(1) + 's'
  const getCurrentTime = () => {
    if (!startTime) return '0.0s'
    const elapsed = (currentTime || Date.now()) - startTime
    return formatTime(elapsed)
  }
  const getCompletionTime = () => (startTime && endTime ? formatTime(endTime - startTime) : null)

  return (
    <div className={styles.mazeContainer}>
      <div className={styles.header}>SVG Maze Game</div>

      <div className={styles.controls}>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={styles.button}>
          <option value="easy">Easy (10×10)</option>
          <option value="medium">Medium (15×15)</option>
          <option value="hard">Hard (20×20)</option>
          <option value="expert">Expert (25×25)</option>
        </select>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className={styles.button}>
          <option value="kruskal">Kruskal’s</option>
          <option value="recursive-backtracking">Recursive Backtracking</option>
          <option value="prim">Prim’s</option>
        </select>
        <button onClick={clearPath} disabled={!gameStarted} className={styles.button}>Clear Path</button>
        <button onClick={createNewMaze} className={styles.button}>New Maze</button>
      </div>

      <div className={styles.controls}>
        <div className={styles.button}>Attempts: {attempts}</div>
        <div className={styles.button}>Current: {gameStarted ? getCurrentTime() : '0.0s'}</div>
        <div className={styles.button}>Last: {getCompletionTime() || '---'}</div>
        <div className={styles.button}>Best: {bestTime ? formatTime(bestTime) : '---'}</div>
      </div>

      <div className={styles.svgWrap}>
        <svg
          ref={svgRef}
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          className={styles.svg}
          onMouseDown={handleDrawStart}
          onMouseMove={handleDrawMove}
          onMouseUp={handleDrawEnd}
          onMouseLeave={handleDrawEnd}
          onTouchStart={handleDrawStart}
          onTouchMove={handleDrawMove}
          onTouchEnd={handleDrawEnd}
        >
          <defs>
            <filter id="neonBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="#0a0a0a" />
          {renderBorder()}
          {renderWalls()}

          <g className={styles.startCell}>
            <rect x={start.x * CELL_SIZE + 2} y={start.y * CELL_SIZE + 2} width={CELL_SIZE - 4} height={CELL_SIZE - 4} rx="4" opacity="0.8" />
            <text x={start.x * CELL_SIZE + CELL_SIZE / 2} y={start.y * CELL_SIZE + CELL_SIZE / 2 + 2} textAnchor="middle" fontSize={Math.min(CELL_SIZE / 3, 12)} className={styles.startText}>START</text>
          </g>

          <g className={styles.endCell}>
            <rect x={end.x * CELL_SIZE + 2} y={end.y * CELL_SIZE + 2} width={CELL_SIZE - 4} height={CELL_SIZE - 4} rx="4" opacity="0.8" />
            <text x={end.x * CELL_SIZE + CELL_SIZE / 2} y={end.y * CELL_SIZE + CELL_SIZE / 2 + 2} textAnchor="middle" fontSize={Math.min(CELL_SIZE / 3, 12)} className={styles.endText}>END</text>
          </g>

          {renderPath()}
        </svg>
      </div>

      <div style={{ marginTop: 10, textAlign: 'center', color: '#79FE0C' }}>
        Draw from START to END without crossing walls.
      </div>

      {gameComplete && (
        <div style={{ marginTop: 12, textAlign: 'center', color: '#10b981', fontWeight: 800 }}>
          🎉 Completed in {getCompletionTime()} {bestTime && endTime - startTime <= bestTime ? '🏆 New best!' : ''}
        </div>
      )}

      {pathCrossesWalls(userPath) && !gameComplete && userPath.length > 1 && (
        <div style={{ marginTop: 12, textAlign: 'center', color: '#ef4444', fontWeight: 700 }}>
          ⚠️ Path crosses walls! Try a different route.
        </div>
      )}
    </div>
  )
}
