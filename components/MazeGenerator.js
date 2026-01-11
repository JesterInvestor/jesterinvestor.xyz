// components/MazeGenerator.js
import { generateMaze } from '../utils/mazeUtils'

export class MazeGenerator {
  constructor(width, height, cellSize = 30) {
    this.width = width
    this.height = height
    this.cellSize = cellSize
  }

  generate() {
    const walls = generateMaze(this.width, this.height)
    return {
      walls,
      start: { x: 0, y: 0 },
      end: { x: this.width - 1, y: this.height - 1 },
      width: this.width,
      height: this.height,
      cellSize: this.cellSize,
    }
  }

  generateWithAlgorithm(algorithm = 'kruskal') {
    switch (algorithm) {
      case 'recursive-backtracking':
        return this.generateRecursiveBacktracking()
      case 'prim':
        return this.generatePrim()
      default:
        return this.generate()
    }
  }

  generateRecursiveBacktracking() {
    const maze = Array(this.height)
      .fill(0)
      .map(() => Array(this.width).fill(false))
    const walls = []

    const directions = [
      { dx: 0, dy: -1, wall: 'horizontal' },
      { dx: 1, dy: 0, wall: 'vertical' },
      { dx: 0, dy: 1, wall: 'horizontal' },
      { dx: -1, dy: 0, wall: 'vertical' },
    ]

    const isValid = (x, y) => x >= 0 && x < this.width && y >= 0 && y < this.height

    const dfs = (x, y) => {
      maze[y][x] = true
      const shuffledDirections = [...directions].sort(() => Math.random() - 0.5)
      for (const dir of shuffledDirections) {
        const newX = x + dir.dx * 2
        const newY = y + dir.dy * 2
        if (isValid(newX, newY) && !maze[newY][newX]) {
          const wallX = x + dir.dx
          const wallY = y + dir.dy
          maze[wallY][wallX] = true
          dfs(newX, newY)
        }
      }
    }

    dfs(0, 0)

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!maze[y][x]) {
          if (x < this.width - 1 && !maze[y][x + 1]) walls.push({ x, y, dir: 'vertical' })
          if (y < this.height - 1 && !maze[y + 1][x]) walls.push({ x, y, dir: 'horizontal' })
        }
      }
    }

    return {
      walls,
      start: { x: 0, y: 0 },
      end: { x: this.width - 1, y: this.height - 1 },
      width: this.width,
      height: this.height,
      cellSize: this.cellSize,
    }
  }

  generatePrim() {
    const maze = Array(this.height)
      .fill(0)
      .map(() => Array(this.width).fill(false))
    const walls = []
    const frontiers = []

    const addFrontiers = (x, y) => {
      const directions = [
        { dx: 0, dy: -2 },
        { dx: 2, dy: 0 },
        { dx: 0, dy: 2 },
        { dx: -2, dy: 0 },
      ]
      for (const dir of directions) {
        const newX = x + dir.dx
        const newY = y + dir.dy
        if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height && !maze[newY][newX]) {
          frontiers.push({ x: newX, y: newY, parentX: x, parentY: y })
        }
      }
    }

    const startX = Math.floor(Math.random() * this.width)
    const startY = Math.floor(Math.random() * this.height)
    maze[startY][startX] = true
    addFrontiers(startX, startY)

    while (frontiers.length > 0) {
      const randomIndex = Math.floor(Math.random() * frontiers.length)
      const frontier = frontiers.splice(randomIndex, 1)[0]
      if (!maze[frontier.y][frontier.x]) {
        maze[frontier.y][frontier.x] = true
        const midX = (frontier.x + frontier.parentX) / 2
        const midY = (frontier.y + frontier.parentY) / 2
        maze[midY][midX] = true
        addFrontiers(frontier.x, frontier.y)
      }
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!maze[y][x]) {
          if (x < this.width - 1) walls.push({ x, y, dir: 'vertical' })
          if (y < this.height - 1) walls.push({ x, y, dir: 'horizontal' })
        }
      }
    }

    return {
      walls,
      start: { x: 0, y: 0 },
      end: { x: this.width - 1, y: this.height - 1 },
      width: this.width,
      height: this.height,
      cellSize: this.cellSize,
    }
  }
}
