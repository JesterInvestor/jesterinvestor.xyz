// utils/mazeUtils.js

// Maze generation using Kruskal's algorithm with Union-Find
export const generateMaze = (width, height) => {
  const horizontalWalls = []
  const verticalWalls = []

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x < width - 1) verticalWalls.push({ x, y, dir: 'vertical' })
      if (y < height - 1) horizontalWalls.push({ x, y, dir: 'horizontal' })
    }
  }

  const allWalls = [...horizontalWalls, ...verticalWalls]

  const parent = {}
  const find = (cell) => {
    if (parent[cell] !== cell) parent[cell] = find(parent[cell])
    return parent[cell]
  }

  const union = (a, b) => {
    const rootA = find(a)
    const rootB = find(b)
    if (rootA !== rootB) parent[rootA] = rootB
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      parent[`${x},${y}`] = `${x},${y}`
    }
  }

  const shuffledWalls = allWalls.sort(() => Math.random() - 0.5)
  const mazeWalls = []

  shuffledWalls.forEach((wall) => {
    let cell1, cell2
    if (wall.dir === 'horizontal') {
      cell1 = `${wall.x},${wall.y}`
      cell2 = `${wall.x},${wall.y + 1}`
    } else {
      cell1 = `${wall.x},${wall.y}`
      cell2 = `${wall.x + 1},${wall.y}`
    }

    if (find(cell1) !== find(cell2)) {
      union(cell1, cell2)
    } else {
      mazeWalls.push(wall)
    }
  })

  return mazeWalls
}

export const linesIntersect = (p1, p2, p3, p4) => {
  const denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y)
  if (denominator === 0) return false

  const ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator
  const ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator

  return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1
}

export const calculateDistance = (p1, p2) => {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y)
}

export const smoothPath = (path, smoothingFactor = 0.1) => {
  if (path.length < 3) return path

  const smoothedPath = [path[0]]
  for (let i = 1; i < path.length - 1; i++) {
    const prev = path[i - 1]
    const curr = path[i]
    const next = path[i + 1]
    const smoothedPoint = {
      x: curr.x * (1 - smoothingFactor) + ((prev.x + next.x) * smoothingFactor) / 2,
      y: curr.y * (1 - smoothingFactor) + ((prev.y + next.y) * smoothingFactor) / 2,
    }
    smoothedPath.push(smoothedPoint)
  }
  smoothedPath.push(path[path.length - 1])
  return smoothedPath
}
